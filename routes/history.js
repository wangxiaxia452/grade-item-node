// const express = require('express')
// const router = express.Router()
const express = require('express')
const router = express.Router()

const historyList = require('../json/history')

router.get('/', (req, res) => {
    
   const preList = Object.values(historyList)[0]
   if(preList && preList.length){
    res.json({
        code:'0000',
        msg: '数据请求成功',
        data: preList
       })
   }else {
       res.json({
        code:'0000',
        msg: '数据请求失败',
        data: []
       })
   }

})

module.exports = router;