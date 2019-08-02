const mongoose = require('mongoose')

let Schema = mongoose.Schema
const cartSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    product_id:{
        type: Schema.Types.ObjectId, ref: 'Product', required: true
    },
    count: {
        type: Number,
        default: 1
    }
},{timestamps : true})


const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart