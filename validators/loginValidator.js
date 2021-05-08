const validator = require('validator')
const loginValidate = user =>{
    const errors={};
    var temp = true
    if(!user.email){
        errors.email='Please provide your email'
        temp=false
    }
    else if(!validator.isEmail(user.email)){
        errors.email='Your email is not valid'
        temp=false
    }
    if(!user.password){
        errors.password='Please provide a password'
        temp=false
    }
   
    return{
        errors,
        isValid: temp
    }
}
module.exports = loginValidate;