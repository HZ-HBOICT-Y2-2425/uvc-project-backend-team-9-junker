# User API Specification

## Base URL
`https://localhost:3012/`

## Endpoints

### 1. **Get User Information**
**Method:** GET  
**Endpoint:** `/user/{username}`  
**Description:** Retrieve information for a specific user.  
**Request Parameters:**
- `username` (path, required): The unique identifier of the user.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "User retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z",
    },
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-02T15:30:00Z"
      }
    ]
  }

  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "No user found.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```

### 2. **Create User**
**Method:** POST
**Endpoint:** `/register`  
**Description:** Create a new user.  
**Request Parameters:**
- `fullname` (string, required): The full name of the user.
- `username` (string, required): The unique identifier of the user.
- `password` (string, required): The secret key set by the user.

**Response:**
- **201 Created**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "User created successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "createdAt": "2024-12-11T12:00:00Z",
      "updatedAt": "2024-12-11T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "meta": {
      "status": 400,
      "message": "Username already exists",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "meta": {
      "status": 500,
      "message": "Internal server error.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```

# 3. **Login User**
**Method:** POST
**Endpoint:** `/login`
**Description:** Login a user.
**Request Parameters:**
- `username` (string, required): The unique identifier of the user.
- `password` (string, required): The secret key set by the user.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Login successful.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }

  ```
- **400 Bad Request**
  ```json
  {
    "meta": {
      "status": 400,
      "message": "Invalid username or password",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }

  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "No user found.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```

# 4. **Update User Information**
**Method:** PUT
**Endpoint:** `/user/{username}`
**Description:** Update information for a specific user.
**Request Parameters:**
- `profile_pic` (string, required): The profile picture of the user.
- `password` (string, required): The secret key set by the user.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "User updated successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-12-11T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "meta": {
      "status": 400,
      "message": "Invalid username or password",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "No user found.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "meta": {
      "status": 500,
      "message": "Internal server error.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```

# 5. **Delete User**
**Method:** DELETE
**Endpoint:** `/user/{username}`
**Description:** Delete a specific user.
**Request Parameters:**
- `username` (path, required): The unique identifier of the user.
- `password` (string, required): The secret key set by the user.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "User deleted successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```
- **400 Bad Request**
  ```json
  {
    "meta": {
      "status": 400,
      "message": "Invalid username or password",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "No user found.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": []
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "meta": {
      "status": 500,
      "message": "Internal server error.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```

# 6. **Get User List**
**Method:** GET
**Endpoint:** `/users`
**Description:** Retrieve a list of all users.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "User list retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "EMAIL",
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-02T15:30:00Z"
      },
      ...
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "meta": {
      "status": 500,
      "message": "Internal server error.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```