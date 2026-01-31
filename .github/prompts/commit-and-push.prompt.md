---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

Analyze all current changes, generate an appropriate conventional commit message, and push to a feature branch.

## Input

Branch Name: ${input:branch-name:Enter the feature branch name (REQUIRED, e.g., 'feature/step-5-1' or 'fix/toggle-bug')}

## Instructions

### 1. Validate Branch Name

Ensure the branch name was provided. If not provided or empty, **STOP** and ask the user for it.

**CRITICAL**: NEVER commit to `main` or any branch other than the user-provided name.

### 2. Analyze Changes

Get a summary of all changes:
```bash
git status
git diff
```

Review:
- Which files were modified
- What functionality was added/changed/fixed
- Whether changes are features, fixes, or other types

### 3. Generate Commit Message

Using **conventional commit format** (see Git Workflow in project instructions):

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring without feature changes
- `style:` - Code style/formatting changes

**Examples**:
- `feat: add DELETE endpoint for todos`
- `fix: resolve toggle always setting completed to true`
- `test: add validation tests for POST endpoint`
- `refactor: extract validation middleware`

**Guidelines**:
- Be descriptive but concise
- Use imperative mood ("add" not "added")
- No period at the end
- Focus on what changed and why

### 4. Create or Switch to Branch

Check if the branch exists:
```bash
git branch --list ${branch-name}
```

If branch doesn't exist:
```bash
git checkout -b ${branch-name}
```

If branch exists:
```bash
git checkout ${branch-name}
```

### 5. Stage All Changes

**IMPORTANT**: Stage ALL changes to ensure nothing is left behind:
```bash
git add .
```

Verify what will be committed:
```bash
git status
```

### 6. Commit with Generated Message

```bash
git commit -m "<generated-conventional-commit-message>"
```

### 7. Push to Feature Branch

Push to the user-provided branch:
```bash
git push origin ${branch-name}
```

**NEVER** push to main or any other branch.

### 8. Confirm Success

Report:
- Branch name used
- Commit message generated
- Files committed
- Push status

## Example Output Format

```
✅ Changes Committed and Pushed

Branch: feature/step-5-1
Commit: feat: implement POST endpoint with validation

Files Changed:
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js

Summary:
- Added POST /api/todos endpoint
- Implemented title validation
- Added 3 new tests (all passing)

Pushed to: origin/feature/step-5-1

Next Steps:
- Verify tests pass in CI/CD
- Create Pull Request if ready for review
- Or continue with next step
```

## Safety Checks

Before committing:
- ✅ Verify all tests pass: `npm test`
- ✅ Check lint status: `npm run lint`
- ✅ Confirm you're on the correct branch: `git branch --show-current`
- ✅ Review staged changes: `git status`
- ⚠️ NEVER commit to `main` directly

## Error Handling

If commit fails:
- Check for uncommitted conflicts
- Verify git is configured properly
- Ensure branch name is valid

If push fails:
- Check remote branch permissions
- Verify you have push access
- Try `git pull origin ${branch-name}` first if remote exists

Refer to [.github/copilot-instructions.md](../.github/copilot-instructions.md) for Git Workflow guidelines and conventional commit standards.
