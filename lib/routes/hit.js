const { Router } = require('express');
const Hit = require('../model/Hit');

// eslint-disable-next-line new-cap
module.exports = Router()
  .get('/', (req, res, next) => {
    const link = req.params.code;
    Hit.findOne({ link })
      .then(hit => res.send(hit))
      .catch(next);
  });