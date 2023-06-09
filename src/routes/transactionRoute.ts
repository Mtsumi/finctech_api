import { Router } from 'express';
const { createTransaction } = require("../controller/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = Router();


router.post('/transactions', authMiddleware, createTransaction);
module.exports = router;
