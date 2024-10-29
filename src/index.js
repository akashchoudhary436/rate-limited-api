// src/index.js
require('dotenv').config();  // Load environment variables

console.log('QUEUE_NAME:', process.env.QUEUE_NAME); // Debug line

const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const rateLimiter = require('./rateLimiter');
const taskQueue = require('./taskQueue');
const logger = require('./logger');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length; // Use all available CPUs
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Fork worker processes
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    app.use(bodyParser.json());

    app.post('/tasks', async (req, res) => {
        const userId = req.body.user_id;

        try {
            const isAllowed = await rateLimiter.checkRateLimit(userId);
            if (!isAllowed) {
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }

            taskQueue.add({ userId, task: req.body.task });
            res.status(200).json({ message: 'Task added to queue' });
        } catch (error) {
            console.error('Error adding task to queue:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    process.on('SIGINT', async () => {
        console.log("Closing application...");
        process.exit();
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
