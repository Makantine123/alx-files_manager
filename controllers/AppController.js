// controllers

const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus: (req, res) => {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  },

  getStats: (req, res) => {
    res.status(200).json({
      users: dbClient.nbUsers(),
      files: dbClient.nbFiles(),
    });
  },
};

module.exports = AppController;
