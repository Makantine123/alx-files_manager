// users controllers

const createHash = require('crypto');

const dbClient = require('../utils/db');

const UsersController = {
  postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400);
      res.send({
        error: 'Missing email',
      });
      return;
    }

    if (!password) {
      res.status(400);
      res.send({
        error: 'Missing password',
      });
      return;
    }

    const users = dbClient.db.collection('users');

    const user = users.findOne({
      email,
    });

    if (user) {
      res.status(400);
      res.send({
        error: 'Already exists',
      });
      return;
    }

    const passHash = createHash('sha1').update(password).digest('hex');
    const newUser = users.insertOne({
      email,
      password: passHash,
    });

    res.status(201);
    res.send({
      id: newUser.inserteId,
      email,
    });
  },
};

module.exports = UsersController;
