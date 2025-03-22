const express = require('express')
const router = express.Router()

const stuInfoModel = require('../model/stuInfoModel')
const gradesModel = require('../model/gradesModel')

router.post('/',function(req,res) {

    const { list } = req.body
    const params = list[0]
    const context = list.splice(1)
    const p = {
        '学号': 'stuID',
        '姓名': 'stuName',
        '性别': 'stuGender',
        '班级': 'stuGrade',
        '语文': 'chinese',
        '数学': 'math',
        '英语': 'english'
    }
    const excelList = context.map(e => {
        let obj = {}
        params.map((e1, i1) => {
            if(p[e1] === 'stuID'){
                obj[p[e1]] = e[i1]+''
            }else {
                obj[p[e1]] = e[i1]
            } 
        })
        return obj
    })
    stuInfoModel.find().then(val => {
       const existList = excelList.filter(item => val.some(e => e.stuID === item.stuID))
       const unexistList = excelList.filter(item => existList.every(e => item.stuID !== e.stuID))
       existList.map(async e => {
        await stuInfoModel.updateOne({stuID: e['stuID']}, e)
        await gradesModel.updateOne({stuID: e['stuID']}, e)
       })
       return Promise.all([stuInfoModel.insertMany(unexistList),gradesModel.insertMany(unexistList)])
    }).then(val => {
        res.json({
            code:'0000',
            msg: '上传更新成功'
        })
    }).catch(err => {
        res.json({
            code: '1111',
            msg: '上传更新失败'
        })
    })

})

module.exports = router;