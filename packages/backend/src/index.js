const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3001;

// INTENTIONAL ISSUE: Missing error handling for server startup
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
