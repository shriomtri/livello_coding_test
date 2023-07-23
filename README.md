# API Routes Documentation

## Introduction

This document provides an overview of the API routes and their functionalities for the User and Hobbie resources.

## User Routes

### GET /users

- **Description**: Fetches all users from the database.
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of user objects.

### GET /users/:user_id/hobbies

- **Description**: Fetches a specific user with their associated hobbies based on the user_id.
- **Parameters**:
  - `user_id` (URL parameter): The ID of the user to fetch.
- **Response**:
  - **Status**: 200 OK
  - **Body**: User object with an array of associated hobbies.

### POST /users

- **Description**: Creates a new user in the database.
- **Request Body**:
  - `name`: The name of the user to be created.
- **Response**:
  - **Status**: 200 OK
  - **Body**: Newly created user object.

### DELETE /users

- **Description**: Deletes a user from the database based on the provided ID.
- **Request Body**:
  - `id`: The ID of the user to be deleted.
- **Response**:
  - **Status**: 200 OK

## Hobbie Routes

### POST /hobbies

- **Description**: Creates a new hobbie and associates it with a user.
- **Request Body**:
  - `name`: The name of the hobbie to be created (alphanumeric, min 3, max 30 characters).
  - `passion_lvl`: The passion level for the hobbie (LOW, MEDIUM, HIGH, VERY_HIGH).
  - `user_id`: The ID of the user to associate the hobbie with.
- **Response**:
  - **Status**: 200 OK

### DELETE /hobbies

- **Description**: Deletes a hobbie and removes it from the associated user.
- **Request Body**:
  - `user_id`: The ID of the user associated with the hobbie.
  - `hobbie_id`: The ID of the hobbie to be deleted.
- **Response**:
  - **Status**: 200 OK

## Test Cases

### Unit Tests

We have written unit test cases for various components in the project to ensure their correctness and robustness. These tests are located in the `__tests__` directory. To run the unit tests, use the following command:

```bash
npm test
