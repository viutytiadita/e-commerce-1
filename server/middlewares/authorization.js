const Cart = require('../models/cart')
const Transaction = require('../models/transaction')

function authorizationProduct(req, res, next) {
    if (req.datauser.role == 'admin') {
        next()
    } else if (req.datauser.role == 'customer') {
        res.status(401).json({
            message: "you are not authorized"
        })
    } else {
        res.status(401).json({
            message: "you are not authorized"
        })
    }
}

function authorizationCart(req, res, next) {
    if (req.datauser.role == 'admin') {
        res.status(401).json({
            message: "only customer can access their cart"
        })
    } else if (req.datauser.role == 'customer') {
        Cart.findOne({_id: req.params.cartid})
            .then((cart) => {
                console.log(cart);
                if(cart){
                    if (cart.user_id == req.decoded.id) {
                        next()
                    }else{
                        throw ({
                            code: 401,
                            message: "Unauthorized"
                        })
                    }    
                }else{
                    next()
                }
                
            })
            .catch(() => {
                res.status(401).json({
                    message: " you are not authorized"
                })
            })
    } else {
        res.status(401).json({
            message: "you are not authorized"
        })
    }

}

function authorizationTransaction(req, res, next) {
    if (req.datauser.role == 'admin') {
        next()
    } else if (req.datauser.role == 'customer') {
        Transaction.findOne({_id: req.params.id})
            .then((data) => {
                if(data){
                    if (data.user_id == req.decoded.id) {
                        next()
                    }else{
                        throw ({
                            code: 401,
                            message: "Unauthorized"
                        })
                    }    
                }else{
                    next()
                }
                
            })
            .catch(() => {
                res.status(401).json({
                    message: " you are not authorized"
                })
            })
    } else {
        res.status(401).json({
            message: "you are not authorized"
        })
    }

}

module.exports = { authorizationProduct,authorizationTransaction, authorizationCart }