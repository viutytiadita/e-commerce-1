const express = require('express')
const cartRouter = express.Router()
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const {authorizationCart} = require('../middlewares/authorization')

cartRouter.use(authentication)
cartRouter.get('/',CartController.fetch)
cartRouter.get('/:productid',CartController.fetchOne)
cartRouter.post('/',CartController.create)
cartRouter.use('/:cartid',authorizationCart)
cartRouter.delete('/:cartid',CartController.delete)
cartRouter.patch('/:cartid',CartController.updateCount)

module.exports = cartRouter