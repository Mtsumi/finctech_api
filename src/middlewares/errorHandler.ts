import { CustomError } from './customError';
import { ValidationError } from 'express-validator';

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;

  constructor(public message: string = 'Unauthorized Access') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid Request Parameters');
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg }));
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor(public message: string = 'Not Found') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}