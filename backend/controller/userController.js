'use strict'
const mongoose = require('mongoose');
const User = require('../models/userModel');

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

exports.readAUser = async function(req, res){
    //console.log(req.params.userId)
    try{
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
    //console.log(req.params.userId)
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
    const { Gender, Weight, Height, Age, Activity, Fat_Percent, formula, Goal} = req.body;
    let w = Number(Weight);
    let h = Number(Height);
    let a = Number(Age);
    let f = Number(Fat_Percent);
    let bmr;
    let tdee;
    let calories_per_day;

    // Mifflin-St Jeor Equation
    if (formula === 'mifflin') {
        if (Gender === 'Male') {
            bmr = 10 * w + 6.25 * h - 5 * a + 5; 
        } else {
            bmr = 10 * w + 6.25 * h - 5 * a - 161; 
        }
    }
    // Harris-Benedict Equation
    else if (formula === 'harris') {
        if (Gender === 'Male') {
            bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
        } else {
            bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
        }
    }
    // Revised Harris-Benedict Equation
    else if (formula === 'revised_harris') {
        if (Gender === 'Male') {
            bmr = 66.5 + (13.75 * w) + (5.003 * h) - (6.75 * a);
        } else {
            bmr = 66.5 + (9.563 * w) + (1.850 * h) - (4.676 * a);
        }
    }
    // Katch-McArdle Formula (only for lean body mass calculation)
    else if (formula === 'katch_mcardle') {
        if (f && f > 0) {
            const leanBodyMass = w * (1 - (f / 100)); 
            bmr = 370 + (21.6 * leanBodyMass);
        } else {
            return res.status(400).json({ message: "Fat percentage is required for Katch-McArdle formula" });
        }
    } else {
        return res.status(400).json({ message: "Invalid formula selected" });
    }

    
    if (Activity === 'sedentary') {
        tdee = bmr * 1.2; 
    }
    else if (Activity === 'light') {
        tdee = bmr * 1.375; 
    } else if (Activity === 'moderate') {
        tdee = bmr * 1.55; 
    } else if (Activity === 'very-active') {
        tdee = bmr * 1.725; 
    } else if (Activity === 'super-active') {
        tdee = bmr * 1.9; 
    } else {
        return res.status(400).json({ message: "Invalid activity level selected" });
    }
    if(Goal === 'lose-weight') {
        calories_per_day = tdee - 500; 
    }
    else if(Goal === 'gain-weight') {
        calories_per_day = tdee + 500; 
    } else if(Goal === 'maintain-weight') {
        calories_per_day = tdee; 
    } else {
        return res.status(400).json({ message: "Invalid goal selected" });
    }
    bmr = Math.round(bmr);
    tdee = Math.round(tdee);
    calories_per_day = Math.round(calories_per_day);
    // Return the BMR result
    res.status(200).json({ bmr: bmr, tdee: tdee, calories_per_day: calories_per_day });
}