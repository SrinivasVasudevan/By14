const express= require('express')
const router = express.Router()
const {
    signup,
    dashboard,
    getAllTransactionsStatic,
    getAllTransactions,
    getOneTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controller/transactions')

router.route('/signup').get(signup)
router.route('/dashboard').get(dashboard)
router.route('/').get(getAllTransactions).post(createTransaction)
router.route('/:id').get(getOneTransaction).patch(updateTransaction).delete(deleteTransaction)

module.exports = router