'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

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
    },
    ImageLink:{
        type: String,
        Required: 'Please enter'
    }}, 
    {
    versionKey: false // 👈 ปิด __v
})

module.exports = mongoose.model('Meals', MealsSchema, 'Meals')
//ต้องตั้งข้อมูลให้ตรงกับข้อมูลในฐานข้อมูล
//ต้องตั้งชื่อฐานข้อมูลให้ตรงกับชื่อฐานข้อมูลที่เราสร้างไว้