module.exports = function(success, error){
    const mongoose = require('mongoose')
    mongoose.connect(`mongodb://127.0.0.1:27017/gradeitem`)

    mongoose.connection.once('open',() => {
        success()
    })

    mongoose.connection.on('error',() => {
        error()
    })

    mongoose.connection.on('close',() => {
        console.log('连接关闭');
    })
}