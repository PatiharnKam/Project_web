'use strict'
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT signing

exports.listAllUsers = async function(req, res){
    var query = { sort: { firstName: 1 } }
    try{
        let user = await User.find({}, null, query)
        res.status(200).json(user);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.createAUser = async function(req, res){
    var newUser = new User(req.body)
    try{
        let user = await newUser.save()
        res.status(200).json(user);
    } catch (error){
        res.status(500).json(error)
    }
}
exports.checkemail = async function(req, res) {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        res.status(200).json({ exists: !!user });
      } catch (err) {
        res.status(500).json({ message: 'Error checking email' });
      }
};
exports.signInUser = async function(req, res) {
    const { Email } = req.body;
    try {
      const user = await User.findOne({ Email });
      if (!user) {
        return res.status(404).json({ 
          message: "We couldn't find an account with that email address. Please check your email or sign up for a new account." 
        });
      }
  
      // สร้าง JWT token
      const token = jwt.sign(
        { id: user._id, email: user.Email },
        JWT_SECRET,
        { expiresIn: '2h' } // หรือจะใช้ '7d'
      )
  
      res.status(200).json({ id: user._id, token });
    } catch (error) {
      res.status(500).json({ 
        message: "Something went wrong. Please try again later.",
        error 
      });
    }
  };


exports.readAUser = async function(req, res){
    //console.log(req.params.userId)
    try{
        console.log(req.params.userId)
        let user = await User.findById(req.params.userId)
        res.status(200).json(user);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.deleteAUser = async function(req, res){
    console.log(req.params.userId)
    try{
         let user = await User.findByIdAndDelete(req.params.userId)
        const response = {
            message: "Delete user id: "+ req.params.userId +" successfully",
            id: user._id
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.updateAUser = async function(req, res){
    var newUser = {}
    newUser = req.body

    try{
        let user = await User.findByIdAndUpdate(req.params.userId, newUser, {new: true})
        res.status(200).json(user);
    } catch (error){
        res.status(500).json(error)
    }
}

exports.calculateBMR = function(req, res) {
    const { Gender, Weight, Height, Age, Activity, bodyFat, formula, Goal} = req.body;
    let w = Number(Weight);
    let h = Number(Height);
    let a = Number(Age);
    let f = Number(bodyFat);
    let bmr;
    let tdee;
    let calories_per_day;
    let protein, carbs, fat;

    // Mifflin-St Jeor Equation
    if (formula === 'Mifflin-St Jeor') {
        if (Gender === 'Male') {
            bmr = 10 * w + 6.25 * h - 5 * a + 5; 
        } else {
            bmr = 10 * w + 6.25 * h - 5 * a - 161; 
        }
    }
    // Revised Harris-Benedict Equation
    else if (formula === 'Revised Harris-Benedict') {
        if (Gender === 'Male') {
            bmr = 66.5 + (13.75 * w) + (5.003 * h) - (6.75 * a);
        } else {
            bmr = 66.5 + (9.563 * w) + (1.850 * h) - (4.676 * a);
        }
    }
    // Katch-McArdle Formula (only for lean body mass calculation)
    else if (formula === 'Katch-McArdle') {
        if (f && f > 0) {
            const leanBodyMass = w * (1 - (f / 100)); 
            bmr = 370 + (21.6 * leanBodyMass);
        } else {
            return res.status(400).json({ message: "Fat percentage is required for Katch-McArdle formula" });
        }
    } else {
        return res.status(400).json({ message: "Invalid formula selected" });
    }

    
    if (Activity === 'Sedentary') {
        tdee = bmr * 1.2; 
    }
    else if (Activity === 'Light') {
        tdee = bmr * 1.375; 
    } else if (Activity === 'Moderate') {
        tdee = bmr * 1.55; 
    } else if (Activity === 'Very-Active') {
        tdee = bmr * 1.725; 
    } else if (Activity === 'Extra-Active') {
        tdee = bmr * 1.9; 
    } else {
        return res.status(400).json({ message: "Invalid activity level selected" });
    }
    if(Goal === 'maintain-weight') {
        calories_per_day = tdee; 
    } else if(Goal === 'lose-fat') {
        calories_per_day = tdee - (tdee * 0.2);
        if (calories_per_day < bmr){
            calories_per_day = bmr * 1.07; // Ensure not to go below BMR
        } 
    } else if(Goal === 'gain-muscle') {
        calories_per_day = tdee + 200; 
    } else {
        return res.status(400).json({ message: "Invalid goal selected" });
    }
    bmr = Math.round(bmr);
    tdee = Math.round(tdee);
    calories_per_day = Math.round(calories_per_day);
    protein = Math.round(w * 2.2);
    fat = Math.round(calories_per_day * 0.3 / 9);
    carbs = Math.round((calories_per_day - (protein * 4) - (fat * 9)) / 4);
    // Return the BMR result
    res.status(200).json({ 
        bmr: bmr, 
        tdee: tdee, 
        calories_per_day: calories_per_day,
        protein: protein,
        carbs: carbs,
        fat: fat
     });
}