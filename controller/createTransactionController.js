const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const validator = require('../validators/createTransactionValidator')
const User = require('./userInfo')

const create = (req,res) =>{
    let {amount,type,note,author} = req.body
    let validate = validator({amount,type,author,note})
    if(!validate.isValid){
        return res.status(500).json(validate.errors)
    }
    const transaction = new Transaction({
        amount,type,note,author
    })
    transaction.save()
    .then(trans=>{
        let updateUser= User(trans.author,res)
        res.status(201).json({
            message: "Transaction created successfully",
            transaction: trans,
            user: updateUser
        })
    }).catch(err=>{
        serverError(res,err)
    })
}
module.exports = create;