'use strict'
module.exports = function(app){
    var User = require('../controller/userController')

    app.route('/users')
        .get(User.listAllUsers)
        .post(User.createAUser)

    app.route('/users/:userId')
        .get(User.readAUser)
        .delete(User.deleteAUser)
        .post(User.updateAUser)

    var Meal = require('../controller/mealController')
    app.route('/meals')
        .get(Meal.listAllMeals)
        .post(Meal.createAMeal)
    app.route('/meals/:mealId')
        .get(Meal.readAMeal)
        .delete(Meal.deleteAMeal)
        .post(Meal.updateAMeal)
}