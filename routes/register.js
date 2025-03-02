const express = require('express');
const { stringify } = require('qs');
const qs = require('qs');
const router = express.Router();
const validator = require('validator')

const registerModel = require('../model/registerModel')

const validateInput = (data) => {
    let errors = {}
    if(validator.isEmpty(data.userNo)){
        errors.userNo = '账号不能为空'
    }

    if(!validator.isEmail(data.email)) {
       errors.email = '邮箱格式不正确'
    }

    if(validator.isEmpty(data.password)) {
        errors.password = '密码不能为空'
    }

    if(!validator.equals(data.password, data.passwordConfirm)){
        errors.passwordConfirm = '两次密码不相同'
    }

    return {
        isValid: JSON.stringify(errors) === '{}',
        errors
    }
}
router.post('/',(req, res) => {
    const {isValid, errors} = validateInput(req.body)
    if(isValid) {
        const {userNo, email, password} = req.body
        registerModel.create({
            userNo, 
            email, 
            password
        }).then(val => {
            res.json({
                code: '0000',
                msg: '注册成功'
            })
        }).catch(err => {
            const { errors } = err
            if(err.name === 'ValidationError'){
                if(Object.keys(errors)[0] === 'userNo'){
                    res.json({
                        cade:'1111',
                        msg: '注册失败',
                        errs: {
                            userNo: '账号必须为数字格式'
                        }
                    })
                }
            }else if(err.code === 11000){
                res.json({
                    cade:'1111',
                    msg:'注册失败',
                    errs: {
                        userNo: '该账户重复注册'
                    }
                })
            }else {
                res.json({
                    cade:'1111',
                    msg: '注册失败'
                })
            }
        })

    }else{
        res.json({
            code:'1111',
            msg:'注册失败',
            errs: errors
        })
    }

})

module.exports = router;