# Patterns Discovered

## Purpose
This file documents reusable code patterns, best practices, and design decisions discovered during development. These patterns serve as a knowledge base for consistent implementation across the project.

---

## Pattern Template

```markdown
## [Pattern Name]

**Context**: When/where this pattern applies

**Problem**: What issue does this pattern solve

**Solution**: How to implement the pattern

**Example**:
```[language]
// Code example demonstrating the pattern
```

**Related Files**: Where this pattern is used
- path/to/file.js
- path/to/other.js

**Notes**: Additional considerations or variations
```

---

## Established Patterns

### Service Initialization - Empty Array vs Null

**Context**: When initializing data collections in service layers (Express routes, React state, etc.)

**Problem**: Uninitialized or null collections cause runtime errors when methods like `.push()`, `.filter()`, or `.map()` are called

**Solution**: Always initialize collections as empty arrays rather than leaving them undefined or null

**Example**:
```javascript
// ❌ BAD - Causes "Cannot read property 'push' of undefined"
let todos;

app.post('/api/todos', (req, res) => {
  todos.push(newTodo); // Runtime error!
});

// ✅ GOOD - Safe to use array methods immediately
let todos = [];

app.post('/api/todos', (req, res) => {
  todos.push(newTodo); // Works correctly
});
```

**Related Files**:
- packages/backend/src/app.js (line 5)

**Notes**: 
- This applies to any collection type (arrays, objects, Maps, Sets)
- If the collection should start empty, initialize it empty
- If the collection should start with data, initialize it with that data
- Never leave collections in an undefined state

---

## Pattern Categories

<!-- As you discover more patterns, organize them into categories: -->

<!-- ### API Design Patterns -->

<!-- ### State Management Patterns -->

<!-- ### Error Handling Patterns -->

<!-- ### Testing Patterns -->

<!-- ### Data Validation Patterns -->

---

**Note**: When you discover a pattern that solves a problem and could be reused elsewhere, add it to this file. This builds institutional knowledge over time.
