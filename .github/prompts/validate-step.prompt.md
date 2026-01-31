---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Success Criteria

You are now operating in the **code-reviewer** agent mode to systematically validate code quality and success criteria.

## Task

Validate that all success criteria for a specific step in the exercise are met.

## Input

Step Number: ${input:step-number:Enter the step number (REQUIRED, e.g., '5-0', '5-1', '5-2')}

## Instructions

### 1. Find the Exercise Issue

Use gh CLI to find the main exercise issue:
```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title.

### 2. Retrieve Issue with Comments

Get the full issue including all step comments:
```bash
gh issue view <issue-number> --comments
```

### 3. Locate the Specified Step

Search through the issue output to find:
```
# Step ${step-number}:
```

**Example patterns**:
- `# Step 5-0:`
- `# Step 5-1:`
- `# Step 5-2:`

Extract all content for that specific step.

### 4. Extract Success Criteria

From the step content, find the section:
```
## Success Criteria
```

or

```
### Success Criteria
```

Parse all criteria listed (usually bulleted items with ✅ or checkboxes).

### 5. Validate Each Criterion

For each success criterion, check the current workspace state:

**Common Criteria Types**:

#### Tests Passing
```bash
# Run all tests
npm test

# Check specific package
cd packages/backend && npm test
cd packages/frontend && npm test
```

Verify:
- All tests pass (no failures)
- Test coverage is maintained
- No skipped tests

#### Lint Clean
```bash
# Run linting
npm run lint

# Check specific package
cd packages/backend && npm run lint
cd packages/frontend && npm run lint
```

Verify:
- Zero errors
- Zero warnings (or only expected warnings)

#### Functionality Working
For functionality criteria:
- Review code changes
- Check if endpoints/features are implemented
- Verify error handling exists
- Confirm validation is in place

#### Code Quality
Check for:
- No console.log statements (except intentional error logging)
- No unused variables
- Proper error handling
- Tests cover edge cases

### 6. Categorize Issues

If criteria are not met, categorize issues:

**Critical (Must Fix)**:
- Test failures
- Compilation errors
- Missing required functionality

**High Priority**:
- Lint errors
- Missing error handling
- Incomplete validation

**Medium Priority**:
- Code style issues
- Missing edge case tests
- Incomplete documentation

**Low Priority**:
- Formatting inconsistencies
- Minor optimizations

### 7. Generate Validation Report

Provide a comprehensive report:

#### ✅ Passing Criteria
List each criterion that is met with confirmation

#### ❌ Failing Criteria
For each unmet criterion:
- State what is required
- Explain what is currently wrong
- Provide specific guidance on how to fix
- Suggest commands to run

#### 📋 Next Steps
If all criteria pass:
- Congratulate completion
- Suggest documenting in session notes
- Recommend moving to next step or committing

If criteria fail:
- Provide prioritized action plan
- Suggest which issues to address first
- Reference relevant documentation

## Example Output Format

```
# Step ${step-number} Validation Report

## ✅ Passing Criteria

✅ All tests passing (18/18)
✅ Functionality implemented correctly
✅ Error handling in place

## ❌ Failing Criteria

❌ Lint clean
   Current: 5 no-console warnings, 2 no-unused-vars errors
   Required: Zero lint errors
   
   Fix:
   1. Remove console.log statements in app.js (lines 23, 45, 67)
   2. Remove unused variable 'data' in app.js (line 12)
   3. Run: npm run lint -- --fix (for auto-fixable issues)
   4. Re-run: npm run lint

❌ Edge case tests missing
   Current: No tests for empty string title
   Required: Validation tests for all edge cases
   
   Fix:
   1. Add test: 'should reject empty string title'
   2. Add test: 'should reject title with only whitespace'
   3. Run: npm test to verify

## 📋 Next Steps

Priority 1 (Critical):
1. Fix lint errors using systematic approach:
   - Fix no-unused-vars first
   - Then remove console statements
   - Run tests after each batch
   - Commit: "fix: resolve lint errors"

Priority 2 (High):
2. Add missing edge case tests:
   - Write tests first (TDD)
   - Verify they fail
   - Update validation logic
   - Commit: "test: add edge case validation tests"

Once all criteria pass:
- Document findings in .github/memory/session-notes.md
- Run /commit-and-push with appropriate branch name
- Move to next step
```

## Validation Best Practices

### Systematic Checking
- Check tests first (foundation)
- Then check lint (quality)
- Then check functionality (completeness)
- Finally check edge cases (robustness)

### Actionable Guidance
- Don't just say "fix lint errors"
- Provide specific file names and line numbers
- Suggest exact commands to run
- Reference relevant documentation

### Educational Approach
- Explain WHY each criterion matters
- Connect to best practices
- Reference patterns in patterns-discovered.md
- Help user understand the bigger picture

## Remember

- **Be Thorough**: Check every criterion systematically
- **Be Specific**: Provide exact commands and file locations
- **Be Educational**: Explain why criteria matter
- **Be Constructive**: Focus on how to fix, not just what's wrong
- **Follow Up**: Suggest next steps based on results

Refer to [.github/copilot-instructions.md](../.github/copilot-instructions.md) for Testing Guidelines and Code Quality standards.
