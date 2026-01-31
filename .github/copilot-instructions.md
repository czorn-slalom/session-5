# Copilot Instructions for TODO Application

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React application for user interface
- **Backend**: Express.js API server
- **Development Focus**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

The following documentation files provide detailed guidance for working with this project:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

This project follows core software engineering best practices:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle
  - Write tests first (RED)
  - Implement minimal code to pass (GREEN)
  - Improve code quality while keeping tests passing (REFACTOR)
  
- **Incremental Changes**: Make small, testable modifications rather than large sweeping changes

- **Systematic Debugging**: Use test failures as guides to identify and resolve issues

- **Validation Before Commit**: Ensure all tests pass and no lint errors exist before committing code

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

### Important Constraints

**DO NOT** suggest or implement:
- End-to-end (e2e) test frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Full browser testing frameworks

**Reason**: Keep the lab focused on unit/integration tests without the complexity of e2e testing infrastructure.

### Testing Approach by Context

- **Backend API changes**: 
  - Write Jest tests FIRST using Supertest
  - Run tests and verify they FAIL (RED)
  - Implement the feature/fix (GREEN)
  - Refactor as needed (REFACTOR)

- **Frontend component features**: 
  - Write React Testing Library tests FIRST for component behavior
  - Run tests and verify they FAIL (RED)
  - Implement the component/feature (GREEN)
  - Refactor as needed (REFACTOR)
  - Follow up with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these development workflows for consistent, high-quality work:

### 1. TDD Workflow
```
Write/fix tests → Run tests → Fail (RED) → Implement code → Pass (GREEN) → Refactor → Verify
```

### 2. Code Quality Workflow
```
Run lint → Categorize issues → Fix systematically → Re-validate → Commit
```

### 3. Integration Workflow
```
Identify issue → Debug with tests → Test → Fix → Verify end-to-end
```

## Agent Usage

Use specialized agents for specific types of work:

### tdd-developer Agent
Use for:
- Writing new tests
- Implementing features using TDD approach
- Red-Green-Refactor cycles
- Test debugging and fixes

### code-reviewer Agent
Use for:
- Addressing lint errors
- Code quality improvements
- Refactoring suggestions
- Code review feedback

## Memory System

This project uses a two-tier memory system to maintain context across development sessions:

### Persistent Memory
**Location**: This file (`.github/copilot-instructions.md`)
- Contains foundational principles and workflows that remain constant
- Always-on context that defines how development should be approached

### Working Memory
**Location**: `.github/memory/` directory
- **session-notes.md**: Historical summaries of completed sessions (committed to git)
- **patterns-discovered.md**: Accumulated code patterns and best practices (committed to git)
- **scratch/working-notes.md**: Active session notes for real-time tracking (NOT committed to git)

### Usage Guidelines

**During Active Development**:
- Take real-time notes in `.github/memory/scratch/working-notes.md`
- Track current task, approach, findings, decisions, and blockers
- Update frequently throughout your session

**When Patterns Emerge**:
- Document reusable solutions in `.github/memory/patterns-discovered.md`
- Include context, problem, solution, and examples

**At End of Session**:
- Summarize key findings from working notes into `.github/memory/session-notes.md`
- Commit session-notes.md and patterns-discovered.md (scratch files are not committed)

**AI Assistance**:
- Reference these files when providing context-aware suggestions
- Read working notes to understand current context
- Apply discovered patterns to new implementations

For detailed information about the memory system, see [.github/memory/README.md](.github/memory/README.md).

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management Commands

```bash
# List all open issues
gh issue list --state open

# Get detailed information about a specific issue
gh issue view <issue-number>

# Get issue with all comments
gh issue view <issue-number> --comments
```

### Finding Exercise Steps

- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without feature changes
- `style:` - Code style/formatting changes

**Examples**:
```bash
git commit -m "feat: add delete TODO endpoint"
git commit -m "fix: resolve TODO filtering issue"
git commit -m "test: add tests for TODO creation"
```

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fix branches**: `fix/<descriptive-name>`
- **Main branch**: `main` (protected)

### Commit and Push Workflow

```bash
# Stage all changes
git add .

# Commit with conventional format
git commit -m "feat: descriptive message"

# Push to the correct branch
git push origin <branch-name>
```

**Always stage all changes** before committing to ensure nothing is left behind.
