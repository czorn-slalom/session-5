import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

// Test 1: Stats Calculation
describe('Stats Display', () => {
  test('should display correct count of incomplete todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Test 1', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Test 2', completed: true, createdAt: new Date().toISOString() },
      { id: 3, title: 'Test 3', completed: false, createdAt: new Date().toISOString() },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('2 items left')).toBeInTheDocument();
    });
  });

  test('should display correct count of completed todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Test 1', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Test 2', completed: true, createdAt: new Date().toISOString() },
      { id: 3, title: 'Test 3', completed: true, createdAt: new Date().toISOString() },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('2 completed')).toBeInTheDocument();
    });
  });
});

// Test 2: Empty State
describe('Empty State', () => {
  test('should display empty state message when there are no todos', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });

  test('should not display empty state message when todos exist', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    });
  });
});

// Test 3: Error Handling
describe('Error Handling', () => {
  test('should display error message when API fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });

  test('should display error message when API returns error status', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });
});

// Test 4: Edit Functionality
describe('Edit Functionality', () => {
  test('should enter edit mode when edit button is clicked', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Should show input field with current value
    const input = screen.getByDisplayValue('Test Todo');
    expect(input).toBeInTheDocument();
  });

  test('should update todo when edit is saved', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];

    const updatedTodo = {
      id: 1,
      title: 'Updated Todo',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    global.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(updatedTodo),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([updatedTodo]),
        })
      );

    const testQueryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change the input value
    const input = screen.getByDisplayValue('Test Todo');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    // Click save button
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Verify PUT request was made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/todos/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ title: 'Updated Todo' }),
        })
      );
    });
  });
});
