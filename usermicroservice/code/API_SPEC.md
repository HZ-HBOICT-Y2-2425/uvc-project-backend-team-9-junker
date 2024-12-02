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
      "id": "12345",
      "fullname": "John Doe",
      "username": "johndoe",
      "profile_pic": "URL_ADDRESS",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
  }
  ```
- **404 Not Found**
  ```json
  {
      "message": "User not found"
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
    "message": "User registered successfully"
  }

  ```
- **400 Bad Request**
  ```json
  {
    "message": "Username already exists"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
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
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

  ```
- **400 Bad Request**
  ```json
  {
    "message": "Invalid username or password"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "User not found"
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
    "message": "User updated successfully"
  }

  ```
- **400 Bad Request**
  ```json
  {
    "message": "Invalid username or password"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
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
    "message": "User deleted successfully"
  }

  ```
- **400 Bad Request**
  ```json
  {
    "message": "Invalid username or password"
  }
  ```
- **404 Not Found**
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```