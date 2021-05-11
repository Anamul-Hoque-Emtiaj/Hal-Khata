const mongoose = require('mongoose')
const { Schema } = mongoose;

const transactionSchema = new Schema({
    amount:{
        type: Number,
        require: true
    },
    type:{
        type: String,
        require: true
    },
    note:{
        require: true,
        type: String,
        trim: true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})
const Transaction =mongoose.model('Transaction', transactionSchema);
module.exports=Transaction