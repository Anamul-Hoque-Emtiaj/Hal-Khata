const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('./userInfo')

const remove = (req,res) =>{
    let transactionId = req.params.id
    Transaction.findById(transactionId,(err,transaction)=>{
        if(err){
            return serverError(res,err)
        }
        Transaction.findByIdAndDelete(transactionId,err=>{
            if(err){
                return serverError(res,err)
            }
            let updatedUser = User(transaction.author,res)
            res.status(201).json({
                message:"Deleted Successfully",
                user: updatedUser,
                transaction
            })
        })
    })
    
}
module.exports = remove;