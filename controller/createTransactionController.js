const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const validator = require('../validators/createTransactionValidator')
const User = require('../models/userModel')

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
        User.findById(author,(err,user)=>{
            if(err){
                return serverError(res,err)
            }
            let updateUser = {...user._doc}
            if(trans.type=='income'){
                updateUser.balance= updateUser.balance+trans.amount
                updateUser.income=updateUser.income+trans.amount
            }else if(trans.type=='expense'){
                updateUser.balance= updateUser.balance-trans.amount
                updateUser.expense=updateUser.expense+trans.amount
            }
            updateUser.transactions.unshift(trans._id)
            User.findByIdAndUpdate(author,{$set:updateUser},{new:true})
            .then(()=>{
                res.status(201).json({
                    message: "Transaction created successfully",
                    transaction: trans,
                    user: updateUser
                })
            }).catch(err=>{
                serverError(res,err)
            })
        })
    }).catch(err=>{
        serverError(res,err)
    })
}
module.exports = create;