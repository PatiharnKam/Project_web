const express = require('express');
const router = express.Router();
const User = require('../controller/userController');
const { verifyToken } = require('../middlewares/auth'); //ใช้ middleware ในการตรวจสอบ token ของผู้ใช้

router.post('/cal', User.calculateBMR); // คำนวณ BMR และ TDEE
router.post('/check-email', User.checkemail); // ตรวจสอบอีเมลซ้ำ

router.route('/')
    .get(verifyToken, User.listAllUsers) // protected API //get all users
    .post(User.createAUser);// create new user

router.route('/signin')
    .post(User.signInUser); // sign in user

router.route('/:userId')
    .get(verifyToken, User.readAUser)    // protected API
    .post(verifyToken, User.updateAUser) // protected API
    .delete(verifyToken, User.deleteAUser); // protected API

module.exports = router;
