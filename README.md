# news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/aethertale/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard)
[![reward](https://make.fun/badge/news-image-20261122/aethertale/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122)

One image, one day: Sunday 22 November 2026, as a dense newspaper
front page — 30 stories from 6 continents. The three leads are COP31
collapsing with no deal in Antalya, Iran striking US bases in Bahrain
as mines hit tankers at Hormuz, and the Democrats winning their
largest House majority since 1992. Below them: nine secondary stories
and eighteen briefs, plus a world map marking where each one happened.
Every story happened or was first reported on 22 November 2026, and
disputed claims are attributed, not asserted. Reporting drawn from
UN News, CNN, Reuters, AP, WSJ and the day's digests.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That puts a copy of `entry.png`, the picture next to `main.ts`, at
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). Two runs write
identical bytes: before copying, `main.ts` verifies the file is a whole
PNG of at most 1 MiB and 1024×1024, and refuses anything else.

## Verify the copy

```sh
mkdir -p /tmp/det1 /tmp/det2
MAKEFUN_OUTPUT_DIR=/tmp/det1 node main.ts
MAKEFUN_OUTPUT_DIR=/tmp/det2 node main.ts
```

Both runs print sha256
`d6af9654f8e062fed4307a0fd0db1f2036b8e6e7a958d19b491463af9f60f5ca`.

## The picture

`entry.png`: 1024×1024, 365,738 bytes, sha256
`d6af9654f8e062fed4307a0fd0db1f2036b8e6e7a958d19b491463af9f60f5ca`.
