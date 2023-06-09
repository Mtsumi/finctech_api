import express from 'express';
import morgan from 'morgan';
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");
const transactionRouter = require("./routes/transactionRoute");


const app = express();

app.use(express.json());
app.use(morgan('dev')); // logger



app.use('/api/users', authRouter);
app.use('/api/transactions', transactionRouter);

// Start the server...



const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
