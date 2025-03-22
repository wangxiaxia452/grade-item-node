const express = require('express')
const qs = require('qs');
const router = express.Router()

const gradesModel = require('../model/gradesModel')
const stuInfoModel = require('../model/stuInfoModel')


router.get('/', async (req, res) => {
    const {classChoose} = qs.parse(req.query)
    let gradeList = await gradesModel.find({stuGrade: new RegExp(classChoose)})
    let studentList = await stuInfoModel.find({stuGrade: new RegExp(classChoose)})
    const result = []
    studentList.forEach(item => {
        let obj = {}
        obj.stuID = item.stuID,
        obj.stuName= item.stuName
        obj.stuGender = item.stuGender
        obj.stuGrade = item.stuGrade
        gradeList.forEach(e => {
            if(e.stuID === item.stuID){
                obj.chinese = e.chinese?e.chinese:0
                obj.math = e.math?e.math:0
                obj.english = e.english?e.english:0
            // obj = Object.assign({},item, e)
            }
            
        })
        result.push(obj)
    })
    res.json({
      code:'0000',
      msg:'请求成功',
      data: result
    })
})

router.post('/',async (req,res) => {
    console.log(req.body)
    const {stuID, chinese, math, english} = req.body
    const grades = {
      chinese, 
      math, 
      english
    }
    let isListExist = await gradesModel.find({stuID})
    let resp = null
    if(isListExist.length === 0){
      resp = gradesModel.create(req.body)
      
    }else{
      resp = gradesModel.updateOne({stuID},{...grades})
    }

    resp.then(val => {
      res.json({
        code:'0000',
        msg: '请求成功',
        data: val
      })
    },err => {
      res.json({
        code:'1111',
        msg: '请求失败',
        err: err
      })
    })
})

module.exports = router;