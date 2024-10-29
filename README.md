# Node.js API with Rate Limiting and Queue Management

This repository contains a Node.js API with a POST route for handling tasks submitted by multiple users. The API enforces a strict, user-based rate limit of 1 task per second and a maximum of 20 tasks per minute for each unique user ID. It uses a queueing system to manage any requests exceeding the rate limit per user, ensuring that no requests are dropped. Redis is used to manage the queue between two Node.js cluster replicas, coordinating task processing across both replicas for high availability and consistency in the rate-limiting mechanism. Task completion details, including the user ID, timestamp, and status, are logged to a log file for tracking and debugging purposes.

## Configuration

1. **Install Node.js and npm** if they are not already installed. You can download them from [Node.js Official Website](https://nodejs.org/).

2. **Clone this repository** to your local machine using the following command:
   ```bash
   git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install the required dependencies by running the following command:

bash
Copy code
npm install
Set up a Redis server and ensure it is running. You can use a local Redis server or a cloud-based Redis service. If you want to run Redis locally, you can install it from Redis.io or use Docker:

bash
Copy code
docker run --name redis -d -p 6379:6379 redis
Running the API
Start the API server by running the following command:

bash
Copy code
npm start
The API server will start on the default port (e.g., 3000). You can change the port by setting the PORT environment variable:

bash
Copy code
PORT=4000 npm start
Testing the Rate-Limiting Feature
Use a tool like Postman or curl to send POST requests to the API endpoint (e.g., http://localhost:3000/tasks).

Include a unique user ID and a task name in the request body. For example:

json
Copy code
{
  "user_id": "user123",
  "task": "Sample Task"
}
Send multiple requests in quick succession to observe the rate-limiting behavior. You can send the requests with a loop in your chosen tool or use the command line.

Verify that the API enforces the rate limit of 1 task per second and a maximum of 20 tasks per minute per user. If the rate limit is exceeded, you should receive a 429 Too Many Requests status response.

Verifying the Log Output
Check the log file (e.g., logs/task-completion.log) to verify that task completion details are being logged correctly.

Ensure that the log entries include the user ID, timestamp, and status of each completed task. Example log entry:

json
Copy code
{
  "user_id": "user123",
  "timestamp": 1698350458123,
  "status": "task completed"
}
Use the log output for tracking and debugging purposes. Monitor this log file to review task processing results and any potential issues.

Additional Information
The API is designed to prioritize resilience and efficiency, managing asynchronous operations effectively and handling possible edge cases, such as network failures or server restarts.

The codebase follows best practices with clear comments, especially around rate limiting and queue management logic.

Thorough documentation is provided to ensure the solution is fully operational and easy to maintain.

For further improvements, consider implementing more robust error handling, monitoring, and alerting based on log entries.

typescript
Copy code

### Instructions for Use:
- Copy the entire content above and save it as `README.md` in your project directory.
- Replace `<repository-url>` and `<project-directory>` with the actual URL of your repository and the directory name, respectively.
- This file can be easily rendered on GitHub or any Markdown viewer to provide clear documentation for your project. 

If you need any additional modifications or specific details added, just let me know!
