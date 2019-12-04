require('dotenv').config();
require('./lib/utils/connect')(process.env.MONGODB_URI);

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
