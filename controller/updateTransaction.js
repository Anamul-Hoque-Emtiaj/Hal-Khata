const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const validator = require('../validators/createTransactionValidator')
const User = require('../models/userModel')

const update=(req,res)=>{
    let transactionId = req.params.id
    let {amount,type,note,author}= req.body
    let validate = validator({amount,type,author,note})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    let updatedTransaction={amount,type,note,author}
    Transaction.findById(transactionId,(err,transaction)=>{
        if(err){
            return serverError(res,err)
        }
        if(!transaction){
            return res.status(500).json({
                message:"No transaction found"
            })
        }
        User.findById(transaction.author,(err,user)=>{
            if(err){
                return serverError(res,err)
            }
            let updatedUser={...user._doc}
            Transaction.findByIdAndUpdate(transactionId,{$set:updatedTransaction},{new:true})
            .then(()=>{
            if(transaction.type=='income'){
                updatedUser.balance=updatedUser.balance-transaction.amount
                updatedUser.income=updatedUser.income-transaction.amount
            }
            else if(transaction.type=='expense'){
                updatedUser.balance=updatedUser.balance+transaction.amount
                updatedUser.expense=updatedUser.expense-transaction.amount
            }
            if(type=='income'){
                updatedUser.balance=updatedUser.balance+amount
                updatedUser.income=updatedUser.income+amount
            }
            else if(type=='expense'){
                updatedUser.balance=updatedUser.balance-amount
                updatedUser.expense=updatedUser.expense+amount
            }
            User.findByIdAndUpdate(transaction.author,{$set:updatedUser},{new:true})
            .then(()=>{
                res.status(201).json({
                    message: "Update successful"
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