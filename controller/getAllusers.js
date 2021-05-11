const {serverError} = require('../utils/error')
const User = require('../models/userModel')

const getAllUsers=(req,res)=>{
    User.find((err,users)=>{
        if(err){
            return serverError(res,err)
        }
        if(users.length==0){
            return res.status(500).json({
                message: "No user found"
            })
        }
        res.status(201).json(users)
    })
}

module.exports = getAllUsers;