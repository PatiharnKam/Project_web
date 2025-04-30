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

    mealName: {
        type: String,
        Required: 'Please enter'
    },
    mealType: {
        type: String,
        Required: 'Please enter'
    },
    calories: {
        type: Number,
        Required: 'Please enter'
    },
    createdDate:{
        type: Date,
        default :Date.now
    },
})

module.exports = mongoose.model('Meals', MealsSchema, 'Meals')
module.exports = mongoose.model('UserInfo', UserSchema, 'UserInfo')
//ต้องตั้งข้อมูลให้ตรงกับข้อมูลในฐานข้อมูล
//ต้องตั้งชื่อฐานข้อมูลให้ตรงกับชื่อฐานข้อมูลที่เราสร้างไว้