const Transaction = require('../models/transaction')
const Cart = require('../models/cart')

class TransactionController {
    static create(req,res,next){
        console.log(req.body);
        
        let arr = []
        req.body.carts.forEach(cart => {
            arr.push({
                id : cart.product_id._id,
                count: cart.count
            })
        });
        
        Transaction.create({
            user_id: req.decoded.id,
            total : req.body.total,
        })
        .then((data) => {
            res.status(201).json(data)
            console.log('ini array');
            console.log(arr);
            return Transaction.findByIdAndUpdate({_id: data._id},{
                // $push: {
                    products: arr
                // }
            },{new: true})
        })
        .then((data)=>{
            console.log(data);
            
            return Cart.deleteMany({})
        })
        .then((data)=>{
            console.log('berhasil');
        })
        .catch(next)
    }

    static findAll(req,res,next) {
        Transaction.find().populate('products.id').sort({createdAt: -1})
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findUsers(req,res,next) {
        Transaction.find({user_id : req.decoded.id}).populate('products.id').sort({createdAt: -1})
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static changeStatus(req,res,next){
        Transaction.findByIdAndUpdate({_id: req.params.id},{
            status: req.body.status
        },{new:true})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TransactionController