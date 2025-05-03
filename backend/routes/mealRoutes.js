const express = require('express');
const router = express.Router();
const Meal = require('../controller/mealController');

router.route('/')
    .get(Meal.listAllMeals)
    .post(Meal.createAMeal);

router.route('/:mealId')
    .get(Meal.readAMeal)
    .post(Meal.updateAMeal)
    .delete(Meal.deleteAMeal);

module.exports = router;
