const registerValidate = require('../validators/registerValidator')
const {serverError} = require('../utils/error')
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const register = (req,res)=>{
    let {name,email,password,confirmPassword} = req.body
    let validate = registerValidate({name,email,password,confirmPassword})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    User.findOne({email},(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        if(user){
            return res.status(500).json({
                email: "User already exist"
            })
        }
    })
    bcrypt.hash(password, 10, (err, hash)=> {
        if(err){
            return serverError(res,err)
        }
        else{
            const user = new User({
                name,
                email,
                password: hash,
                income: 0,
                expense: 0,
                balance: 0,
                transactions:[]
            })
            user.save(err=>{
                if(err){
                   return serverError(res,err)
                }
                else{
                    res.status(201).json({
                        message: "Registration Succesfull"
                    })
                }
            })
            
        }
    });
}
module.exports = register;