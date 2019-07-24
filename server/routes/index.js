const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

router.use('/users',userRouter)
router.use('/products',productRouter)
router.use('/carts',cartRouter)
router.use('/transactions',transactionRouter)

module.exports = router