import { Router } from 'express';
const { signUp, signIn, getAllUsers, getUserById, createTransaction } = require("../controller/userCtrl");



const router = Router();

// Get all users
router.get('/', getAllUsers);


// Get user by ID
router.get('/:id', getUserById);
// Signup route
router.post('/signup', signUp);

// Login route
router.post('/login', signIn);






module.exports = router;
