# Bridge Docs

Documentation for bridge bidding systems and conventions.

---

## Our Partnership System

Our system is based on **SAYC (Standard American Yellow Card)** with several key differences, most notably **strong two-bids (20-22)** instead of weak twos.

### Key Differences from SAYC

| Feature | Our System | SAYC |
|---------|------------|------|
| 1-level openings | **12-19** | 13-21 |
| 2♦/2♥/2♠ openings | **20-22, 5+ suit (strong)** | 5-11, 6+ suit (weak) |
| 2♣ minimum | **17+ (game in hand)** | 22+ |
| Blackwood 5♣ | **0 aces** | 0 or 4 aces |
| 2-level overcall | **8-16** | 10-16 |

See [SAYC-DIFFERENCES.md](SAYC-DIFFERENCES.md) for complete details.

---

## Documents

### Partnership Documents

| Document | Description |
|----------|-------------|
| [SYSTEM.md](SYSTEM.md) | Our partnership agreements (from scanned cards) |
| [SAYC-SYSTEM.md](SAYC-SYSTEM.md) | Standard SAYC in same format as SYSTEM.md (for sharing) |
| [SAYC-DIFFERENCES.md](SAYC-DIFFERENCES.md) | **All differences between our system and SAYC** |
| [SYSTEM-COMPARISON.md](SYSTEM-COMPARISON.md) | **Side-by-side comparison of every bid** |
| [SAYC-CONVENTION-CARD.md](SAYC-CONVENTION-CARD.md) | SAYC reference in convention card format |
| [TRANSCRIPTION-ERRORS.md](TRANSCRIPTION-ERRORS.md) | Scan vs documentation error report (24 errors, 19 fixed) |
| [REFERENCES.md](REFERENCES.md) | Learning resources and related systems |
| `system-scans/` | Original scanned system cards (Russian) |

### Project Documents

| Document | Description |
|----------|-------------|
| [WEBSITE-PLAN.md](WEBSITE-PLAN.md) | Architecture decisions for the static website |
| [AGENT-TEAM-WORKFLOW.md](AGENT-TEAM-WORKFLOW.md) | How we use agent teams and track progress |
| `website/` | Astro + shadcn/ui static site ([live](https://asivura.github.io/bridge-docs/)) |
| `.github/workflows/issues.yml` | Issue status automation (label transitions) |
| `.github/workflows/deploy.yml` | GitHub Pages deploy with PDF generation |
| `.github/workflows/lint-commits.yml` | Commit message and PR title linting (Conventional Commits) |

### System References

| System | File | Summary |
|--------|------|---------|
| [**SAYC**](systems/SAYC.md) | Standard American Yellow Card | The **official ACBL system** and BBO default. Uses 15-17 NT, 5-card majors, strong 2♣. Most widely played system worldwide. Our system is based on this. |
| [Acol](systems/ACOL.md) | British Acol | The **UK standard**. Key difference: **12-14 NT** (weak) and **4-card majors**. Popular in Britain, Australia, New Zealand. |
| [2/1 Game Forcing](systems/TWO-OVER-ONE.md) | Two-Over-One | The **US tournament standard**. Like SAYC but with one key change: a 2-level response in a new suit is **game-forcing** (not just forcing one round). |
| [Precision](systems/PRECISION.md) | Precision Club | An **artificial system** where 1♣ shows 16+ HCP (any shape). All other openings are limited (11-15). Popular in Asia. |
| [Comparison](systems/README.md) | All Systems | Side-by-side comparison of all systems |

---

## System Summaries

### SAYC (Standard American Yellow Card)
**The world's most popular system.** Created by ACBL in the 1980s as a standard for tournament play. Default on Bridge Base Online.
- **1NT:** 15-17 balanced
- **Majors:** 5+ cards required
- **2♣:** 22+ strong artificial
- **Conventions:** Stayman, Jacoby Transfers, Blackwood, Negative Doubles

### Acol
**The British standard.** Named after the Acol Bridge Club in London (1930s). Emphasizes natural bidding and limit bids.
- **1NT:** 12-14 balanced (**weak NT**)
- **Majors:** Only **4 cards** required
- **2♣:** 23+ strong artificial
- **Key feature:** With 15-17 balanced, you open 1-of-a-suit (not 1NT)

### 2/1 Game Forcing
**American tournament standard.** Evolution of SAYC with tighter game-forcing agreements.
- **1NT:** 15-17 balanced (same as SAYC)
- **Majors:** 5+ cards required (same as SAYC)
- **Key difference:** 2-level new suit response = **unconditional game force**
- **Forcing 1NT:** Response to 1♥/1♠ is forcing one round

### Precision Club
**Artificial strong club system.** Invented by C.C. Wei in Taiwan (1969). Used by many world champions.
- **1♣:** 16+ HCP, **artificial** (any shape)
- **1♦/♥/♠:** Limited to **11-15 HCP**
- **1NT:** 13-15 balanced
- **Key advantage:** Responder immediately knows opener's strength range

---

## Quick Comparison

| Feature | SAYC | Acol | 2/1 GF | Precision |
|---------|------|------|--------|-----------|
| 1NT range | 15-17 | **12-14** | 15-17 | 13-15 |
| Major opening | 5 cards | **4 cards** | 5 cards | 5 cards |
| Strong bid | 2♣ (22+) | 2♣ (23+) | 2♣ (22+) | **1♣ (16+)** |
| 2/1 response | Forcing | Forcing | **Game Force** | Varies |
| Popular in | Worldwide | UK | USA | Asia |

---

## Quick Reference (Our System)

| Opening | HCP | Requirements |
|---------|-----|--------------|
| 1♣ | 12-19 | 5+♣ or 3-3 minors, denies 5M |
| 1♦ | 12-19 | 4+♦, denies 5M |
| 1♥/1♠ | 12-19 | 5+ cards |
| 1NT | 15-17 | Balanced |
| 2♣ | 22+/17+ | Strong (or 17+ game in hand) |
| 2♦/♥/♠ | **20-22** | **5+ card suit (strong)** |
| 2NT | 20-21 | Balanced |
| 3-level | 6-10 | 7+ card preempt |
| 3NT | 25-27 | Balanced |
