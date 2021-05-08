const validator = require('validator')
const registerValidate = user =>{
    const errors={};
    var temp = true
    if(!user.name){
        errors.name='Please provide your name'
        temp=false
    }
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
    else if(user.password.length <6){
        errors.password='Please provide a password greter than or equal 6'
        temp=false
    }
    if(!user.confirmPassword){
        errors.confirmPassword='Please confirm your password'
        temp=false
    }
    else if(user.password!=user.confirmPassword){
        errors.confirmPassword='Password doesn\'t match'
        temp=false
    }
    return{
        errors,
        isValid: temp
    }
}
module.exports = registerValidate;