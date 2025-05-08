'use strict'
const mongoose = require('mongoose');
const Meal = require('../models/mealModel');

// List all meals
exports.listAllMeals = async function(req, res){
    var query = { sort: { firstName: 1 } }
    try{
        let meal = await Meal.find({}, null, query)
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
    }
}

// Create new meals
exports.createMeals = async function(req, res) {
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

// Read a meal by ID
exports.readAMeal = async function(req, res){
    try{
        let meal = await Meal.findById(req.params.mealId)
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
    }
}

// Delete a meal by ID
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

// Update a meal by ID
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

// Get เมนูอาหารที่แนะนำ จากข้อมูลของผู้ใช้
exports.getRecommendedMeals = async (req, res) => {
    try {
      const {
        minCalories,
        maxCalories,
        proteinLimit,
        carbsLimit,
        fatLimit
      } = req.body;
      
      // ดึงข้อมูลเมนูอาหารทั้งหมดเฉพาที่ต้องการ
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
  
      let combos = []; // ใช้เก็บชุดอาหารที่เป็นไปได้
    
      // loop เพื่อสร้างชุดอาหารที่เป็นไปได้ทั้งหมด โดยเลือก 3 เมนูมารวมกัน
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
            
            // ข้ามชุดที่อยู่นอกช่วงแคลอรี่ที่กำหนด
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
      
      // เรียงลำดับ combos ตามค่า diff จากน้อยไปมาก
      combos.sort((a, b) => a.diff - b.diff);
      // เลือกชุด top 10% (หรืออย่างน้อย 5 ชุด) ที่ดีที่สุด
      const topCombos = combos.slice(0, Math.max(5, Math.floor(combos.length * 0.1)));
      // สุ่มเลือก 1 ชุดจาก topCombos ที่ใกล้เคียงที่สุด
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
  
  

  