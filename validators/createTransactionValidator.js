const error = require("../utils/error")

const validator = user =>{
    errors={}
    temp=true
    if(!user.amount){
        errors.amount="Please provide transaction amount",
        temp = false
    }
    if(!user.type){
        errors.type="Please select type of transaction",
        temp = false
    }
    if(!user.note){
        errors.note="Please provide transaction short note",
        temp = false
    }
    return{
        errors,
        isValid:temp
    }
}
module.exports = validator;