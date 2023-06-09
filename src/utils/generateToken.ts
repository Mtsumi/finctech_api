import jwt from 'jsonwebtoken';
const dotenv = require("dotenv").config();

type User = {
  id: Number;
  email: string;
};

export default function (user: User) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
}