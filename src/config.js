// src/config.js
require('dotenv').config();

module.exports = {
  bull: {
    queueName: process.env.QUEUE_NAME,
  },
};
