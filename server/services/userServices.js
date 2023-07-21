const User = require("../models/user");

exports.signUp = async (requestBody) => {
  try {
    const user = new User(requestBody);
    return await user.save();
  } catch (error) {
    return error;
  }
};

exports.getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return error;
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    return error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    return error;
  }
};

exports.updateUser = async (userId, updates) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    return user;
  } catch (error) {
    return error;
  }
};

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email, password });
    return user;
  } catch (error) {
    return error;
  }
};

exports.resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );
    return user;
  } catch (error) {
    return error;
  }
};

exports.getAllServiceProviders = async () => {
  try {
    const users = await User.find({ isServiceProvider: true });
    return users;
  } catch (error) {
    return error;
  }
};

exports.getAllNormalUsers = async () => {
  try {
    const users = await User.find({ isServiceProvider: false });
    return users;
  } catch (error) {
    return error;
  }
};
