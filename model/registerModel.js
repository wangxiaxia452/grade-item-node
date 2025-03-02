const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    userNo: {
        type: Number,
        required: true,
        unique: true 
    },
    email:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

let registerModel = mongoose.model('register', registerSchema);

module.exports = registerModel