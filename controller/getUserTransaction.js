const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

const getUserTransactions = (req,res) =>{
    let userId = req.params.id
    User.findById(userId,(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        Transaction.find((err,transactions)=>{
            if(err){
                return serverError(res,err)
            }
            let updatedTransactions=[]
            transactions.map(transaction=>{
                if(transaction.author==userId){
                    updatedTransactions.unshift(transaction)
                }
            })
            res.status(202).json({
               transactions: updatedTransactions,
               user
            })
        })
    })
}
module.exports = getUserTransactions;