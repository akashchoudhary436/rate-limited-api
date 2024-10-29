// src/taskQueue.js

const task = require('./taskFunction'); // Ensure this path is correct
const logger = require('./logger');

const taskQueue = []; // In-memory task queue

function add(taskData) {
  taskQueue.push(taskData);
  processTaskQueue(); // Start processing tasks immediately
}

async function processTaskQueue() {
  while (taskQueue.length > 0) {
    const { userId } = taskQueue.shift(); // Get the first task in the queue
    await task(userId); // Call the task function with userId
  }
}

module.exports = {
  add,
};
