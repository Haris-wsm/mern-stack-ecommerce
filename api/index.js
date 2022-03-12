const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is runnig...`);
});
