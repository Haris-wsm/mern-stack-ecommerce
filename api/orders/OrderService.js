const Order = require('./Order');

const save = async (body) => {
  const order = new Order(body);

  return await order.save();
};

const update = async (id, body) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  return updatedOrder;
};

const deleteById = async (id) => {
  await Order.findByIdAndDelete(id);
};

const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ userId });
  return orders;
};

const getOrders = async () => {
  return await Order.find();
};

const getStaticIncome = async (productId) => {
  const date = new Date();
  const lasMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lasMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && { products: { $elemMatch: { productId } } })
      }
    },
    { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
    { $group: { _id: '$month', total: { $sum: '$sales' } } },
    { $sort: { _id: 1 } }
  ]);
  return income;
};

module.exports = {
  save,
  update,
  deleteById,
  getOrdersByUser,
  getOrders,
  getStaticIncome
};
