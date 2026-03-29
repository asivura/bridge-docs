# CLAUDE.md

Guidance for the bridge-docs repository.

## Repository Purpose

Documentation for bridge bidding systems, with focus on our partnership system compared to standard SAYC.

## Key Files

| File | Purpose |
|------|---------|
| `SAYC-DIFFERENCES.md` | Summary of differences between our system and SAYC |
| `SYSTEM-COMPARISON.md` | Side-by-side comparison of every bid |
| `SAYC-CONVENTION-CARD.md` | SAYC reference in convention card format |
| `SYSTEM.md` | Our partnership agreements |
| `SAYC-SYSTEM.md` | Standard SAYC in same format as SYSTEM.md (for sharing) |
| `systems/SAYC.md` | Standard SAYC reference |
| `system-scans/` | Original scanned convention cards (Russian) |
| `TRANSCRIPTION-ERRORS.md` | Scan vs doc error report (24 errors, 19 fixed) |
| `REFERENCES.md` | Learning resources and related systems |
| `WEBSITE-PLAN.md` | Architecture decisions for the static website |
| `AGENT-TEAM-WORKFLOW.md` | How we use agent teams and track progress |

## Our System vs SAYC

Key differences to remember:

1. **1-level openings**: 12-19 (not 13-21)
2. **2♦/2♥/2♠**: Strong 20-22 with 5+ suit (NOT weak twos)
3. **2♣ opening**: Can be 17+ with game in hand (not just 22+)
4. **Blackwood 5♣**: Shows 0 aces (not 0 or 4)
5. **2-level overcall**: 8-16 (not 10-16)

## Scanned Convention Cards

The original scans are in Russian (`system-scans/IMG_3951.jpg` to `IMG_3959.jpg`):

| Page | File | Content |
|------|------|---------|
| 4 | IMG_3951.jpg | Opening bids, Defense/Overcalls |
| 5 | IMG_3952.jpg | 1NT responses (Stayman, Transfers) |
| 6 | IMG_3953.jpg | 1NT continuations, Blackwood |
| 7 | IMG_3954.jpg | Responses to 1♦ and 1♠ |
| 8 | IMG_3955.jpg | Responses to 1♥ and 2♣ |
| 9-10 | IMG_3956-57.jpg | Opener's rebids after 1♣ |
| 11 | IMG_3958.jpg | Weak Suit Asking convention |
| 12 | IMG_3959.jpg | Scoring reference |

## GitHub Issues

- When the user reports a bug or requests a feature during a session, create or update a GitHub issue for it
- Keep issue checklists in sync with actual progress
- Add comments to issues when work is completed, referencing commit hashes
- Use workstream-level issues with checklists, not one issue per small task
- Before closing any issue, spawn a QA agent to verify all checklist items are complete and working
- Manage issue labels manually via `gh issue edit` from agents

## CI Enforcement

- Commit messages and PR titles are linted via `.github/workflows/lint-commits.yml`
- PR titles must follow Conventional Commits format (`type: description`)
- All commits in a PR are validated with commitlint
- Subject line max 72 characters, lowercase after type, no trailing period

## Agent Workflow

- Delegate ALL implementation work to team agents — do not write code, edit files, or make commits in the main session
- The main session is for coordination only: creating tasks, spawning agents, relaying results, communicating with the user
- When the user asks for a change, spawn a teammate agent to do it
- Agents should commit and push changes frequently (after each meaningful change, not batched) so the user can verify on the live site
- See `AGENT-TEAM-WORKFLOW.md` for team setup, task patterns, and tips

## When Updating Documents

- Always verify HCP values against the original scans
- Use SAYC.md as the reference for standard SAYC values
- Mark differences clearly with **bold** and Diff Type column
- When SYSTEM.md changes, always propagate to: SYSTEM-COMPARISON.md, SAYC-DIFFERENCES.md, TRANSCRIPTION-ERRORS.md, and website/src/data/difference-explanations.ts
