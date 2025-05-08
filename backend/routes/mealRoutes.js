const express = require('express');
const router = express.Router();
const Meal = require('../controller/mealController');
const { verifyToken } = require('../middlewares/auth'); //ใช้ middleware ในการตรวจสอบ token ของผู้ใช้

router.route('/recommendation')
    .post(verifyToken, Meal.getRecommendedMeals); // protected API //get recommended meals

router.route('/')
    .get(Meal.listAllMeals)
    .post(verifyToken, Meal.createMeals); // protected API

router.route('/:mealId')
    .get(Meal.readAMeal)
    .post(verifyToken, Meal.updateAMeal)  // protected API
    .delete(verifyToken, Meal.deleteAMeal); /// protected API

module.exports = router;
