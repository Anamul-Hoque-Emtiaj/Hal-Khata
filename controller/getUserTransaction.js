const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')

const getUserTransactions = (req,res) =>{
    let userId = req.params.id
   Transaction.find((err,transactions)=>{
       if(err){
           return serverError(res,err)
       }
       if(transactions.length==0){
        return res.status(500).json({
            message: "No transaction found"
        })
    }
       res.status(202).json(transactions.filter(transaction=>{
           return userId==transaction.author
       }))
   })
}

module.exports = getUserTransactions;