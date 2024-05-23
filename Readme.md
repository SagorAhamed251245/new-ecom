# E-commerce Backend

This repository contains the backend code for an e-commerce application. It is built with Node.js, Express, and MongoDB, and uses TypeScript for type checking and improved code quality.

## Setup and Installation

### Clone the Repository

To get started, clone the repository to your local machine:

```sh
git clone https://github.com/SagorAhamed251245/new-ecom.git
cd new-ecom
```

### Install Dependencies

To install the necessary dependencies, use npm:

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URL=mongodb://localhost:27017/
PORT=5000
```

### Start the Server

To start the server in development mode, use npm:

```sh
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000).

### Live Server

The live version of the application can be accessed at: [https://new-e-commers.vercel.app/](https://new-e-commers.vercel.app/)

## API Endpoints

### Product Management

- **Create a New Product**

  - **Endpoint:** `/api/products`
  - **Method:** `POST`

- **Retrieve All Products**

  - **Endpoint:** `/api/products`
  - **Method:** `GET`

- **Retrieve a Specific Product by ID**

  - **Endpoint:** `/api/products/:productId`
  - **Method:** `GET`

- **Update Product Information**

  - **Endpoint:** `/api/products/:productId`
  - **Method:** `PUT`

- **Delete a Product**

  - **Endpoint:** `/api/products/:productId`
  - **Method:** `DELETE`

- **Search a Product**
  - **Endpoint:** `/api/products?searchTerm=iphone`
  - **Method:** `GET`

### Order Management

- **Create a New Order**

  - **Endpoint:** `/api/orders`
  - **Method:** `POST`

- **Retrieve All Orders**

  - **Endpoint:** `/api/orders`
  - **Method:** `GET`

- **Retrieve Orders by User Email**
  - **Endpoint:** `/api/orders?email=level2@programming-hero.com`
  - **Method:** `GET`

## Scripts

- `start:prod`: Start the server in production mode.
- `start:dev`: Start the server in development mode using `ts-node-dev`.
- `build`: Compile TypeScript to JavaScript.
- `build:run`: Compile TypeScript to JavaScript and watch for changes.
- `lint`: Run ESLint to check for code quality issues.
- `lint:fix`: Run ESLint and automatically fix issues.
- `prettier`: Format code using Prettier.
- `prettier:fix`: Automatically format code using Prettier.
- `test`: Placeholder for running tests (currently not specified).

## Dependencies

- `cors`: Middleware for enabling CORS.
- `dotenv`: Module for loading environment variables.
- `express`: Web framework for Node.js.
- `joi`: Schema validation library.
- `mongoose`: MongoDB object modeling tool.
- `typescript-eslint`: Tooling for using ESLint with TypeScript.
- `zod`: TypeScript-first schema declaration and validation library.

## Dev Dependencies

- `@types/cors`: Type definitions for CORS.
- `@types/express`: Type definitions for Express.
- `@types/node`: Type definitions for Node.js.
- `@typescript-eslint/eslint-plugin`: ESLint plugin for TypeScript.
- `@typescript-eslint/parser`: TypeScript parser for ESLint.
- `eslint`: Linter for JavaScript and TypeScript.
- `eslint-config-prettier`: Configuration to disable ESLint rules that conflict with Prettier.
- `prettier`: Code formatter.
- `ts-node-dev`: TypeScript execution environment for Node.js with auto-reloading.
- `typescript`: TypeScript language.

## Author

_Sagor Ahamed_

Feel free to contribute to this project by opening issues or submitting pull requests. If you have any questions or need further assistance, please contact me at *sagorahamed251245@gmail.com*.
