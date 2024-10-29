# Node.js API with Rate Limiting and Queue Management

This repository contains a Node.js API with a POST route for handling tasks submitted by multiple users. The API enforces a strict, user-based rate limit of 1 task per second and a maximum of 20 tasks per minute for each unique user ID. It uses a queueing system to manage any requests exceeding the rate limit per user, ensuring that no requests are dropped. Redis is used to manage the queue between two Node.js cluster replicas, coordinating task processing across both replicas for high availability and consistency in the rate-limiting mechanism. Task completion details, including the user ID, timestamp, and status, are logged to a log file for tracking and debugging purposes.

## Configuration

1. Install Node.js and npm if they are not already installed.
2. Clone this repository to your local machine.
3. Navigate to the project directory.
4. Install the required dependencies by running the following command:
   ```bash
   npm install
   ```
5. Set up a Redis server and ensure it is running. You can use a local Redis server or a cloud-based Redis service.

## Running the API

1. Start the API server by running the following command:
   ```bash
   npm start
   ```
2. The API server will start on the default port (e.g., 3000). You can change the port by setting the `PORT` environment variable.

## Testing the Rate-Limiting Feature

1. Use a tool like Postman or curl to send POST requests to the API endpoint (e.g., `http://localhost:3000/tasks`).
2. Include a unique user ID in the request body to test the rate-limiting feature.
3. Send multiple requests in quick succession to observe the rate-limiting behavior.
4. Verify that the API enforces the rate limit of 1 task per second and a maximum of 20 tasks per minute per user.

## Verifying the Log Output

1. Check the log file (e.g., `logs/task-completion.log`) to verify that task completion details are being logged correctly.
2. Ensure that the log entries include the user ID, timestamp, and status of each completed task.
3. Use the log output for tracking and debugging purposes.
\
