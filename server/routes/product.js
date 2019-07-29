const express = require('express')
const productRouter = express.Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const {authorizationProduct} = require('../middlewares/authorization')
const imageUpload = require('../middlewares/imageUpload')

productRouter.get('/',ProductController.fetch)
productRouter.use(authentication)
productRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ProductController.create)
productRouter.patch('/:productid',ProductController.updateStock)
productRouter.use(authorizationProduct)
productRouter.delete('/:productid',ProductController.delete)
productRouter.put('/:productid',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,ProductController.edit)


module.exports = productRouter