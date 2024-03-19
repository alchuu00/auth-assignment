const User = require("../models/user");
const bcrypt = require("bcryptjs");

class UserService {
  static async registerUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      name: data.fullName,
      email: data.email,
      password: hashedPassword,
      avatar: data.avatar,
    });
    return newUser;
  }

  static async loginUser(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user && (await bcrypt.compare(data.password, user.password))) {
      return user;
    } else {
      if (!user) {
        throw new Error("User not found");
      }
      if (!(await bcrypt.compare(data.password, user.password))) {
        throw new Error("Password does not match");
      }
    }
  }

  static async editUser(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      const updatedUser = await user.update(data);
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  }
}

module.exports = UserService;
