const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema({
    stuID: {
        type: String,
        required: true,
        unique: true 
    },
    chinese:{
        type: Number,
        // require: true
    },
    math: {
        type: Number
    },
    english: {
        type: Number
    }
})

let gradesModel = mongoose.model('grade', gradesSchema);

module.exports = gradesModel
