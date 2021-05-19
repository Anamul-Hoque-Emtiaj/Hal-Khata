const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('./userInfo')

const getUserTransactions = (req,res) =>{
    let userId = req.params.id
    Transaction.find((err,transactions)=>{
        if(err){
            return serverError(res,err)
        }
        let Transactions=[]
        transactions.forEach(transaction=>{
            if(transaction.author==userId){
                Transactions.unshift(transaction)
            }
        })
        let updatedUser = User(userId,res)
        res.status(202).json({
           transactions: Transactions,
           user: updatedUser
        })
    })
}
module.exports = getUserTransactions;