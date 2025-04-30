'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    Username: {
        type: String,
        Required: 'Please enter'
    },
    Gender: {
        type: String,
        Required: 'Please enter'
    },
    //missed left last_name
    Age: {
        type: Number,
        Required: 'Please enter'
    },
    Weight:{
        type: Number,
        Required: 'Please enter'
    },
    Height: {
        type: Number,
        Required: 'Please enter'
    },
    //missed left last_name
    Activity: {
        type: String,
        Required: 'Please enter'
    },
    Fat_percent:{
        type: Number,
        Required: 'Please enter'
    },
})

var MealsSchema = new Schema({

    MealName: {
        type: String,
        Required: 'Please enter'
    },
    MealType: {
        type: String,
        Required: 'Please enter'
    },
    Protein: {
        type: Number,
        Required: 'Please enter'
    },
    Carbohydrate: {
        type: Number,
        Required: 'Please enter'
    },
    Fat: {
        type: Number,
        Required: 'Please enter'
    },
    Calories: {
        type: Number,
        Required: 'Please enter'
    },
    Ingredient:{
        type: Object,
        Required: 'Please enter'
    },
    Instructions:{
        type: Array,
        Required: 'Please enter'
    }
})

module.exports = mongoose.model('Meals', MealsSchema, 'Meals')
module.exports = mongoose.model('UserInfo', UserSchema, 'UserInfo')
//ต้องตั้งข้อมูลให้ตรงกับข้อมูลในฐานข้อมูล
//ต้องตั้งชื่อฐานข้อมูลให้ตรงกับชื่อฐานข้อมูลที่เราสร้างไว้