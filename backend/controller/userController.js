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
    const { gender, weight, height, age, fatPercent, formula } = req.body;

    let bmr;

    // Mifflin-St Jeor Equation
    if (formula === 'mifflin') {
        if (gender === 'Male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male formula
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161; // Female formula
        }
    }
    // Harris-Benedict Equation
    else if (formula === 'harris') {
        if (gender === 'Male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }
    // Revised Harris-Benedict Equation
    else if (formula === 'revised_harris') {
        if (gender === 'Male') {
            bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
        } else {
            bmr = 66.5 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }
    }
    // Katch-McArdle Formula (only for lean body mass calculation)
    else if (formula === 'katch_mcardle') {
        if (fatPercent && fatPercent > 0) {
            const leanBodyMass = weight * (1 - (fatPercent / 100)); // Calculate lean body mass
            bmr = 370 + (21.6 * leanBodyMass); // Katch-McArdle formula
        } else {
            return res.status(400).json({ message: "Fat percentage is required for Katch-McArdle formula" });
        }
    } else {
        return res.status(400).json({ message: "Invalid formula selected" });
    }

    // Return the BMR result
    res.status(200).json({ bmr: bmr });
}