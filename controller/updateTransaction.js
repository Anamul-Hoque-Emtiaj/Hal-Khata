const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const validator = require('../validators/createTransactionValidator')
const User = require('./userInfo')

const update=(req,res)=>{
    let transactionId = req.params.id
    let {amount,type,note}= req.body
    let validate = validator({amount,type,note})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    Transaction.findById(transactionId,(err,transaction)=>{
        if(err){
            return serverError(res,err)
        }
        let updatedTransaction={...transaction._doc}
        updatedTransaction.amount=amount
        updatedTransaction.type=type
        updatedTransaction.note=note
        Transaction.findByIdAndUpdate(transactionId,{$set:updatedTransaction},{new:true})
        .then(trans=>{
            let updatedUser = User(transaction.author,res)
            res.status(201).json({
                message:"Updated Successfully",
                user: updatedUser,
                transaction: trans
            })
        })
        .catch(err=>{
            serverError(res,err)
        })
    })
}
module.exports = update;