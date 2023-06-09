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

Explain the authentication mechanism used by the API. Detail the steps required for authentication, including any required headers, tokens, or credentials. Also, mention any authorization mechanisms if applicable.

## Error Handling

Describe the approach to error handling in the API. Document the structure of error responses, including HTTP status codes, error messages, and any additional details provided in the response payload.

## Database Schema

Provide an overview of the database schema used by the application. Include a diagram or description of the tables, their relationships, and any important fields or constraints.

## Testing

Explain the testing approach for the API. Detail the types of tests performed, such as unit tests, integration tests, or API endpoint tests. Mention any testing frameworks or libraries used and provide instructions on running the tests.

## Deployment

Provide instructions for deploying the application. Explain the steps for containerizing the application using Docker and any additional deployment considerations.

## Examples

Include examples of API requests and responses using tools like Postman or cURL. Showcase various scenarios and highlight the expected outcomes.

## Contributing

Specify guidelines and instructions for contributing to the project.

## License

Specify the license under which the project is released.
