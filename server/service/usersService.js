const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UserService {
    static async registerUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
            avatar: data.avatar
        });
        return newUser;
    }

    static async loginUser(data) {
        const user = await User.findOne({ where: { email: data.email } });
        if (user && await bcrypt.compare(data.password, user.password)) {
            return user;
        } else {
            throw new Error('Invalid email or password');
        }
    }

    static async editUser(id, data) {
        const user = await User.findOne({ where: { id: id } });
        if (user) {
            const updatedUser = await user.update(data);
            return updatedUser;
        } else {
            throw new Error('User not found');
        }
    }

    static async setAvatar(id, avatarUrl) {
        const user = await User.findOne({ where: { id: id } });
        if (user) {
            const updatedUser = await user.update({ avatar: avatarUrl });
            return updatedUser;
        } else {
            throw new Error('User not found');
        }
    }

    static async getAvatar(id) {
        const user = await User.findOne({ where: { id: id } });
        if (user) {
            return user.avatar;
        } else {
            throw new Error('User not found');
        }
    }
}

module.exports = UserService;