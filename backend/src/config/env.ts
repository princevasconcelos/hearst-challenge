export default {
    PORT: process.env.PORT || 3003,
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    REDIS_CACHE_EXPIRATION: process.env.REDIS_CACHE_EXPIRATION || 300000,
    CAP_API_URL: process.env.CAP_API_URL || 'https://api.thecatapi.com/v1',
    CAT_API_KEY: process.env.CAT_API_KEY || 'live_5L6ACyp8p0pfjJ6lqQK6r9sbRWnyHiXYiuFaJQHBGTfbXwAgXkmjm4WwdA0vQG9h'
}