import { Router } from 'express';
const {
  createTransaction,
  getTransactionById,
  getTransactionsByUser,
  generateMonthlyTransactionReport,
} = require('../controller/transactionCtrl');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

// Create a new financial transaction
router.post('/', authMiddleware, createTransaction);

// Retrieve details of a specific transaction by ID
router.get('/:id', authMiddleware, getTransactionById);

// Retrieve all transactions associated with a specific user
router.get('/user/:userId', authMiddleware, getTransactionsByUser);

// Generate a monthly transaction report
router.get('/reports/monthly', authMiddleware, generateMonthlyTransactionReport);

module.exports = router;
