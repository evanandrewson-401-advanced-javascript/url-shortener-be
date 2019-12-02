const { Router } = require('express');
const Link = require('../model/Link');
const ensureAuth = require('../middleware/ensureAuth');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/create', ensureAuth, (req, res, next) => {
    const { original_url, code } = req.body;
    Link.create({ original_url, code, user: req.user._id })
      .then(link => res.send(link))
      .catch(next);
  })
  .get('/list', ensureAuth, (req, res, next) => {
    Link.find({ user: req.user._id })
      .then(list => list.json())
      .catch(next);
  })
  .get('/:code', (req, res, next) => {
    const code = req.params.code;
    Link.findOne({ code })
      .then(link => res.redirect(link.original_url))
      .catch(next);
  });
