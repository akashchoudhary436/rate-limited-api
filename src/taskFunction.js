// src/taskFunction.js

const logger = require('./logger'); // Assuming logger.js is used for logging to a file

async function task(userId) {
  const timestamp = Date.now();
  console.log(`${userId} - task completed at - ${timestamp}`);
  logger.info(`${userId} - task completed at - ${timestamp}`); // Log to file using winston
}

module.exports = task;
