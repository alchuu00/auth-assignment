const User = require("../models/user");
const UserService = require("../service/usersService");
const {
  generateToken,
  getTokenFromHeaders,
  verifyToken,
} = require("../helpers/auth");

async function registerUser(req, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with that email already exists" });
    }

    const newUser = await UserService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await UserService.loginUser(req.body);
    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
}

async function logoutUser(req, res) {
  console.log("Headers:", req.headers);
  try {
    const token = getTokenFromHeaders(req.headers);
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // block JWTs before they naturally expire
    const blacklist = [];
    blacklist.push(token);

    console.log("User logged out");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Error logging out user" });
  }
}

async function editUser(req, res) {
  try {
    // Get the token from the Authorization header
    const token = getTokenFromHeaders(req.headers);

    // If there's no token, send a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = verifyToken(token);

    // If the token is invalid, send a 401 Unauthorized response
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If the token is valid, handle the request
    const user = await UserService.editUser(req.body);
    console.log("User updated:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  editUser,
};
