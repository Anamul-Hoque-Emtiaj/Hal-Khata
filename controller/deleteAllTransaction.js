const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('./userInfo')

const deleteAllTransaction = (req,res)=>{
    let userId=req.params.id
    Transaction.find((err,transactions)=>{
        if(err){
            return serverError(res,err)
        }
        transactions.forEach(transaction=>{
            if(transaction.author===userId){
                Transaction.findByIdAndDelete(transaction._id,err=>{
                    if(err){
                        return serverError(res,err)
                    }
                })
            }
        })
    })
    let updatedUser = User(userId,res)
    res.status(201).json({
        message:"Deleted All transactions Successfully",
        user: updatedUser
    })
}
module.exports = deleteAllTransaction;