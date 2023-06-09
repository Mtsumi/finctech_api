import express from 'express';
import morgan from 'morgan';
import db from './modules/db';
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");


const app = express();

app.use(express.json());
app.use(morgan('dev')); // logger



app.use('/api/users', authRouter);

// Start the server...



const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
