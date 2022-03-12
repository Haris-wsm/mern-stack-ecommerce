const mongoose = require('mongoose');
const Product = require('../products/Product');
const { products } = require('./dummy');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

const create = async () => {
  try {
    await Product.create(products);
  } catch (error) {
    console.log(error);
  }
};

const dropAll = async () => {
  try {
    await Product.remove();
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const products = await Product.find({});
    console.log(products);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  create();
} else if (process.argv[2] === '--delete') {
  dropAll();
} else {
  getAll();
}
