const {serverError} = require('../utils/error')
const User = require('../models/userModel')

const getSingleUser = (req,res)=>{
    let userId = req.params.id
    User.findById(userId,(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        if(!user){
            return res.status(500).json({
                message:"No user found"
            })
        }
        res.status(201).json(user)
    })
}
module.exports = getSingleUser;