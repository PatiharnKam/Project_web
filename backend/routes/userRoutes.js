const express = require('express');
const router = express.Router();
const User = require('../controller/userController');
const { verifyToken } = require('../middlewares/auth');

router.post('/cal', User.calculateBMR);
router.post('/check-email', User.checkemail);

router.route('/')
    .get(verifyToken, User.listAllUsers) // 🔐 protected
    .post(User.createAUser);

router.route('/signin')
    .post(User.signInUser);

router.route('/:userId')
    .get(verifyToken, User.readAUser)    // 🔐 protected
    .post(verifyToken, User.updateAUser) // 🔐 protected
    .delete(verifyToken, User.deleteAUser); // 🔐 protected

module.exports = router;
