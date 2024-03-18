const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        });
        console.log('User registered:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            console.log('User logged in:', user);
            res.status(200).json(user);
        } else {
            console.log('Invalid email or password');
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
}

async function editUser(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            const updatedUser = await user.update(req.body);
            console.log('User updated:', updatedUser);
            res.status(200).json(updatedUser);
        } else {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json({ message: 'Error editing user' });
    }
}

module.exports = {
    createUser,
    registerUser,
    loginUser,
    editUser,
};