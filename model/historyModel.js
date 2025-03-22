const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    preList: {
        type: Array,
        required: true
    }
})

let historyModel = mongoose.model('history', historySchema);

module.exports = historyModel
