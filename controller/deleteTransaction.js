const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

const remove = (req,res) =>{
    let transactionId = req.params.id
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
            Transaction.findByIdAndDelete(transactionId,(err)=>{
                if(err){
                    return serverError(res,err)
                }
                if(transaction.type=='income'){
                    updatedUser.balance=updatedUser.balance-transaction.amount
                    updatedUser.income=updatedUser.income-transaction.amount
                }
                else if(transaction.type=='expense'){
                    updatedUser.balance=updatedUser.balance+transaction.amount
                    updatedUser.expense=updatedUser.expense-transaction.amount
                }
                updatedUser.transactions=updatedUser.transactions.filter(element=> element!==transaction._id)
                User.findByIdAndUpdate(transaction.author,{$set:updatedUser},{new:true})
                .then(()=>{
                    res.status(201).json({
                        message:"Deleted Successfully",
                        user: updatedUser,
                        transaction
                    })
                })
                .catch(err=>{
                    serverError(res,err)
                })
            })
        })
    })
}
module.exports = remove;