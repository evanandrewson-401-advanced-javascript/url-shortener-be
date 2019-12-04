const User = require('../model/User');

module.exports = (req, res, next) => {
  const session = req.cookies['session'];
  if(!session) {
    const err = new Error('Please log in or sign up');
    err.status = 401;
    return next(err);   
  }

  return User
    .findByToken(session)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};