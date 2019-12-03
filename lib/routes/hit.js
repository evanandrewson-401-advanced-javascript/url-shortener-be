const { Router } = require('express');
const Hit = require('../model/Hit');

// eslint-disable-next-line new-cap
module.exports = Router()
  .get('/:linkId', (req, res, next) => {
    const { linkId } = req.params;
    Hit.findOne({ link: linkId })
      .then(hit => res.send(hit))
      .catch(next);
  });