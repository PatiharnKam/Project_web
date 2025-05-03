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

exports.createAMeal = async function(req, res){
    var newMeal = new Meal(req.body)
    try{
        let meal = await newMeal.save()
        res.status(200).json(meal);
    } catch (error){
        res.status(500).json(error)
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