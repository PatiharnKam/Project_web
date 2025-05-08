'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    Email:{
        type: String,
        Required: 'Please enter'
    },
    Username: {
        type: String,
        Required: 'Please enter'
    },
    Gender: {
        type: String,
        Required: 'Please enter'
    },
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
    Activity: {
        type: String,
        Required: 'Please enter'
    },
    bodyFat:{
        type: Number,
        Required: 'Please enter'
    },
    Goal:{
        type: String,
        Required: 'Please enter'
    },
    BMR:{
        type: String,
        Required: 'Please enter'
    },
    TDEE:{
        type: String,
        Required: 'Please enter'
    },
    Calories_Perday:{
        type: String,
        Required: 'Please enter'
    }}, 
    {
    versionKey: false // 👈 ปิด __v
})

module.exports = mongoose.model('UserInfo', UserSchema, 'UserInfo')
//เลือก collection ที่จะใช้ใน MongoDB เป็น 'UserInfo'