const Cart = require('./Cart');

const save = async (body) => {
  const cart = new Cart(body);
  return await cart.save();
};

const update = async (id, body) => {
  const updateCart = await Cart.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  return updateCart;
};

const deleteById = async (id) => {
  await Cart.findByIdAndDelete(id);
};

const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};
module.exports = { save, update, deleteById };
