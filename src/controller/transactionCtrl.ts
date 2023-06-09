import { Request, Response } from 'express';
import db from '../modules/db';

  // Create a new transaction
  const createTransaction = async (req: Request, res: Response) => {
    try {
      const { amount, type } = req.body;
      const userId = parseInt(req.currentUser?.id as string, 10);
  
      // Check if the required fields are provided
      if (!amount || !type || !userId) {
        return res.status(400).json({ success: false, message: 'Amount, type, and user ID are required' });
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
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
      return res.status(200).json({ success: true, data: transaction });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  
// Get all transactions
const getAllTransactions = async (req: Request, res: Response) => {
    try {
      const transactions = await db.transaction.findMany();
      return res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };


// Get all transactions by user for a given month
const getTransactionsByUserAndMonth = async (req: Request, res: Response) => {
    try {
      const { userId, month } = req.params;
      const year = new Date().getFullYear(); // Get the current year
  
      // Parse the month parameter into a date type
      const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
      const endDate = new Date(startDate);
      endDate.setUTCMonth(startDate.getUTCMonth() + 1);
  
      const userTransactions = await db.transaction.findMany({
        where: {
          userId: parseInt(userId, 10), // Convert the string userID to a number
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
  
      return res.status(200).json({ success: true, data: userTransactions });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  getTransactionsByUserAndMonth,
}