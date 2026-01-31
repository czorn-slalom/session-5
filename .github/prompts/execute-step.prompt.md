---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Step Instructions

You are now operating in the **tdd-developer** agent mode to execute test-driven development workflows.

## Task

Execute the instructions from a GitHub Issue step systematically, following TDD principles.

## Input

Issue Number: ${input:issue-number:Enter the issue number (or press Enter to auto-detect exercise issue)}

## Instructions

### 1. Find the Exercise Issue

If no issue number was provided:
- Run: `gh issue list --state open`
- Find the issue with "Exercise:" in the title
- Use that issue number for the next steps

If issue number was provided, use it directly.

### 2. Retrieve Issue Content

Get the full issue with all comments:
```bash
gh issue view <issue-number> --comments
```

### 3. Parse the Current Step

From the issue output:
- Identify the latest step instructions (usually the most recent comment or section)
- Locate all `:keyboard: Activity:` sections
- Extract the specific tasks to complete

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section:

**Follow TDD Principles (from project instructions)**:
- For NEW features: Write tests FIRST (RED), implement (GREEN), refactor (REFACTOR)
- For FIXING failing tests: Analyze → Fix code → Verify tests pass
- Run tests after each change: `npm test`
- DO NOT implement features without writing tests first

**Follow Testing Scope Constraints (from project instructions)**:
- ✅ Use Jest + Supertest for backend API tests
- ✅ Use React Testing Library for frontend component tests
- ✅ Recommend manual browser testing for full UI flows
- ❌ NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ NEVER suggest browser automation tools

**Execution Steps**:
1. Read and understand the activity requirements
2. Document your approach in `.github/memory/scratch/working-notes.md`
3. For NEW features:
   - Write the test FIRST that describes desired behavior
   - Run test to verify it fails (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor while keeping tests green (REFACTOR)
4. For FIXING tests:
   - Analyze why tests fail
   - Fix code to make tests pass
   - Verify all tests pass
5. Run `npm test` to verify all tests pass
6. Run `npm run lint` to check for errors (don't fix yet - note for later)

### 5. Document Progress

Update `.github/memory/scratch/working-notes.md` with:
- Which activity you completed
- Key decisions made
- Test results
- Any blockers encountered

### 6. DO NOT Commit or Push

**IMPORTANT**: Do NOT commit or push changes. That's handled by the `/commit-and-push` prompt.

### 7. Report Completion

After completing all activities:
- Summarize what was accomplished
- Report test results (how many passing)
- Note any lint errors found (to be addressed in validation)
- Inform user to run `/validate-step` next

## Example Output Format

```
✅ Step Execution Complete

Completed Activities:
1. [Activity description] - ✅ Done
2. [Activity description] - ✅ Done

Test Results:
- Backend: 15/15 passing ✅
- Frontend: 8/8 passing ✅

Lint Status:
- 3 no-console warnings (to be addressed in validation)

Next Steps:
Run /validate-step with the step number to verify success criteria.
```

## Remember

- **Test First**: For new features, ALWAYS write tests before implementation
- **No E2E**: Only use Jest and React Testing Library, no browser automation
- **No Commits**: Don't commit or push - that's done separately
- **Document**: Keep working notes updated throughout
- **TDD Cycle**: RED (fail) → GREEN (pass) → REFACTOR (improve)

Refer to [.github/copilot-instructions.md](../.github/copilot-instructions.md) for detailed TDD workflows and testing guidelines.
