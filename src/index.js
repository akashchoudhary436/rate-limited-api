const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const Bull = require('bull');
const winston = require('winston');
const rateLimiter = require('./rateLimiter');
const taskQueue = require('./taskQueue');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const taskQueue = new Bull('taskQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

app.post('/tasks', async (req, res) => {
  const userId = req.body.userId;

  try {
    const isAllowed = await rateLimiter.checkRateLimit(userId);
    if (!isAllowed) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    await taskQueue.add({ userId, task: req.body.task });
    res.status(200).json({ message: 'Task added to queue' });
  } catch (error) {
    console.error('Error adding task to queue:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

taskQueue.process(async (job) => {
  const { userId, task } = job.data;

  // Simulate task processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  logger.info(`Task completed for user ${userId} at ${new Date().toISOString()}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
