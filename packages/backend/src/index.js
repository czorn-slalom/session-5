const app = require('./app');

const PORT = process.env.PORT || 3001;

// Start server with error handling
const server = app.listen(PORT, () => {
  // INTENTIONAL LINT VIOLATION (for Step 5-2): console.log should be replaced with proper logging
  console.log(`Server running on port ${PORT}`);
});

// Handle server startup errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use`);
    console.error('Please try a different port or stop the process using this port');
  } else if (error.code === 'EACCES') {
    console.error(`Error: Permission denied to use port ${PORT}`);
    console.error('Please try using a port number above 1024 or run with appropriate permissions');
  } else {
    console.error('Server startup error:', error.message);
  }
  process.exit(1);
});

module.exports = server;
