const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const incrAsync = promisify(redisClient.incr).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

const RATE_LIMIT_PER_SECOND = 1;
const RATE_LIMIT_PER_MINUTE = 20;

async function checkRateLimit(userId) {
  const currentSecond = Math.floor(Date.now() / 1000);
  const currentMinute = Math.floor(Date.now() / 60000);

  const secondKey = `rate_limit:${userId}:${currentSecond}`;
  const minuteKey = `rate_limit:${userId}:${currentMinute}`;

  const [secondCount, minuteCount] = await Promise.all([
    getAsync(secondKey),
    getAsync(minuteKey),
  ]);

  if (secondCount && parseInt(secondCount) >= RATE_LIMIT_PER_SECOND) {
    return false;
  }

  if (minuteCount && parseInt(minuteCount) >= RATE_LIMIT_PER_MINUTE) {
    return false;
  }

  await Promise.all([
    incrAsync(secondKey),
    incrAsync(minuteKey),
  ]);

  await Promise.all([
    expireAsync(secondKey, 1),
    expireAsync(minuteKey, 60),
  ]);

  return true;
}

module.exports = {
  checkRateLimit,
};
