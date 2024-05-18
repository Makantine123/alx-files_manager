// controllers

const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  },

  async getStats(req, res) {
    res.status(200).json({
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    });
  },
};

module.exports = AppController;
