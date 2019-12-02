const express = require('express');
const app = express();
// const ensureAuth = require('./middleware/ensureAuth');

app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('cors')({
  origin: true,
  credentials: true
}));

//set up routes
app.use('/api/v1/auth', require('./routes/auth'));

app.use(require('./middleware/api-404'));
app.use(require('./middleware/check-connection'));
app.use(require('./middleware/error-handler'));

module.exports = app;