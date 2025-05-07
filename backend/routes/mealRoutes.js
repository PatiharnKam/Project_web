const express = require('express');
const router = express.Router();
const Meal = require('../controller/mealController');
const { verifyToken } = require('../middlewares/auth');

router.route('/recommendation')
    .post(verifyToken, Meal.getRecommendedMeals); // 🔐 ต้อง login ก่อนถึงจะเรียกเมนูได้

router.route('/')
    .get(Meal.listAllMeals)
    .post(verifyToken, Meal.createAMeal); // 🔐 ป้องกันคนไม่ login ไม่ให้โพสต์

router.route('/:mealId')
    .get(Meal.readAMeal)
    .post(verifyToken, Meal.updateAMeal)  // 🔐 ป้องกันแก้ไข
    .delete(verifyToken, Meal.deleteAMeal); // 🔐 ป้องกันลบ

module.exports = router;
