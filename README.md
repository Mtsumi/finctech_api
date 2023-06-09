# Project Name - Tusenti API Documentation


# Tusenti Backend Engineer Test - API Documentation

## Overview

This documentation provides an overview of the RESTful API developed as part of the Tusenti Backend Engineer Test. The API is designed to handle financial transactions in a FinTech company and provides operations for creating transactions, retrieving transaction details, and generating transaction reports. The API ensures secure handling of sensitive financial data and incorporates validation, authentication, and error handling mechanisms.

## Endpoints

The API exposes the following endpoints:

1. **POST /transactions** - Creates a new financial transaction.
2. **GET /transactions/:id** - Retrieves the details of a specific transaction by its ID.
3. **GET /transactions/user/:userId** - Retrieves all transactions associated with a specific user.
4. **GET /transactions/reports/monthly** - Generates a monthly transaction report.

## Requirements

The API implementation adheres to the following requirements:

- **Backend Technology:** Node.js and TypeScript are used for the backend implementation.
- **Validation and Authentication:** Proper validation and authentication mechanisms are implemented for the API endpoints.
- **Data Security:** Transaction data is securely stored, with considerations for encryption if necessary.
- **Error Handling and Response Messages:** Appropriate error handling and response messages are implemented.
- **Database:** PostgreSQL is utilized to securely store transaction data.
- **Containerization:** The application is containerized using Docker.
- **Unit Tests:** Well-written unit tests are provided to test various API features.

## Deliverables

The following deliverables are expected:

1. **GitHub Repo:** The RESTful API implementation is available on GitHub.
2. **Documentation:** Detailed documentation on setting up and running the application using Docker is provided.
3. **Postman Examples:** Examples of API requests and responses are provided using Postman.
4. **Database Schema:** A description of the database schema and any necessary setup instructions are included.

## Evaluation Criteria

The evaluation of the API implementation will be based on the following criteria:

- **Accuracy and Completeness:** The API implementation accurately and completely fulfills the specified requirements.
- **TypeScript and Node.js Best Practices:** Proper use of TypeScript and Node.js best practices is demonstrated.
- **Secure Data Handling:** Sensitive financial data is securely handled, considering encryption if necessary.
- **Validation and Authentication:** Proper validation and authentication mechanisms are implemented.
- **Error Handling and Response Messages:** Effective error handling and clear response messages are provided.
- **Docker Usage:** The application is properly containerized using Docker.


## Table of Contents

1. Introduction
2. Getting Started
    - Prerequisites
    - Installation
    - Running the Application
3. API Endpoints
    - POST /transactions
    - GET /transactions/:id
    - GET /transactions/user/:userId
    - GET /transactions/reports/monthly
4. Authentication
    - Authentication Mechanism
    - Authorization
5. Error Handling
6. Database Schema
7. Testing
8. Deployment
    - Dockerization
    - Deployment Steps
9. Examples
    - Request Examples
    - Response Examples
10. Contributing
11. License

## Introduction

This documentation provides an overview of the RESTful API developed as part of the Tusenti Backend Engineer Test. The API is designed to handle financial transactions in a FinTech company and provides operations for creating transactions, retrieving transaction details, and generating transaction reports.

The API is implemented using Node.js and TypeScript, ensuring adherence to best practices. It utilizes PostgreSQL as the database for secure storage of transaction data. The application is containerized using Docker for easy deployment and scalability.

Proper validation and authentication mechanisms are implemented for the API endpoints to ensure data integrity and security. The API also incorporates robust error handling and response messages to provide a smooth user experience.



## Getting Started

To get started with the Tusenti Backend API, follow the steps below:

### Prerequisites

Before proceeding, make sure you have the following installed on your machine:

- Node.js (v18)
- Docker (for containerized deployment)
- VS Code
- volta

### Installation

1. Clone the GitHub repository for the API:
   git clone https://github.com/your-username/fintech_api.git

2. Navigate to the project directory:
    cd src

3. Install the dependencies using pnpx:
    pnpx install
4. Update node version with Volta using this command:
    volta pin node@18
5. Create a .env file in the root of the project directory and define the JWT_SECRET environment variable for the authmiddleware.


### Running the application

Run the app with the following command:
    pnpm compose up

There are handy scripts available in package.json that you can also use.


    
## API Endpoints

## Transcation Routes
### POST /transactions - Create a new financial transaction

- **Request Body**: Contains the details of the transaction to be created, including `amount` and `type`.
- **Required Headers**: Authentication token in the `Authorization` header.
- **Response**: Returns the created transaction object.

### GET /transactions/:id - Retrieve details of a specific transaction by ID

- **Request Parameters**: `id` - The ID of the transaction to retrieve.
- **Required Headers**: Authentication token in the `Authorization` header.
- **Response**: Returns the transaction object with the specified ID.

### GET /transactions/user/:userId - Retrieve all transactions associated with a specific user

- **Request Parameters**: `userId` - The ID of the user whose transactions to retrieve.
- **Required Headers**: Authentication token in the `Authorization` header.
- **Response**: Returns an array of transaction objects associated with the specified user.

### GET /transactions/reports/monthly - Generate a monthly transaction report

- **Request Query Parameters**: `month` - The month (1-12) for which to generate the report, and `year` - The year for which to generate the report.
- **Required Headers**: Authentication token in the `Authorization` header.
- **Response**: Returns the generated report data, including the month, year, total number of transactions, total debit amount, and total credit amount.


## User Routes

### Sign Up

Creates a new user account.

- **URL:** `/users/signup`
- **Method:** `POST`
- **Request Body:**

| Field     | Type   | Description         |
|-----------|--------|---------------------|
| email     | string | User's email address |
| username  | string | User's username     |
| password  | string | User's password     |

- **Response:**
  - Success (Status 201)
    ```json
    {
      "success": true,
      "data": {
        "id": "123",
        "email": "example@example.com",
        "username": "example",
        "token": "jwt_token"
      }
    }
    ```
  - Error (Status 400)
    ```json
    {
      "success": false,
      "message": "Email already in use"
    }
    ```

### Sign In

Authenticates a user and returns an access token.

- **URL:** `/users/login`
- **Method:** `POST`
- **Request Body:**

| Field     | Type   | Description         |
|-----------|--------|---------------------|
| email     | string | User's email address |
| password  | string | User's password     |

- **Response:**
  - Success (Status 200)
    ```json
    {
      "success": true,
      "data": {
        "id": "123",
        "email": "example@example.com",
        "username": "example",
        "token": "jwt_token"
      }
    }
    ```
  - Error (Status 400)
    ```json
    {
      "success": false,
      "message": "Invalid Credentials"
    }
    ```

### Get User by ID

Retrieves user details by their ID.

- **URL:** `/users/:id`
- **Method:** `GET`
- **Response:**
  - Success (Status 200)
    ```json
    {
      "success": true,
      "data": {
        "id": "123",
        "email": "example@example.com",
        "username": "example"
      }
    }
    ```
  - Error (Status 404)
    ```json
    {
      "success": false,
      "message": "User not found"
    }
    ```

### Get All Users

Retrieves details of all users.

- **URL:** `/users`
- **Method:** `GET`
- **Response:**
  - Success (Status 200)
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "123",
          "email": "example@example.com",
          "username": "example"
        },
        {
          "id": "456",
          "email": "test@test.com",
          "username": "test"
        }
      ]
    }
    ```
  - Error (Status 500)
    ```json
    {
      "success": false,
      "message": "Internal Server Error"
    }
    ```


## Authentication

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To authenticate and access protected routes, follow these steps:

1. **Sign Up**

   To create a new user account, send a `POST` request to the `/users/signup` endpoint with the required parameters in the request body. Provide the user's email, username, and password.
   Sample request body:
        {
            "email": "user@example.com",
            "username": "username",
            "password": "password"
        }

2. **Sign In**

   To authenticate a user and obtain an access token, send a `POST` request to the `/users/login` endpoint with the required parameters in the request body. Provide the user's email and password.
   Sample body:
        {
          "email": "user@example.com",
          "password": "password"
        }


3. **Protected Routes**

   To access protected routes, include the access token in the request headers. Set the `Authorization` header with the value `Bearer {jwt_token}`. Replace `{jwt_token}` with the actual access token obtained during the authentication process.

4. **Accessing User Data**

   To retrieve user-specific data, such as getting user details or performing user-related operations, send authenticated requests to the corresponding endpoints. Include the access token in the request headers as mentioned above.

5. **Token Expiration**

   Access tokens issued by the API may have an expiration time. When a token expires, the client needs to request a new token by following the sign-in process again.

**Note:** The API expects the access token to be passed in the `Authorization` header for protected routes. Ensure to include the `Bearer` prefix before the token value.

Make sure to handle authentication errors, such as invalid credentials or expired tokens, by checking the response status codes and messages provided by the API.

Take necessary security measures, such as using HTTPS for secure communication, securely storing passwords (e.g., using hashing techniques), and validating user inputs to prevent common vulnerabilities like SQL injection or cross-site scripting (XSS).

Remember to customize the authentication mechanism based on your specific requirements and security practices.

## Error Handling

The API follows a consistent error handling approach using custom error classes. These error classes extend the `CustomError` abstract class, which provides a common structure for handling errors.

The following error classes are used in the API:

### UnauthorizedError

This error class represents an unauthorized access attempt. It has a status code of `401`.

```typescript
class UnauthorizedError extends CustomError {
  constructor(public message: string = 'Unauthorized Access') {
    super(message);
  }

  statusCode: number = 401;

  serializeErrors() {
    return [{ message: this.message }];
  }
}
```

### RequestValidationError

This error class represents a request validation error. It is used when the request parameters fail validation. It has a status code of 400.

```typescript
class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super('Invalid Request Parameters');
  }

  statusCode: number = 400;

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg }));
  }
}
```


### BadRequestError

This error class represents a generic bad request error. It is used when the request is malformed or contains invalid data. It has a status code of 400.

```typescript

class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message);
  }

  statusCode: number = 400;

  serializeErrors() {
    return [{ message: this.message }];
  }
}
```

### NotFoundError

This error class represents a resource not found error. It is used when a requested resource does not exist. It has a status code of 404.

```typescript

class NotFoundError extends CustomError {
  constructor(public message: string = 'Not Found') {
    super(message);
  }

  statusCode: number = 404;

  serializeErrors() {
    return [{ message: this.message }];
  }
}
```
To handle errors, the API follows a consistent structure:

Each error class defines a statusCode property indicating the HTTP status code for the error.

The serializeErrors() method returns an array of error objects with the message field.

When an error occurs, it will be handled by the middleware and returned as a JSON response with the appropriate status code and error message.



## Database Schema

The schema consists of two models: `User` and `Transaction`. Let's take a closer look at each model:

### User

- `id`: Auto-incrementing integer field serving as the primary key.
- `username`: Unique string field representing the username of the user.
- `email`: Unique string field representing the email address of the user.
- `password`: String field storing the hashed password of the user.
- `createdAt`: DateTime field indicating the creation timestamp of the user.
- `updatedAt`: DateTime field indicating the last update timestamp of the user.
- `transactions`: One-to-many relationship field to the `Transaction` model, representing the transactions associated with the user.

### Transaction

- `id`: Auto-incrementing integer field serving as the primary key.
- `amount`: Decimal field representing the amount of the transaction.
- `date`: DateTime field indicating the timestamp of the transaction.
- `user`: Many-to-one relationship field to the `User` model, representing the user associated with the transaction.
- `createdAt`: DateTime field indicating the creation timestamp of the transaction.
- `updatedAt`: DateTime field indicating the last update timestamp of the transaction.
- `type`: Enum field representing the type of the transaction, which can be either `DEBIT` or `CREDIT`.

The Prisma schema file provides a clear structure for the database tables and their relationships. It serves as a blueprint for generating the necessary database queries and models when using the Prisma client.



## Deployment

The Dockerfile sets up your application by installing dependencies, generating Prisma client, and building the code using SWC. It exposes port 8080 and starts your application using the pnpm start command.

The docker-compose.yml file defines two services: postgres and backend. The postgres service uses the official PostgreSQL image and exposes port 5432 for local connection. The backend service builds the Docker image using the Dockerfile defined earlier, maps ports 5000 and 9229, and sets environment variables for the database URL and port.

To deploy your application using Docker, run the following command:

```shell
docker-compose up
```
This will build the Docker image and start the containers defined in the docker-compose.yml file.

Make sure you have Docker and Docker Compose installed on your system before running the above command.

## Examples

### Postman Examples

*** All The transaction routes need a logged in user, remember to log in, then choose bearer token as the authorisation method and add the token given upon login ***

#### User Sign Up
Description: This example demonstrates how to sign up a new user.

![User Sign Up Request](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686303905/Tusenti%20postman/Screenshot_2023-06-09_124444_j3cmrc.png)

#### User Login
Description: This example demonstrates how to log in an existing user.
A user has to be logged in to make a transaction

![User Login Request](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686304242/Tusenti%20postman/Screenshot_2023-06-09_125004_nmzca3.png)

#### Transaction Create
Description: This example show a created transaction by userId 7

![User Transaction create](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686304420/Tusenti%20postman/transaction_create_zbby1r.png)

#### Transaction Read by userId 7

Description: This example gets a transaction by userId

![Get by user ID](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686304638/Tusenti%20postman/trans_read_byId_ymdhzy.png)

#### Transaction Read by transaction Id

Description: This example gets a transaction by it's ID

![Get by user ID](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686304907/Tusenti%20postman/readBytransId_tawmmi.png)

#### Transaction Monthly Reports
Description: This example generates a monthly report requested by a user for a specific month

![Monthly Reports](https://res.cloudinary.com/dpz3nmgaf/image/upload/v1686305089/Tusenti%20postman/mothReport_ndg0uv.png)
## To contribute:

+ Fork the repository
+ Create a new branch: git checkout -b new-feature
+ Make your changes and commit them: git commit -am 'Add new feature'
+ Push to the branch: git push origin new-feature
+ Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to reach out if you have any questions or need further assistance!

# Tags

`Docker` `NodeJS` `TypeScript` `REST API` `permissions` `authentication` `authorization` `knex` `prisma` `volta` `rimraf` `pnpm`
