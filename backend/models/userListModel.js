'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    firstName: {
        type: String,
        Required: 'Please enter'
    },
    lastName: {
        type: String,
        Required: 'Please enter'
    },
    //missed left last_name
    email: {
        type: String,
        Required: 'Please enter'
    },
    createdDate:{
        type: Date,
        default :Date.now

    },
})

module.exports = mongoose.model('Users', UserSchema)
//ต้องตั้งข้อมูลให้ตรงกับข้อมูลในฐานข้อมูล
//ต้องตั้งชื่อฐานข้อมูลให้ตรงกับชื่อฐานข้อมูลที่เราสร้างไว้