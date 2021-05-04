const loginValidate = require('../validators/loginValidator')
const {resourceError,serverError} = require('../utils/error')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const login = (req,res)=>{
    let {name,email,password} = req.body
    let validate = loginValidate({name,email,password})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        if(!user){
            return resourceError(res,'User does not exist.Please Registered first')
        }
        else{
            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    return serverError(res,err)
                }
                if(!result){
                    return resourceError(res,'Password Doesn\'t match')
                }
                else{
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    },'SECRET',{expiresIn: '1h'})
                    res.status(200).json({
                        message: "Log in Succesfull",
                        token,
                        user
                    })
                }
            });
        }
    })
    
}
module.exports = login;