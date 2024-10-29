  // src/rateLimiter.js

  const rateLimitStore = {}; // In-memory store for rate limits

  const RATE_LIMIT_PER_SECOND = 1;
  const RATE_LIMIT_PER_MINUTE = 20;

  async function checkRateLimit(userId) {
    const currentSecond = Math.floor(Date.now() / 1000);
    const currentMinute = Math.floor(Date.now() / 60000);

    if (!rateLimitStore[userId]) {
      rateLimitStore[userId] = { second: {}, minute: {} };
    }

    // Initialize second and minute objects
    if (!rateLimitStore[userId].second[currentSecond]) {
      rateLimitStore[userId].second[currentSecond] = 0;
    }
    if (!rateLimitStore[userId].minute[currentMinute]) {
      rateLimitStore[userId].minute[currentMinute] = 0;
    }

    // Check the current counts
    const secondCount = rateLimitStore[userId].second[currentSecond];
    const minuteCount = rateLimitStore[userId].minute[currentMinute];

    if (secondCount >= RATE_LIMIT_PER_SECOND) {
      return false;
    }
    
    if (minuteCount >= RATE_LIMIT_PER_MINUTE) {
      return false;
    }

    // Increment counts
    rateLimitStore[userId].second[currentSecond]++;
    rateLimitStore[userId].minute[currentMinute]++;

    // Cleanup old entries to prevent memory bloat
    cleanupRateLimitStore(userId);

    return true;
  }

  function cleanupRateLimitStore(userId) {
    const currentSecond = Math.floor(Date.now() / 1000);
    const currentMinute = Math.floor(Date.now() / 60000);

    // Remove old second counts
    for (const key in rateLimitStore[userId].second) {
      if (key < currentSecond) {
        delete rateLimitStore[userId].second[key];
      }
    }

    // Remove old minute counts
    for (const key in rateLimitStore[userId].minute) {
      if (key < currentMinute) {
        delete rateLimitStore[userId].minute[key];
      }
    }
  }

  module.exports = {
    checkRateLimit,
  };
