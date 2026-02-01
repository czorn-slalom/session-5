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

## REST API CRUD Implementation Pattern

**Context**: When implementing REST API endpoints for CRUD operations on a resource

**Problem**: Need consistent, predictable API endpoints that follow REST conventions and handle errors properly

**Solution**: Use standard HTTP methods and status codes with consistent error handling

**Example**:
```javascript
// GET - List all resources (200)
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST - Create new resource (201 on success, 400 on validation error)
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: nextId++,
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT - Update existing resource (200 on success, 404 if not found)
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  
  const todo = todos.find((t) => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  if (title !== undefined) {
    todo.title = title;
  }
  
  res.json(todo);
});

// PATCH - Partial update (200 on success, 404 if not found)
app.patch('/api/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE - Remove resource (200 on success, 404 if not found)
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(200).json({ message: 'Todo deleted successfully' });
});
```

**Related Files**:
- packages/backend/src/app.js

**Notes**: 
- Use appropriate HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found)
- Always validate input before processing
- Return 404 when resource is not found
- Use parseInt() to convert string IDs from URL params to numbers
- For arrays: use `.find()` to locate, `.findIndex()` + `.splice()` to delete

---

## Boolean Toggle Pattern

**Context**: When implementing toggle functionality for boolean flags

**Problem**: Need to flip a boolean value between true and false

**Solution**: Use the NOT operator (!) rather than conditionally setting values

**Example**:
```javascript
// ❌ BAD - Always sets to true, doesn't toggle
todo.completed = true;

// ❌ BAD - Verbose conditional approach
todo.completed = todo.completed === false ? true : false;

// ✅ GOOD - Simple and correct
todo.completed = !todo.completed;
```

**Related Files**:
- packages/backend/src/app.js (PATCH toggle endpoint)

**Notes**: 
- The NOT operator (!) is the simplest and most readable way to toggle boolean values
- Works regardless of initial state (true becomes false, false becomes true)
- Avoids common bugs where value is always set to one state

---

## Input Validation Pattern

**Context**: When accepting user input through API endpoints

**Problem**: Need to validate that required fields are present and meet basic requirements

**Solution**: Validate early and return clear error messages with 400 status

**Example**:
```javascript
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  // Validate: check for presence and non-empty after trimming
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  // Proceed with valid input
  const newTodo = {
    id: nextId++,
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Related Files**:
- packages/backend/src/app.js (POST endpoint)

**Notes**: 
- Use `return` after sending error response to prevent further execution
- Check both `!field` (undefined/null) and `field.trim() === ''` (whitespace-only)
- Return 400 (Bad Request) for validation errors
- Provide clear error messages

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
