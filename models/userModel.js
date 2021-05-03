import mongoose from 'mongoose';
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
    },
    income: Number,
    expense: Number,
    amount: Number,
    transactions:{
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }
})

const user=mongoose.model('user', userSchema);
module.exports=user