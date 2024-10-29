require('dotenv').config();

module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  bull: {
    queueName: process.env.QUEUE_NAME,
  },
};
