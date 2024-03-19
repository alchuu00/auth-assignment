const express = require('express');
const router = express.Router();
const { registerUser, loginUser, editUser, logoutUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update', editUser);

module.exports = router;