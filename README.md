# Typescript Node.js Express.js MongoDB

This project is a Typescript-based backend architecture for a Node.js Express.js application. It provides a structured and scalable foundation to build RESTful APIs with proper error handling, middleware, routing, database integration, and unit testing. The architecture follows best practices to ensure maintainability, modularity, and code reusability.

## Project Overview

The project consists of the following components:

- **Routes**: The `routes` directory contains route handlers for different API endpoints. Each route handler is responsible for handling HTTP requests and responses for a specific resource (e.g., users or hobbies).

- **Middleware**: The `middleware` directory includes custom middleware functions that can be used to perform tasks like authentication, logging, CORS handling, etc.

- **Database Integration**: The `database` directory contains schemas and repository files for interacting with the database. The architecture uses MongoDB as the database.

- **Config**: The `config` directory holds configuration files for different environments (e.g., development, production). It also includes constants and configuration settings.

- **Core**: The `core` directory contains core components, such as error handling classes (`ApiError`, `NotFoundError`, `InternalError`) and API response classes (`SuccessResponse`, `ErrorResponse`).

- **Helpers**: The `helpers` directory includes utility functions and helper modules used throughout the application. It contains a validator module for input validation using `@hapi/joi`.

- **Test**: The `__tests__` directory contains unit test files for testing various components of the application, including routes, repository, and handlers.

## Routes

The routes define different API endpoints and their respective handlers. Let's explain the routes with examples:

### Users Routes

- **GET /users**: Fetches all users from the database.

  Example:
  ```http
  GET /users
  Response:
  Status: 200 OK

  [
    {
      "_id": "user_id1",
      "name": "User 1"
    },
    {
      "_id": "user_id2",
      "name": "User 2"
    }
  ]

- **GET /users/:user_id/hobbies**: Fetches a specific user with their associated hobbies based on the user_id.

  Example:

  ```http

  GET /users/user_id1/hobbies

  Response:

  json

  Status: 200 OK

  {
    "_id": "user_id1",
    "name": "User 1",
    "hobbies": [
      {
        "_id": "hobbie_id1",
        "name": "Reading",
        "passion_lvl": "LOW",
        "year": "2023-07-23T00:00:00.000Z"
      },
      {
        "_id": "hobbie_id2",
        "name": "Cooking",
        "passion_lvl": "MEDIUM",
        "year": "2023-07-23T00:00:00.000Z"
      }
    ]
  }
- **POST /users**: Creates a new user in the database.

  Example:

  ```http

  POST /users

  Body:
  {
    "name": "New User"
  }

  Response:

  json

  Status: 200 OK

  {
    "_id": "new_user_id",
    "name": "New User"
  }
- **DELETE /users**: Deletes a user from the database based on the provided id.

  Example:

  ```http

  DELETE /users

  Body:
  {
    "id": "user_id1"
  }

  Response:

  json

  Status: 200 OK

### Hobbies Routes

- **POST /hobbies**: Creates a new hobbie and associates it with a user.

    Example:

  ```http

  POST /hobbies

  Body:
  {
    "name": "Gardening",
    "passion_lvl": "HIGH",
    "user_id": "user_id1"
  }

  Response:

  json

  Status: 200 OK

- **DELETE /hobbies**: Deletes a hobbie and removes it from the associated user.

  Example:

  ```http

  DELETE /hobbies

  Body:
  {
    "user_id": "user_id1",
    "hobbie_id": "hobbie_id1"
  }

  Response:

  json

  Status: 200 OK

### File Structure

The project follows a modular file structure to organize different components logically. Here's an overview of the main directories:

    src: Contains the source code for the application.

        - routes: Contains route handlers for different API endpoints.

        - middleware: Includes custom middleware functions.

        - database: Contains schemas and repository files for database integration.

        - config: Holds configuration files.

        - core: Contains core components for error handling and API responses.

        - helpers: Includes utility functions and the validator module.

    __tests__: Contains unit test files.

    build: Contains the transpiled code when the Typescript code is compiled.

    node_modules: Contains installed dependencies.

    package.json: Lists the project's dependencies and scripts.

    tsconfig.json: Configures the Typescript compiler options.

### Handlers

The handlers are functions defined in the routes directory to handle specific HTTP requests for each endpoint. They interact with the database through the corresponding repository files and use the core components for error handling and API responses.

### Test Cases

The project includes unit test cases written using Jest to test various components of the application. The test cases are located in the __tests__ directory. They cover route handlers, middleware, and repository functions to ensure their correctness and reliability.

To run the unit tests, use the following command:

```bash

  npm test
```

The test cases help maintain code quality, catch bugs early, and provide a safety net when making changes or adding new features.
Conclusion

The Typescript Node.js Express.js Backend Architecture provides a solid foundation for building robust and scalable backend applications. It follows best practices, modular design, and includes test coverage to ensure the application's reliability. Developers can use this architecture as a starting point for various projects and extend it to meet specific requirements.
