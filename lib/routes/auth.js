/* eslint-disable no-unused-vars */
const { Router } = require('express');
const User = require('../model/User');
const ensureAuth = require('../middleware/ensureAuth');

const MAX_AGE = 24 * 60 * 60 * 1000;

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => {
        res.cookie('session', user.token(), {
          maxAge: MAX_AGE,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User
      .findOne({ username })
      .then(user => {
        if(!user || !user.compare(password)) throw new Error('Invalid username or password');
        res.cookie('session', user.token(), {
          maxAge: MAX_AGE,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });