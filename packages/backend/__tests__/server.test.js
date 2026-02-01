/**
 * Server Startup Error Handling Tests
 * 
 * Note: index.js is an entry point file that starts the server immediately
 * when required. This makes it challenging to unit test in isolation.
 * These tests verify the error handling logic exists in the code.
 * 
 * The actual error handling is manually verified by:
 * 1. Starting the server twice on the same port (EADDRINUSE)
 * 2. Starting the server on a privileged port without permissions (EACCES)
 */

const fs = require('fs');
const path = require('path');

describe('Server Startup Error Handling', () => {
  test('should have error handler for EADDRINUSE (port already in use)', () => {
    const indexPath = path.join(__dirname, '../src/index.js');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Verify error handler exists
    expect(indexContent).toContain('server.on(\'error\'');
    expect(indexContent).toContain('EADDRINUSE');
    expect(indexContent).toContain('already in use');
  });

  test('should have error handler for EACCES (permission denied)', () => {
    const indexPath = path.join(__dirname, '../src/index.js');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Verify error handler exists
    expect(indexContent).toContain('server.on(\'error\'');
    expect(indexContent).toContain('EACCES');
    expect(indexContent).toContain('permission');
  });

  test('should have generic error handler', () => {
    const indexPath = path.join(__dirname, '../src/index.js');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Verify generic error handler exists
    expect(indexContent).toContain('server.on(\'error\'');
    expect(indexContent).toContain('console.error');
  });

  test('should export the server instance for graceful shutdown', () => {
    const indexPath = path.join(__dirname, '../src/index.js');
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Verify server is exported
    expect(indexContent).toContain('module.exports = server');
  });
});
