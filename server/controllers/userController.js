const UserService = require("../services/userServices");

exports.signUp = async (req, res) => {
  try {
    const response = await UserService.signUp(req.body);
    if(response?.code) {
      return res.send({message: "Email Already exist"});
    }
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const response = await UserService.getUser(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await UserService.deleteUser(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await UserService.updateUser(req.params.id, req.body);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const response = await UserService.loginUser(req.body.email, req.body.password);
    if (!response) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    res.send({ message: "Login successful", user: response, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const response = await UserService.resetPassword(req.body.email, req.body.newPassword);
    if (!response) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    res.send({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};