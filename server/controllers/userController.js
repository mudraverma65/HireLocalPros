const UserService = require("../services/userServices");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const response = await UserService.signUp(req.body);
    if (response?.code) {
      return res.send({
        response: {
          errors: response,
          message: "Email Already exist.",
        },
      });
    }
    const data = {
      success: true,
      response,
    };
    res.send(data);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.getUser = async (req, res) => {
  try {
    const response = await UserService.getUser(req.params.id);
    if (!response) {
      return res.status(200).json({ message: "User not found" });
    }
    res.send(response);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await UserService.deleteUser(req.params.id);
    if (!response) {
      return res.status(200).json({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully", success: true });
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await UserService.updateUser(req.params.id, req.body);
    if (!response) {
      return res.status(200).json({ message: "User not found" });
    }
    res.send({ message: "User updated successfully", success: true });
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const response = await UserService.loginUser(
      req.body.email,
      req.body.password
    );
    if (!response) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", success: false });
    }
    const expirationTime = 5 * 60 * 60;
    const token = jwt.sign(
      JSON.parse(JSON.stringify(response)),
      "localservicemarketplace",
      {
        expiresIn: expirationTime,
      }
    );
    res.send({
      message: "Login successful",
      user: response,
      success: true,
      AccessToken: token,
    });
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const response = await UserService.resetPassword(
      req.body.email,
      req.body.newPassword
    );
    if (!response) {
      return res
        .status(200)
        .json({ message: "Invalid or expired reset token", success: false });
    }
    res.send({ message: "Password reset successful", success: true });
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.getAllServiceProviders = async (req, res) => {
  try {
    const users = await UserService.getAllServiceProviders();
    res.send(users);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.getAllNormalUsers = async (req, res) => {
  try {
    const users = await UserService.getAllNormalUsers();
    res.send(users);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.getUserFromToken = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};
