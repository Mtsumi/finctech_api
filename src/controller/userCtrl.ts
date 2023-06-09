import { Request, Response } from 'express';
import { UnauthorizedError, BadRequestError } from '../middlewares/errorHandler';
import db from '../modules/db';
import { Password } from '../utils/password';
import generateToken from '../utils/generateToken';

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, username: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid Credentials');
    }

    const isMatch = await Password.compare(user.password, enteredPassword);

    if (!isMatch) {
      throw new UnauthorizedError('Invalid Credentials');
    }

    const { password, ...newUser } = user;

    const token = generateToken(user);

    res.status(200).json({ success: true, data: { ...newUser, token } });
  } catch (error: any) { // Explicitly type the 'error' parameter
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(400).json({ success: false, message });
  }
};


const signUp = async (req: Request, res: Response) => {
    try {
      const { email, username: enteredUsername, password: enteredPassword } = req.body;
  
      const userExists = await db.user.findUnique({
        where: { email },
      });
  
      if (userExists) {
        throw new BadRequestError('Email already in use');
      }
  
      // let's hash password before we save to our db
      const hash = await Password.toHash(enteredPassword);
  
      const user = await db.user.create({
        data: {
          email,
          username: enteredUsername,
          password: hash,
        },
      });
  
      // let's format this to return what we want, you can choose to return what you want
      const { password, createdAt, updatedAt, ...newUser } = user;
  
      const token = generateToken(user);
  
      res.status(201).json({ success: true, data: { ...newUser, token } });
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;
      else message = String(e);
      res.status(400).json({ success: false, message });
    }
  };

  
  

// Get a single user by ID
const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id, 10); // Convert the string ID to a number
      const user = await db.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

// Get all users
const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await db.user.findMany();
    console.log(users); 
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
    signIn,
    signUp,
    getUserById,
    getAllUsers,
};