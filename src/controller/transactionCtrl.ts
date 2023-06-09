import { Request, Response } from 'express';
import db from '../modules/db';
import { NotFoundError } from '../middlewares/errorHandler';
import { validationResult } from 'express-validator';
import { Prisma } from '@prisma/client';



// Create a new transaction
const createTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, type } = req.body;
    const userId = parseInt(req.currentUser?.id as string, 10);

    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Create the transaction
    const transaction = await db.transaction.create({
      data: {
        amount,
        type,
        userId,
      },
    });

    return res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single transaction by ID
const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transactionId = parseInt(id, 10); // Convert the string ID to a number
    const transaction = await db.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Get all transactions by user
const getTransactionsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userTransactions = await db.transaction.findMany({
      where: {
        userId: parseInt(userId, 10), // Convert the string userID to a number
      },
    });
    return res.status(200).json({ success: true, data: userTransactions });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Generate monthly transaction report
const generateMonthlyTransactionReport = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const userId = parseInt(req.currentUser?.id as string, 10);

    // Perform database operations or calculations to retrieve the required financial information
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(Number(year), Number(month) - 1, 1),
          lt: new Date(Number(year), Number(month), 1),
        },
      },
    });

    const totalDebit = transactions
      .filter((transaction) => transaction.type === 'DEBIT')
      .reduce((total, transaction) => total.add(transaction.amount), new Prisma.Decimal(0));

    const totalCredit = transactions
      .filter((transaction) => transaction.type === 'CREDIT')
      .reduce((total, transaction) => total.add(transaction.amount), new Prisma.Decimal(0));

    // Generating report data
    const reportData = {
      month: month,
      year: year,
      totalTransactions: transactions.length,
      totalDebit: totalDebit,
      totalCredit: totalCredit,
    };

    return res.status(200).json({ success: true, data: reportData });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getTransactionsByUser,
  generateMonthlyTransactionReport,
};
