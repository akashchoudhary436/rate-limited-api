// src/taskQueue.js

const Bull = require('bull');
const task = require('./taskFunction'); // Ensure this path is correct
const logger = require('./logger');

const taskQueue = new Bull('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

taskQueue.process(async (job) => {
  const { userId } = job.data;
  await task(userId); // Call the task function with userId
});

module.exports = taskQueue;
