// controllers

import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const AppController = {
  getStatus: (res) => {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  },

  getStats: (res) => {
    res.status(200).json({
      users: dbClient.nbUsers(),
      files: dbClient.nbFiles(),
    });
  },
};

export default AppController;
