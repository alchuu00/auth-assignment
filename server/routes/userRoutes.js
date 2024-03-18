const express = require('express');
const router = express.Router();
const { registerUser, loginUser, editUser, setAvatar, getAvatar } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/edit/:id', editUser);
router.put('/setAvatar/:id', setAvatar);
router.get('/getAvatar/:id', getAvatar);

module.exports = router;