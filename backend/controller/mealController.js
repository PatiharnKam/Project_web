'use strict'
const mongoose = require('mongoose');
const Meal = require('../models/mealModel');

exports.listAllMeals = async function(req, res){
    var query = { sort: { firstName: 1 } }
    try{
        let meal = await Meal.find({}, null, query)
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.createAMeal = async function(req, res) {
    try {
        if (Array.isArray(req.body)) {
            // กรณีส่งหลายเมนู
            let meals = await Meal.insertMany(req.body);
            res.status(200).json({ message: 'Inserted multiple meals', meals });
        } else {
            // กรณีส่งเมนูเดียว
            let newMeal = new Meal(req.body);
            let meal = await newMeal.save();
            res.status(200).json(meal);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.readAMeal = async function(req, res){
    try{
        let meal = await Meal.findById(req.params.mealId)
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.deleteAMeal = async function(req, res){
    console.log(req.params.mealId)

    try{
         let meal = await Meal.findByIdAndDelete(req.params.mealId)
        const response = {
            message: "Delete meal id: "+ req.params.mealId +" successfully",
            id: meal._id
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.updateAMeal = async function(req, res){
    var newmeal = {}
    newmeal = req.body

    try{
        let meal = await Meal.findByIdAndUpdate(req.params.mealId, newmeal, {new: true})
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
    }
}
;

exports.getRecommendedMeals = async (req, res) => {
    try {
      const {
        minCalories,
        maxCalories,
        proteinLimit,
        carbsLimit,
        fatLimit
      } = req.body;
  
      const meals = await Meal.find({}, {
        MealName: 1,
        Calories: 1,
        Protein: 1,
        Carbohydrate: 1,
        Fat: 1,
        ImageLink: 1
      });
  
      if (meals.length < 3) {
        return res.status(400).json({ message: 'Not enough meals in the database' });
      }
  
      let combos = [];
  
      for (let i = 0; i < meals.length - 2; i++) {
        for (let j = i + 1; j < meals.length - 1; j++) {
          for (let k = j + 1; k < meals.length; k++) {
            const combo = [meals[i], meals[j], meals[k]];
            const total = {
              calories: combo.reduce((sum, m) => sum + m.Calories, 0),
              protein: combo.reduce((sum, m) => sum + m.Protein, 0),
              carbs: combo.reduce((sum, m) => sum + m.Carbohydrate, 0),
              fat: combo.reduce((sum, m) => sum + m.Fat, 0)
            };
  
            if (total.calories < minCalories || total.calories > maxCalories) continue;
  
            const diff =
              Math.abs(proteinLimit - total.protein) +
              Math.abs(carbsLimit - total.carbs) +
              Math.abs(fatLimit - total.fat);
  
            combos.push({
              meals: combo,
              total,
              diff
            });
          }
        }
      }
  
      if (combos.length === 0) {
        return res.status(404).json({ message: 'No meal combinations found within the calorie range.' });
      }
  
      combos.sort((a, b) => a.diff - b.diff);
      const topCombos = combos.slice(0, Math.max(5, Math.floor(combos.length * 0.1)));
      const randomPick = topCombos[Math.floor(Math.random() * topCombos.length)];
  
      res.status(200).json({
        selectedMeals: randomPick.meals,
        total: randomPick.total
      });
  
    } catch (error) {
      console.error('Error generating meal plan:', error);
      res.status(500).json({ message: 'Failed to generate meal plan', error });
    }
  };
  
  

  