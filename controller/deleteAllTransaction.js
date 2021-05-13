const {serverError} = require('../utils/error')
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

const deleteAllTransaction = (req,res)=>{
    let userId=req.params.id
    User.findById(userId,(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        if(!user){
            return res.status(500).json({
                message: "No user found"
            })
        }
        let updatedUser = {...user._doc}
        if(updatedUser.transactions.length==0){
            return res.status(500).json({
                message: "No transaction Found"
            })
        }
        updatedUser.transactions.forEach(element => {
            Transaction.findByIdAndDelete(element,err=>{
                if(err){
                    return serverError(res,err)
                }
            })
        });
        updatedUser.balance=0
        updatedUser.income=0
        updatedUser.expense=0
        updatedUser.transactions.splice(0, updatedUser.transactions.length)
        User.findByIdAndUpdate(updatedUser._id,{$set:updatedUser},{new:true})
        .then(()=>{
            res.status(202).json({
                message: "Deleted all Transactions Successfully",
                user: updatedUser
            })
        }).catch(err=>{
            serverError(res,err)
        })
    })
}
module.exports = deleteAllTransaction;