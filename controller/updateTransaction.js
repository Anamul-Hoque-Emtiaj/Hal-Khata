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
        let prevAmount = transaction.amount
        let prevType = transaction.type
        
        let updatedTransaction={...transaction._doc}
        updatedTransaction.amount=amount
        updatedTransaction.type=type
        updatedTransaction.note=note
        Transaction.findByIdAndUpdate(transactionId,{$set:updatedTransaction},{new:true})
            .then((newTransaction)=>{
                User.findById(newTransaction.author,(err,user)=>{
                    if(err){
                        return serverError(res,err)
                    }
                    let updatedUser={...user._doc}
                    let {balance,income,expense} = user
                        if(prevType=='income'){
                        
                            if(newTransaction.type=='income'){
                                balance=balance+newTransaction.amount-prevAmount
                                income=income+newTransaction.amount-prevAmount
                            }
                            else if(newTransaction.type=='expense'){
                                balance=balance-newTransaction.amount-prevAmount
                                expense=expense+newTransaction.amount
                                income=income-prevAmount
                            }
                        }
                        else if(prevType=='expense'){
                            if(newTransaction.type=='income'){
                                balance=balance+newTransaction.amount+prevAmount
                                income=income+newTransaction.amount
                                expense= expense - prevAmount
                            }
                            else if(newTransaction.type=='expense'){
                                balance=balance-newTransaction.amount+prevAmount
                                expense=expense+newTransaction.amount-prevAmount
                            }
                        }
                        updatedUser.balance = balance
                        updatedUser.income = income
                        updatedUser.expense = expense
                        User.findByIdAndUpdate(transaction.author,{$set:updatedUser},{new:true})
                        .then(newUser=>{
                            res.status(201).json({
                                message: "Update successful",
                                transaction: newTransaction,
                                user: newUser
                            })
                        })
                        .catch(err=>{
                            serverError(res,err)
                    })
                })
            
        })
        .catch(err=>{
            serverError(res,err)
        })
    })
}
module.exports = update;

 





            