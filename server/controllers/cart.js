const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
    static fetch(req, res, next) {
        Cart.find({user_id : req.decoded.id}).populate('product_id')
        .then((data)=> {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static fetchOne(req,res,next){
        Cart.findOne({product_id: req.params.productid})
        .then((data)=> {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        Cart.create({
            user_id: req.decoded.id,
            product_id: req.body.product_id
        })
            .then(function (newdata) {
                res.status(201).json(newdata)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Cart.deleteOne({ _id: req.params.cartid })
        .then((data)=> {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateCount(req,res,next){
        console.log(req.body);
        
        Cart.findByIdAndUpdate({_id: req.params.cartid},{
            count : req.body.count+1
        })
        .then((data)=> {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteAll(req,res,next){
        Cart.deleteMany({_id: req.params.cartid})
        .then((data)=> {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = CartController