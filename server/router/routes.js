const express= require('express')
const router = express.Router()
const {
    getAllTransactionsStatic,
    getAllTransactions,
    getOneTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controller/transactions')

router.route('/').get(getAllTransactions).post(createTransaction)
router.route('/:id').get(getOneTransaction).patch(updateTransaction).delete(deleteTransaction)

module.exports = router