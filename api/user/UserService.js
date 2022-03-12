const User = require('../user/User');

const bcrypt = require('bcrypt');

const save = async (body) => {
  const user = {
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 10)
  };

  const newUser = new User(user);

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error();
  }
};

const getUser = async (id) => {
  const user = await User.findById(id);

  return user;
};

const getAllUsers = async (query, currId) => {
  const user = query.new
    ? await User.find({ _id: { $ne: currId } })
        .limit(5)
        .sort({ _id: -1 })
    : await User.find({ _id: { $ne: currId } });
  return user;
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

const updateById = async (id, body) => {
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: false }
    );
    console.log(user);
    return user;
  } catch (error) {
    throw new Error('Update User failure.');
  }
};

const deleteById = async (id) => {
  await User.findByIdAndDelete(id);
};

const getUserStat = async () => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' }
      }
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 }
      }
    }
  ]);
  return data;
};

module.exports = {
  save,
  findByUsername,
  updateById,
  deleteById,
  getUser,
  getAllUsers,
  getUserStat
};
