const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')

const getAllTransactions = (req,res) =>{
   Transaction.find((err,transactions)=>{
       if(err){
           return serverError(res,err)
       }
       if(transactions.length==0){
        return res.status(500).json({
            message: "No transaction found"
        })
    }
    res.status(201).json(transactions)
   })
}

module.exports = getAllTransactions;