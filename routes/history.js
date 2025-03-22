// const express = require('express')
// const router = express.Router()
const express = require('express')
const router = express.Router()

const historyModel = require('../model/historyModel')

router.get('/', async (req, res) => {
    let list = await historyModel.find()
   const preList = list.length > 0? list[0].preList: []
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

router.post('/', async (req, res) => {
  const {preList} = req.body

  try {
    let isListExist = await historyModel.find()
    let resp = null
    if(isListExist.length === 0){
      resp = await historyModel.create({preList})
      
    }else{
      resp = await historyModel.updateMany({preList},{preList})
    }
      res.json({
        code:'0000',
        msg: '请求成功',
        data: resp
      })
  } catch (error) {
    res.json({
        code:'1111',
        msg: '请求失败',
        data: error
      })
  }
})

module.exports = router;