// news-image-20261122 — Node 22, standard library only.
//
// This program ships the front page, entry.png, and drops a
// byte-identical copy at /output/entry.png (or $MAKEFUN_OUTPUT_DIR when
// run outside the grader). The picture sums up Sunday 22 November 2026:
// COP31 collapsing with no deal in Antalya, Iran striking US bases in
// Bahrain while mines hit tankers at Hormuz, the Democrats winning their
// largest House majority since 1992, and 27 more stories. Run it twice
// and both runs print the same sha256.

import * as fs from "node:fs";
import * as crypto from "node:crypto";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function hashFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

// The gate only accepts a whole PNG of at most 1 MiB and 1024 by 1024
// pixels, so the file is checked before it is copied and the run dies
// loudly on anything else. A PNG starts with an 8-byte signature, then
// the IHDR chunk: length, the letters IHDR, width and height as
// big-endian 32-bit numbers. It ends with IEND: a zero length, the
// letters IEND, and a CRC.
function checkImage(bytes) {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (bytes.length < 45) return "too short to be a whole PNG";
  if (bytes.length > MAX_BYTES) return "over the 1 MiB cap";
  if (!bytes.subarray(0, 8).equals(png)) return "bad PNG signature";
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") return "first chunk is not IHDR";
  const w = bytes.readUInt32BE(16);
  const h = bytes.readUInt32BE(20);
  if (w === 0 || h === 0) return "zero-size image";
  if (w > MAX_SIDE || h > MAX_SIDE) return `too large: ${w}x${h}`;
  const tail = bytes.subarray(bytes.length - 12);
  if (tail.readUInt32BE(0) !== 0) return "no IEND chunk at the end";
  if (tail.subarray(4, 8).toString("ascii") !== "IEND") return "no IEND chunk at the end";
  return null;
}

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(here, "entry.png");
if (!fs.existsSync(source)) fail("entry.png missing beside main.ts");

const problem = checkImage(fs.readFileSync(source));
if (problem !== null) fail(`entry.png rejected: ${problem}`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, "entry.png");
fs.cpSync(source, target);

const before = hashFile(source);
const after = hashFile(target);
if (before !== after) fail("entry.png copy failed integrity check");
console.log(`wrote ${target} sha256:${after}`);
