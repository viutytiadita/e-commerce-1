const express = require('express')
const transactionRouter = express.Router()
const TransactionController = require('../controllers/transaction')
const authentication = require('../middlewares/authentication')
const {authorizationTransaction} = require('../middlewares/authorization')

transactionRouter.use(authentication)
transactionRouter.get('/all',TransactionController.findAll)
transactionRouter.get('/user',TransactionController.findUsers)
transactionRouter.post('/',TransactionController.create)
transactionRouter.use('/:id',authorizationTransaction)
transactionRouter.patch('/:id',TransactionController.changeStatus)

module.exports = transactionRouter