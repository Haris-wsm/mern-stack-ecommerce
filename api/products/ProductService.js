const Product = require('../products/Product');

const save = async (body) => {
  const newProduct = new Product(body);
  return await newProduct.save();
};

const update = async (id, body) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );
  return updatedProduct;
};

const deleteById = async (id) => {
  await Product.findByIdAndDelete(id);
};

const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const getProducts = async (query) => {
  const qNew = query.new;
  const qCategory = query.category;

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else {
    products = await Product.find();
  }
  return products;
};

module.exports = { save, update, deleteById, getProduct, getProducts };
