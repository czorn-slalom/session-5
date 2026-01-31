# Working Memory System

## Purpose

This memory system helps track patterns, decisions, and lessons learned during iterative development. It creates a feedback loop where discoveries from previous work inform future development sessions.

## Memory Types

### Persistent Memory
**Location**: `.github/copilot-instructions.md`

Contains foundational principles, workflows, and guidelines that remain constant across the project lifecycle. This is your "always-on" context that defines how development should be approached.

### Working Memory
**Location**: `.github/memory/`

Contains accumulated learnings, patterns, and active session notes. This is your "evolving" context that captures what you discover as you work.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed)
├── patterns-discovered.md       # Accumulated code patterns and best practices (committed)
└── scratch/
    ├── .gitignore              # Ignores all scratch files
    └── working-notes.md        # Active session notes (NOT committed)
```

### File Purposes

#### session-notes.md (Committed)
- **What**: Completed session summaries for future reference
- **When**: After completing a development session or major milestone
- **Content**: High-level summaries of what was accomplished, key findings, decisions made, and outcomes
- **Lifespan**: Permanent historical record

#### patterns-discovered.md (Committed)
- **What**: Reusable code patterns and best practices discovered during development
- **When**: When you identify a recurring solution or important design decision
- **Content**: Named patterns with context, problem description, solution, and examples
- **Lifespan**: Accumulates over time, becomes a project knowledge base

#### scratch/working-notes.md (NOT Committed)
- **What**: Real-time notes during active development
- **When**: Throughout your current session - constantly updated
- **Content**: Current task, approach, findings, decisions, blockers, next steps
- **Lifespan**: Ephemeral - reset or archived at end of session

## When to Use Each File

### During TDD Workflow

**Active Development** → `scratch/working-notes.md`
- Document which test you're working on
- Note why a test is failing (RED phase)
- Track implementation approach (GREEN phase)
- Record refactoring decisions (REFACTOR phase)

**Pattern Emerges** → `patterns-discovered.md`
- If you solve a problem that could recur, document the pattern
- Example: "How to properly test Express middleware"

**Session Complete** → `session-notes.md`
- Summarize what tests were added/fixed
- Note key technical decisions
- Record any remaining work

### During Linting/Code Quality Workflow

**Active Work** → `scratch/working-notes.md`
- List lint errors being addressed
- Note systematic fix approach
- Track progress through error categories

**Pattern Emerges** → `patterns-discovered.md`
- Document linting rules and their rationale
- Example: "Why we disable console.log in production code"

**Session Complete** → `session-notes.md`
- Summarize code quality improvements made
- Note any eslint configuration changes

### During Debugging Workflow

**Active Investigation** → `scratch/working-notes.md`
- Document symptoms and error messages
- Track hypotheses about root cause
- Note what you've tried
- Record the solution when found

**Pattern Emerges** → `patterns-discovered.md`
- Document common bug patterns and solutions
- Example: "Array initialization bugs and how to prevent them"

**Session Complete** → `session-notes.md`
- Summarize bugs fixed
- Note preventative measures added

## How AI Uses This System

### During Active Development

When you ask for help, AI should:
1. **Read** `scratch/working-notes.md` to understand your current context
2. **Reference** `patterns-discovered.md` to apply proven solutions
3. **Review** recent `session-notes.md` entries for recent decisions
4. **Update** `scratch/working-notes.md` with new findings as work progresses

### Between Sessions

The memory system provides continuity:
- AI can quickly understand where you left off
- Previously discovered patterns inform new implementations
- Historical context prevents repeating past mistakes

## Workflow Best Practices

### Starting a Session
1. Review recent entries in `session-notes.md`
2. Open `scratch/working-notes.md` and note your starting task
3. Reference `patterns-discovered.md` for relevant established patterns

### During a Session
1. Keep `scratch/working-notes.md` updated with findings
2. When you discover a reusable pattern, add it to `patterns-discovered.md`
3. Use working notes to communicate context to AI assistants

### Ending a Session
1. Summarize key findings from `scratch/working-notes.md`
2. Add summary to `session-notes.md` with date and accomplishments
3. Clear or archive `scratch/working-notes.md` for next session
4. Commit `session-notes.md` and `patterns-discovered.md` (scratch is not committed)

## Benefits

✅ **Continuity**: Pick up where you left off without losing context  
✅ **Learning**: Build a knowledge base specific to your project  
✅ **Efficiency**: Avoid rediscovering the same solutions  
✅ **Communication**: Provide clear context to AI assistants  
✅ **Documentation**: Create a historical record of development decisions  

## Example Usage

**Scenario**: Fixing a bug where todos aren't persisting

**Step 1** - Document in `scratch/working-notes.md`:
```markdown
## Current Task
Fix bug: Created todos disappear after page refresh

## Approach
1. Check if backend POST endpoint returns correct data
2. Verify frontend saves the returned todo
3. Check if GET endpoint includes new todos

## Key Findings
- POST returns 501 (not implemented)
- Need to implement the endpoint properly
```

**Step 2** - After fixing, if you discover a pattern → `patterns-discovered.md`:
```markdown
## Service Initialization Pattern
**Problem**: Uninitialized array causes "Cannot push" errors
**Solution**: Always initialize arrays in service layer
**Example**: `let todos = [];` not `let todos;`
```

**Step 3** - At session end → `session-notes.md`:
```markdown
## Session: Backend Initialization (2026-01-31)
**Accomplished**: Fixed todos persistence bug
**Key Finding**: Array initialization bug in app.js
**Outcome**: All POST/GET tests now passing
```

---

Remember: **Working notes are ephemeral, patterns and sessions are permanent.**
