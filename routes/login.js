const express = require('express');
const { stringify } = require('qs');
const qs = require('qs');
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require('../secretKey')

const registerModel = require('../model/registerModel')

router.post('/',(req, res) => {
    const {
        userNo,
        password
    } = req.body
    registerModel.find({userNo}).then(val => {
        if(val && val.length > 0) {
            if(password === val[0].password) {
                const token = jwt.sign({
                   uid:val[0]._id,
                   userNo: val[0].userNo
                },key.secretKey)
                res.json({
                    code: '0000',
                    msg: '登录成功',
                    token,
                    userNumber: val[0].userNo
                })
            }else {
                res.json({
                    code: '1111',
                    msg: '登录失败',
                    errs: {
                        password: '密码错误,请重新输入'
                    }
                })
            }

        }else {
            res.json({
                code: '1111',
                msg: '登录失败',
                errs: {
                    userNo: '账号不存在'
                }
            })
        }
    }).catch(err => {
        res.json({
            code: '1111',
            msg: '登录失败'
        })
    })
    
})

module.exports = router;