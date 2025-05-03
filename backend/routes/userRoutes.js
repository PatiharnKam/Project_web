const express = require('express');
const router = express.Router();
const User = require('../controller/userController');

router.post('/cal', User.calculateBMR);

router.route('/')
    .get(User.listAllUsers)
    .post(User.createAUser);

router.route('/:userId')
    .get(User.readAUser)
    .post(User.updateAUser)
    .delete(User.deleteAUser);


module.exports = router;
