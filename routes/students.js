var express = require('express');
const qs = require('qs');
var router = express.Router();

const stuInfoModel = require('../model/stuInfoModel')

router.get('/', function(req,res){
  const {classChoose} = qs.parse(req.query)
  stuInfoModel.find({stuID: new RegExp(classChoose)}).then(val => {
    res.json({
      code:'0000',
      msg:'请求成功',
      data: val
    })
  })
})
/* GET users listing. */
router.post('/', function(req, res) {
   stuInfoModel.create(req.body).then( val => {
      res.json({
        code:'0000',
        msg: '请求成功',
        data: val
      })
   }, err => {
    res.json({
      code:'1111',
      msg: '请求失败',
      err: err
    })
   }) 

});

router.post('/edit', function(req, res) {
  const {stuID, stuName, stuGender} = req.body
  stuInfoModel.updateOne({stuID},{stuName,stuGender}).then( val => {
     res.json({
       code:'0000',
       msg: '编辑成功',
       data: val
     })
  }, err => {
   res.json({
     code:'1111',
     msg: '编辑失败',
     err: err
   })
  }) 

});

router.post('/del', function(req, res) {
  const {stuID} = req.body
  stuInfoModel.deleteOne({stuID}).then( val => {
     res.json({
       code:'0000',
       msg: '删除成功',
       data: val
     })
  }, err => {
   res.json({
     code:'1111',
     msg: '删除失败',
     err: err
   })
  }) 

});

module.exports = router;
