const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  console.log("token generated");
  return jwt.sign({ userId }, secret);
};

const verifyToken = (token) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

const getTokenFromHeaders = (headers) => {
  const header = headers.authorization;

  console.log("header", header);

  if (!header) {
    return null;
  }

  const parts = header.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};

module.exports = { generateToken, verifyToken, getTokenFromHeaders };
