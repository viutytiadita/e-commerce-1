const mongoose = require('mongoose')

let Schema = mongoose.Schema
const transactionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    products: [
        {
            id: {type: Schema.Types.ObjectId, ref: 'Product'},
            count: Number
        }
    ],
    total: {
        type: Number
    },
    status: {
        type: String,
        default: "waiting"
    }
}, { timestamps: true })


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction