const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        require: true,
        type: String,
        trim: true
    },
    email:{
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String,
        min: 6
    },
    income:{
        type: Number,
        default: 0
    },
    expense:{
        type: Number,
        default: 0
    },
    balance:{
        type: Number,
        default: 0
    },
    transactions:{
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }
})

const User=mongoose.model('User', userSchema);
module.exports=User