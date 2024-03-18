const User = require("../models/user");
const UserService = require("../service/usersService");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const newUser = await UserService.registerUser(req.body);
    console.log("User registered:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await UserService.loginUser(req.body);
    console.log("User logged in:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
}

async function editUser(req, res) {
  try {
    const user = await UserService.editUser(req.body);
    console.log("User updated:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
}

async function setAvatar(req, res) {
  try {
    const updatedUser = await UserService.setAvatar(
      req.params.id,
      req.body.avatar
    );
    console.log("User avatar updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error setting user avatar:", error);
    res.status(500).json({ message: "Error setting user avatar" });
  }
}

async function getAvatar(req, res) {
  try {
    const avatarUrl = await UserService.getAvatar(req.params.id);
    console.log("User avatar URL:", avatarUrl);
    res.status(200).json({ avatar: avatarUrl });
  } catch (error) {
    console.error("Error getting user avatar:", error);
    res.status(500).json({ message: "Error getting user avatar" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  editUser,
  setAvatar,
  getAvatar,
};
