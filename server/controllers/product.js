const Product = require('../models/product')

class ProductController {
    static fetch(req, res, next) {
        Product.find()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static create(req, res, next) {
        const {name, stock, price} = req.body
        if (!req.file || !req.file.cloudStoragePublicUrl) {
            Product.create(
                {name, stock, price}
            )
                .then(function (newdata) {
                    res.status(201).json(newdata)
                })
                .catch(next)
        } else {
            Product.create(
                {name, stock, price, picture: req.file.cloudStoragePublicUrl }
            )
                .then(function (newdata) {
                    res.status(201).json(newdata)
                })
                .catch(next)
        }
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete({ _id: req.params.productid })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const {name, stock, price} = req.body
        console.log(typeof req.body.stock);
        
        if (!req.file || !req.file.cloudStoragePublicUrl) {
            Product.findByIdAndUpdate({ _id: req.params.productid },
                {name, stock, price},{ runValidators: true, new: true }
            )
                .then((data) =>{
                    console.log(data);
                    res.status(200).json(data)
                })
                .catch(next)
        }else{
            Product.findByIdAndUpdate({ _id: req.params.productid }, 
                {name, stock, price, picture: req.file.cloudStoragePublicUrl }, { runValidators: true, new: true })
                .then((data) => {
                    console.log('DATA update');
                    console.log(data);
                    
                    res.status(200).json(data)
                })
                .catch(next)
        }
        
    }

    static updateStock(req, res, next) {
        console.log(req.body);

        Product.updateOne({ _id: req.params.productid }, {
            stock: req.body.stock - 1
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)

    }
}

module.exports = ProductController