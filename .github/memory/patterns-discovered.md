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
---

## React Query Mutation Pattern

**Context**: When implementing CRUD operations in a React app using React Query

**Problem**: Need to maintain UI state synchronized with server state after mutations

**Solution**: Use React Query mutations with `onSuccess` callbacks to invalidate and refetch related queries

**Example**:
```javascript
const queryClient = useQueryClient();

// Mutation for creating
const addTodoMutation = useMutation({
  mutationFn: async (title) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },
  onSuccess: () => {
    // Invalidate queries to trigger refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// Mutation for updating
const updateTodoMutation = useMutation({
  mutationFn: async ({ id, title }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// Usage
const handleUpdate = (id, title) => {
  updateTodoMutation.mutate({ id, title });
};
```

**Related Files**:
- packages/frontend/src/App.js

**Notes**: 
- Always invalidate related queries after mutations to keep UI in sync
- Use `queryClient.invalidateQueries()` in `onSuccess` callback
- React Query automatically handles loading states and error handling
- Mutations can accept single values or objects for complex operations

---

## React Edit Mode State Pattern

**Context**: When implementing inline editing for list items in React

**Problem**: Need to track which item is being edited and manage edit state separately from main data

**Solution**: Use dedicated state for tracking edit mode and temporary edit values

**Example**:
```javascript
function App() {
  const [editingTodo, setEditingTodo] = useState(null);  // Track which todo is being edited
  const [editTitle, setEditTitle] = useState('');         // Track the temporary edit value
  
  const handleEditTodo = (todo) => {
    setEditingTodo(todo.id);
    setEditTitle(todo.title);  // Initialize with current value
  };

  const handleSaveEdit = (id) => {
    if (editTitle.trim()) {
      updateTodoMutation.mutate({ id, title: editTitle });
      // Reset edit state in mutation's onSuccess callback
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditTitle('');
  };

  return (
    <>
      {editingTodo === todo.id ? (
        // Edit mode: Show input and save/cancel buttons
        <>
          <TextField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Button onClick={() => handleSaveEdit(todo.id)}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </>
      ) : (
        // View mode: Show text and edit button
        <>
          <Typography>{todo.title}</Typography>
          <IconButton onClick={() => handleEditTodo(todo)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </>
  );
}
```

**Related Files**:
- packages/frontend/src/App.js

**Notes**: 
- Use `null` for editingTodo to indicate "no item being edited"
- Store the ID of the editing item, not the entire object
- Initialize edit state with current values when entering edit mode
- Reset edit state after saving or canceling
- Conditional rendering based on editingTodo === todo.id

---

## React Error Handling with React Query

**Context**: When fetching data with React Query and need to display error states

**Problem**: Need to handle API errors gracefully and show user-friendly messages

**Solution**: Use React Query's error property and throw errors in queryFn to trigger error state

**Example**:
```javascript
const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      // Throw error if response not ok
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      return data;
    },
  });
};

function App() {
  const { data: todos = [], isLoading, error } = useTodos();
  
  return (
    <>
      {isLoading && <CircularProgress />}
      
      {error && (
        <Typography color="error">
          Error loading todos. Please try again later.
        </Typography>
      )}
      
      {!isLoading && !error && (
        // Render data
      )}
    </>
  );
}
```

**Related Files**:
- packages/frontend/src/App.js

**Notes**: 
- React Query automatically captures thrown errors in the error property
- Check `response.ok` and throw error if false
- Display error UI only when error exists
- Hide main content when in error state
- Keep error messages user-friendly

---

## Conditional Rendering Pattern for Empty States

**Context**: When displaying lists that may be empty and need a helpful message

**Problem**: Need to show appropriate UI when no data exists without confusing users

**Solution**: Use compound conditionals to check loading, error, and empty states

**Example**:
```javascript
function App() {
  const { data: todos = [], isLoading, error } = useTodos();
  
  return (
    <>
      {isLoading && <CircularProgress />}
      
      {error && <ErrorMessage />}
      
      {!isLoading && !error && todos.length === 0 && (
        <Card>
          <CardContent>
            <Typography align="center" color="text.secondary">
              No todos yet! Add one above to get started.
            </Typography>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !error && todos.length > 0 && (
        <List>
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </List>
      )}
    </>
  );
}
```

**Related Files**:
- packages/frontend/src/App.js

**Notes**: 
- Check loading and error states before checking empty state
- Use compound conditionals: `!isLoading && !error && todos.length === 0`
- Provide actionable empty state messages
- Keep empty state visually distinct but not alarming
- Consider showing illustration or helpful hints in empty state

---

## Computed Stats Pattern

**Context**: When displaying aggregate statistics derived from array data

**Problem**: Need to show real-time counts or calculations based on current data

**Solution**: Use filter() to compute derived values just before rendering

**Example**:
```javascript
function App() {
  const { data: todos = [] } = useTodos();
  
  // Calculate stats from current data
  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  
  return (
    <>
      {/* Render todos */}
      
      {/* Display stats */}
      <Box>
        <Chip label={`${incompleteCount} items left`} color="primary" />
        <Chip label={`${completedCount} completed`} color="success" />
      </Box>
    </>
  );
}
```

**Related Files**:
- packages/frontend/src/App.js

**Notes**: 
- Calculate derived values in the component body, not in state
- Use array methods like filter(), reduce(), etc. for calculations
- These values update automatically when data changes
- No need for useEffect or separate state management
- Performance is fine for small-to-medium datasets

---

## Relative API URL Pattern with Proxy

**Context**: When frontend and backend run on different ports during development

**Problem**: Avoid hardcoding localhost URLs that won't work in production

**Solution**: Use relative URLs and configure proxy in package.json

**Example**:
```json
// In packages/frontend/package.json
{
  "proxy": "http://localhost:3001"
}
```

```javascript
// In React components
const API_URL = '/api/todos';  // Relative URL

fetch(API_URL)  // In dev: proxied to http://localhost:3001/api/todos
                // In prod: same origin
```

**Related Files**:
- packages/frontend/package.json (proxy config)
- packages/frontend/src/App.js (API_URL constant)

**Notes**: 
- Create React App supports proxy configuration out of the box
- Relative URLs work in both development (via proxy) and production (same origin)
- No need for environment variables for API URLs
- Proxy only works in development mode (npm start)
- In production build, API must be on same domain or use CORS

---