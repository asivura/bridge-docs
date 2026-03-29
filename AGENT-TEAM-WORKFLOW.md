# Agent Team Workflow

How we use Claude Code agent teams to work on bridge-docs, and how we track progress.

---

## Overview

We use Claude Code's experimental agent teams feature to parallelize work. A **team lead** (the main Claude Code session) coordinates specialized **teammates** (independent Claude Code instances) that work on tasks simultaneously.

```
Team Lead (main session)
├── Assigns tasks, manages dependencies
├── Relays results between teammates
├── Updates GitHub issues as work completes
│
├── Teammate: scan-verifier (read-only)
├── Teammate: doc-fixer (edits files)
├── Teammate: content-parser (edits files)
└── ...
```

## Prerequisites

Agent teams require this environment variable in `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Split panes require **tmux** (used automatically when detected).

## Team Lifecycle

### 1. Create a team

```
TeamCreate → team name + description
```

One team per session. Delete the old team before creating a new one.

### 2. Create tasks with dependencies

```
TaskCreate → subject + description
TaskUpdate → set owner, blockedBy, status
```

Tasks form a dependency graph. Blocked tasks can't start until their dependencies complete.

### 3. Spawn teammates

Each teammate is an independent Claude Code agent with its own context window.

```
Agent tool → name, team_name, prompt, mode
```

**Agent types by capability:**

| Mode | Can edit files? | Use for |
|------|:-:|---|
| `auto` | Yes | Implementation tasks (fixing docs, writing code) |
| `default` | Yes (with approval) | Tasks where you want to review changes |
| Explore subagent | No | Read-only research, analysis |

### 4. Coordinate

- Teammates report back via SendMessage
- Team lead relays information between teammates
- Team lead updates GitHub issues as work completes
- Unblocked teammates start automatically on their next task

### 5. Shutdown

```
SendMessage → {"type": "shutdown_request"}
```

Shut down teammates as they finish. Delete the team when all work is done.

## Task Dependency Patterns

### Sequential (each blocks the next)

```
#1 Scaffold project
  └── #2 Build components (blocked by #1)
        └── #3 Build pages (blocked by #2)
```

### Parallel after gate (fan-out)

```
#1 Scaffold project
  ├── #2 Deploy workflow (blocked by #1)
  ├── #3 Components (blocked by #1)
  └── #4 Content parser (blocked by #1)
```

### Converge (fan-in)

```
#3 Components ──┐
                ├── #5 Build pages (blocked by #3 AND #4)
#4 Content ─────┘
```

### Independent (fully parallel)

```
#1 Verify content (no dependencies)
#2 Research SAYC differences (no dependencies)
```

## Progress Tracking

### GitHub Issues (permanent record)

We use **workstream-level issues** with checklists, not one issue per task.

| Issue | Workstream |
|-------|-----------|
| #2 | Transcription error fixes |
| #3 | Website build |
| #4 | System difference analysis |

Each issue contains:
- Summary of the goal
- Checklist of sub-tasks
- Comments added as agents complete work (with commit references)

### Claude Code Tasks (ephemeral, per-session)

TaskCreate/TaskUpdate tracks work within a single session. These are discarded when the team is deleted.

### Relationship

```
GitHub Issue #3 (permanent)
  ├── Checklist: "Build shadcn/ui components" ← checked off when done
  │     └── Comment: "component-dev completed Task #3. Installed Table, Card,
  │         Badge, Separator, Alert. Built BiddingTable, SystemCard, DiffBadge,
  │         ComparisonRow. Build passes. abc1234"
  │
  └── Checklist: "Build markdown parser" ← checked off when done
        └── Comment: "content-parser completed Task #4. Created parser utility
            in src/lib/markdown-parser.ts. def5678"
```

## Teams We've Run

### Team: bridge-fix

**Purpose:** Fix transcription errors and create SAYC documentation.

| Teammate | Type | Tasks |
|----------|------|-------|
| scan-verifier | Read-only | Read 9 scanned images, verify 24 documented errors |
| doc-fixer | Editor | Apply 19 fixes to SYSTEM.md, propagate to comparison docs |
| sayc-creator | Editor | Research SAYC, create SAYC-SYSTEM.md in same format |

**Result:** 18/19 fixes applied correctly. SAYC-SYSTEM.md created. 2 disputed errors flagged. 2 new errors discovered. See issue #2 for remaining items.

### Team: bridge-website

**Purpose:** Build static website with Astro + shadcn/ui.

| Teammate | Type | Tasks |
|----------|------|-------|
| scaffolder | Editor | Initialize Astro project, configure deploys |
| component-dev | Editor | Build shadcn/ui components and layout |
| content-parser | Editor | Build markdown parser for build-time content |
| page-builder | Editor | Assemble all pages (pending) |
| qa-agent | Read-only + Playwright | Visual QA of rendered site (pending) |

**Additional agents:**

| Agent | Type | Purpose |
|-------|------|---------|
| content-verifier | Read-only | Verified applied fixes against scans |
| diff-analyst | Read-only | Deep analysis of all system differences |
| progress-tracker | Editor | Keeps GitHub issues (#2-#6) and repo docs updated |
| ida-explorer | Read-only | Researched ida project's tech stack |
| pages-researcher | Read-only | Researched GitHub Pages setup options |
| qa-monitor | Read-only + Playwright | Visual QA of deployed pages, screenshot verification |
| resources-builder | Editor | Built comprehensive resources page with curated content |

## Tips

- **Spawn read-only agents for research, editor agents for changes.** Don't give write access to agents that only need to read.
- **Fan out after a gate task.** Get the scaffold done first, then parallelize components + content + deploy.
- **Shut down idle teammates.** Each agent uses tokens. Shut them down as soon as their work is done.
- **Redirect mid-flight.** If requirements change, send a message to the teammate. They can pivot.
- **Use tmux split panes.** `Ctrl+b Space` cycles layouts. `Ctrl+b Meta+3` puts the lead on top with teammates below.
- **Pre-read while blocked.** Teammates waiting on dependencies can pre-read files to be ready instantly.
