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
    Fat_Percent:{
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
//ต้องตั้งข้อมูลให้ตรงกับข้อมูลในฐานข้อมูล
//ต้องตั้งชื่อฐานข้อมูลให้ตรงกับชื่อฐานข้อมูลที่เราสร้างไว้