const mongoose = require('mongoose')

let stuInfoSchema = new mongoose.Schema({
     stuID: {
        type: String,
        required:true,
        unique: true
     },
     stuName: {
         type: String,
         required:true
     },
     stuGender: {
         type: String,
         required: true
     },
     stuGrade: {
        type: String,
        required: true
     }

})

let stuInfoModel = mongoose.model('student',stuInfoSchema)

module.exports = stuInfoModel