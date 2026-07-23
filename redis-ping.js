const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

redis.set('keepalive', Date.now())
  .then(() => {
    console.log('Redis pinged successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })