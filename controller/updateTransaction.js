const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const validator = require('../validators/createTransactionValidator')
const User = require('../models/userModel')

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
        if(!transaction){
            return res.status(500).json({
                message:"No transaction found"
            })
        }
        let updatedTransaction={...transaction._doc}
        updatedTransaction.amount=amount
        updatedTransaction.type=type
        updatedTransaction.note=note
        User.findById(transaction.author,(err,user)=>{
            if(err){
                return serverError(res,err)
            }
            let updatedUser={...user._doc}
            Transaction.findByIdAndUpdate(transactionId,{$set:updatedTransaction},{new:true})
            .then(()=>{
            if(transaction.type=='income'){
               
                if(updatedTransaction.type=='income'){
                    updatedUser.balance=user.balance+updatedTransaction.amount-transaction.amount
                    updatedUser.income=user.income+updatedTransaction.amount-transaction.amount
                }
                else if(updatedTransaction.type=='expense'){
                    updatedUser.balance=user.balance-updatedTransaction.amount-transaction.amount
                    updatedUser.expense=user.expense+updatedTransaction.amount
                }
            }
            else if(transaction.type=='expense'){
                if(updatedTransaction.type=='income'){
                    updatedUser.balance=user.balance+updatedTransaction.amount+transaction.amount
                    updatedUser.income=user.income+updatedTransaction.amount
                }
                else if(updatedTransaction.type=='expense'){
                    updatedUser.balance=user.balance-updatedTransaction.amount+transaction.amount
                    updatedUser.expense=user.expense+updatedTransaction.amount-transaction.amount
                }
            }
            User.findByIdAndUpdate(transaction.author,{$set:updatedUser},{new:true})
            .then(()=>{
                res.status(201).json({
                    message: "Update successful",
                    transaction: updatedTransaction,
                    user: updatedUser
                })
            }).catch(err=>{
                serverError(res,err)
            })
        })
        .catch(err=>{
            serverError(res,err)
        })
            })
    })
}
module.exports = update;