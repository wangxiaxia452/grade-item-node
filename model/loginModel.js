const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        require: true
    },
})

let loginModel = mongoose.model('login', loginSchema);

module.exports = loginModel