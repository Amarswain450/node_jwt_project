const mongoose = require('mongoose');
const validator = require("validator");


const empSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Invalid email address."],
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
},{timestamps: true});


const EmpModel = new mongoose.model('Employee', empSchema);
module.exports = EmpModel;