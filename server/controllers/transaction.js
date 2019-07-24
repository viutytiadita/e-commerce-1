const Transaction = require('../models/transaction')

class TransactionController {
    static create(req,res,next){
        console.log(req.body);
        
        Transaction.create({
            user_id: req.decoded.id,
            total : req.body.total,
            $set: {
                products: [
                    {
                        id: req.body.product_id,
                        count: req.body.count
                    }
                ]
            }
        })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static findAll(req,res,next) {
        Transaction.find()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findUsers(req,res,next) {
        Transaction.find({user_id : req.decoded.id})
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