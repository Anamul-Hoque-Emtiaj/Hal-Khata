const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const {serverError} = require('../utils/error')

const userInfo = (id,res) =>{
    let Balance=0,Income=0,Expense=0
    let tran=[]
    Transaction.find((err,transactions)=>{
        if(err){
            return serverError(res,err)
        }
        transactions.forEach(transaction=>{
            if(transaction.author===id){
                tran.unshift(transaction._id)
                if(transaction.type==='income'){
                    Income=Income+transaction.amount
                    Balance=Balance+transaction.amount
                }
                else if(transaction.type==='expense'){
                    Expense=Expense+transaction.amount
                    Balance=Balance-transaction.amount
                }
            }
        })
    })
    User.findById(id,(err,user)=>{
        if(err){
            return serverError(res,err)
        }
        let updatedUser= {...user._doc}
        updatedUser.balance = Balance
        updatedUser.income = Income
        updatedUser.expense = Expense
        updatedUser.transactions = [...tran]
        User.findByIdAndUpdate(id,{$set:updatedUser},{new:true})
        .then(()=>{
            
        })
        .catch(err=>{
            serverError(res,err)
        })
    })
    return{
        Balance,Income,Expense
    }
}
module.exports = userInfo