import redisClient from './utils/redis';

(async () => {
  console.log(redisClient.isAlive());
  console.log(await redisClient.get('mykey'));
  await redisClient.set('mykey', 12, 5);
  console.log(await redisClient.get('mykey'));

  setTimeout(async () => {
    console.log(await redisClient.get('mykey'));
  }, 1000 * 10);
})();
