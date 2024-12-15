# Backend API Documentation

## Endpoint: `/users/register`

This endpoint is used to register a new user in the system.

---

### **HTTP Method**
**POST**

---

### **Description**
The `/users/register` endpoint allows a client to create a new user by submitting their first name, last name, email, and password. The user data is validated and securely stored in the database, and a JWT (JSON Web Token) is returned upon successful registration.

---

### **Request Body**
The request body must be in JSON format and include the following fields:

| Field                | Type    | Required | Description                                                   |
|----------------------|---------|----------|---------------------------------------------------------------|
| `fullname`           | Object  | Yes      | Contains the user's first name and last name.                |
| `fullname.firstname` | String  | Yes      | The first name of the user (minimum 3 characters).           |
| `fullname.lastname`  | String  | No       | The last name of the user (minimum 3 characters, optional).  |
| `email`              | String  | Yes      | The user's email address, must be valid and unique.          |
| `password`           | String  | Yes      | The user's password (minimum 6 characters).                  |

---

### **Request Example**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```
---

### **Validation Rules**
- **`fullname.firstname`**: Must be at least 3 characters long.
- **`fullname.lastname`**: Optional but must be at least 3 characters if provided.
- **`email`**: Must be a valid email format.
- **`password`**: Must be at least 6 characters long.

---

### **Response**

#### **Success**
**Status Code**: `201 Created`

**Response Example:**
```json
{
    "message": "User created successfully",
    "user": {
        "_id": "64f0c59b6d5b1f1f9c7e8d9c",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Validation Errors**
**Status Code**: `400 Bad Request`

**Response Example:**
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name should be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

#### **Internal Server Error**
**Status Code**: `500 Internal Server Error`

**Response Example:**
```json
{
    "message": "An error occurred while processing your request."
}
```

---

### **Notes**
- Ensure that the `Content-Type` header is set to `application/json` when sending the request.
- The JWT token in the success response can be used for authentication in other endpoints.
- The `password` field is securely hashed before being stored in the database and is not retrievable in its original form.

---

### **Additional Details**

#### **Controller Logic**
- The `registerUser` method in `user.controller.js`:
  - Validates incoming request data using `express-validator`.
  - Logs the request body (optional for debugging).
  - Hashes the user’s password using the static `hashPassword` method of the `user.model.js`.
  - Calls the `createUser` method in `user.service.js` to save the user in the database.
  - Generates a JWT token for the user using the `generateAuthToken` method in the user model.

### **Model Information**
- The `user.model.js` defines a Mongoose schema with the following fields:
  - **`fullname.firstname`**: Required, minimum length of 3 characters.
  - **`fullname.lastname`**: Optional, minimum length of 3 characters.
  - **`email`**: Required, unique, minimum length of 5 characters.
  - **`password`**: Required, hashed, and not returned in queries.

---

### **Service Logic**
- The `createUser` method in `user.service.js`:
  - Ensures all required fields are present.
  - Creates the user in the database.

---

### **Dependencies**

#### **Libraries Used:**
- **`express`**: For building the REST API.
- **`express-validator`**: For request validation.
- **`bcrypt`**: For hashing passwords.
- **`jsonwebtoken`**: For generating authentication tokens.
- **`mongoose`**: For database modeling and interaction.


## Endpoint: `/users/login`

This endpoint is used to authenticate an existing user and provide them with a JWT token for accessing protected resources.

---

### **HTTP Method**
**POST**

---

### **Description**
The `/users/login` endpoint allows a user to log in by submitting their email and password. If the credentials are valid, a JSON Web Token (JWT) is returned along with the user details.

---

### **Request Body**
The request body must be in JSON format and include the following fields:

| Field       | Type   | Required | Description                      |
|-------------|--------|----------|----------------------------------|
| `email`     | String | Yes      | The user's email address.        |
| `password`  | String | Yes      | The user's password.             |

---

### **Request Example**
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}

---

### **Validation Rules**
- **`fullname.firstname`**: Must be at least 3 characters long.
- **`fullname.lastname`**: Optional but must be at least 3 characters if provided.
- **`email`**: Must be a valid email format.
- **`password`**: Must be at least 6 characters long.

---

### **Response**

#### **Success**
**Status Code**: `201 Created`

**Response Example:**
```json
{
    "message": "User logged in successfully",
    "user": {
        "_id": "64f0c59b6d5b1f1f9c7e8d9c",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Validation Errors**
**Status Code**: `400 Bad Request`

**Response Example:**
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address",
            "param": "email",
            "location": "body"
        }
    ]
}
```
#### **Authentication Errors**
**Status Code**: `401 Unauthorized`

**Response Example:**
```json
{
    "message": "Invalid email or password"
}
```

#### **Internal Server Error**
**Status Code**: `500 Internal Server Error`

**Response Example:**
```json
{
    "message": "An error occurred while processing your request."
}
```
