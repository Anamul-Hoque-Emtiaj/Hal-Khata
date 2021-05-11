const router = require('express').Router();
const authenticate = require('../authenticate')
const create = require('../controller/createTransactionController')
const getAllTransactions = require('../controller/getAllTransactions')
const getUserTransactions = require('../controller/getUserTransaction')
const update = require('../controller/updateTransaction')
const remove = require('../controller/deleteTransaction')
const deleteAllTransaction = require('../controller/deleteAllTransaction')

router.get('/',authenticate, getAllTransactions)
router.get('/:id',authenticate, getUserTransactions)
router.post('/',authenticate, create)
router.put('/:id',authenticate, update)
router.delete('/:id',authenticate, remove)
router.delete('/user/:id',authenticate, deleteAllTransaction)

module.exports = router;