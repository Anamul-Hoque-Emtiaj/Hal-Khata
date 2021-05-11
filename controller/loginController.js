const loginValidate = require('../validators/loginValidator')
const {serverError} = require('../utils/error')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const login = (req,res)=>{
    let {email,password} = req.body
    let validate = loginValidate({email,password})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        if(!user){

            return res.status(500).json({
                email: 'User does not exist.Please Registered first'
            })
        }
        else{
            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    return serverError(res,err)
                }
                if(!result){

                    return res.status(500).json({
                        password: 'Password Doesn\'t match'
                    })
                }
                else{
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    },'SECRET',{expiresIn: '24h'})
                    res.status(200).json({
                        message: "Log in Succesfull",
                        token:`Bearer ${token}`
                    })
                }
            });
        }
    })
    
}
module.exports = login;