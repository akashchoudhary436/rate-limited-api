const Bull = require('bull');
const logger = require('./logger');

const taskQueue = new Bull('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

taskQueue.process(async (job) => {
  const { userId, task } = job.data;

  // Simulate task processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  logger.info(`Task completed for user ${userId} at ${new Date().toISOString()}`);
});

module.exports = taskQueue;
