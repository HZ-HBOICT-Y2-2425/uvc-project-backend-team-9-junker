# Picture API Specification

## Base URL
`https://localhost:3015/`

## Endpoints

### 1. **Get All Pictures**
**Method:** POST  
**Endpoint:** `/pictures`  
**Description:** Retrieve all pictures from the database.  
**Request Parameters:** None  

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Pictures retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "userid": 10,
        "pictureid": 20,
        "communityid": 30,
        "name": "picture1.jpg",
        "data": "Base64EncodedData",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-02T15:30:00Z"
      }
    ]
  }
  
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 2. **Get Picture by Name**
**Method:** POST
**Endpoint:** `/name/{name}`  
**Description:** Retrieve a picture by its name.
**Request Parameters:**
- `name` (path, required): The name of the picture.


**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Picture retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": {
      "id": 1,
      "userid": 10,
      "pictureid": 20,
      "communityid": 30,
      "name": "picture1.jpg",
      "data": "Base64EncodedData",
      "createdAt": "2025-01-01T12:00:00Z",
      "updatedAt": "2025-01-02T15:30:00Z"
    }
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 3. **Get Pictures by User ID**
**Method:** POST
**Endpoint:** `/user/{userid}`
**Description:** Retrieve all pictures uploaded by a specific user.
**Request Parameters:**
- `userid` (string, required): The ID of the user creating the picture.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Pictures retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "userid": 10,
        "itemid": 20,
        "communityid": 30,
        "name": "picture1.jpg",
        "data": "Base64EncodedData",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-02T15:30:00Z"
      }
    ]
  }

  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 4. **Get Pictures by Item ID**
**Method:** POST
**Endpoint:** `/item/{itemid}`
**Description:** Retrieve all pictures associated with a specific item.
**Request Parameters:**
- `itemid` (path, required): The unique identifier of the item.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Pictures retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "userid": 10,
        "itemid": 20,
        "communityid": 30,
        "name": "picture1.jpg",
        "data": "Base64EncodedData",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-02T15:30:00Z"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 5. **Get Pictures by Community ID**
**Method:** POST
**Endpoint:** `/community/{communityid}`
**Description:** Retrieve all pictures associated with a specific community.
**Request Parameters:**
- `communityid` (path, required): The unique identifier of the community.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Pictures retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "userid": 10,
        "itemid": 20,
        "communityid": 30,
        "name": "picture1.jpg",
        "data": "Base64EncodedData",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-02T15:30:00Z"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 6. **Create a New Picture**
**Method:** POST
**Endpoint:** `/create`
**Description:** Store a new picture in the database.
**Request Parameters:**
- `userid` (integer, required): ID of the user uploading the picture.
- `itemid` (integer, required): ID of the associated item.
- `communityid` (integer, required): ID of the associated community.
- `name` (string, required): Name of the picture.
- `data` (string, required): Base64 encoded data of the picture.

**Response:**
- **201 CREATED**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "Picture created successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": {
      "id": 1,
      "userid": 10,
      "itemid": 20,
      "communityid": 30,
      "name": "picture1.jpg",
      "data": "Base64EncodedData",
      "createdAt": "2025-01-12T10:00:00Z",
      "updatedAt": "2025-01-12T10:00:00Z"
    }
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 7. **Update an Existing Picture**
**Method:** PUT
**Endpoint:** `/edit/{id}`
**Description:** Update details of an existing picture.
**Request Parameters:**
- `id` (integer, required): ID of the picture.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Picture updated successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": {
      "id": 1,
      "userid": 10,
      "itemid": 20,
      "communityid": 30,
      "name": "updated_picture.jpg",
      "data": "UpdatedBase64EncodedData",
      "createdAt": "2025-01-01T12:00:00Z",
      "updatedAt": "2025-01-12T10:00:00Z"
    }
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 8. **Delete a Picture**
**Method:** DELETE
**Endpoint:** `/delete/{id}`
**Description:** Delete a picture from the database.
**Request Parameters:**
- `id` (integer, required): ID of the picture.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Picture deleted successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    }
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 9. **Get Pictures by ID**
**Method:** GET
**Endpoint:** `/{id}`
**Description:** Retrieve details of a specific picture by its ID.
**Request Parameters:**
- `id` (integer, required): ID of the picture.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Pictures retrieved successfully.",
      "timestamp": "2025-01-12T10:00:00Z"
    },
    "data": [
      {
        "id": 1,
        "userid": 10,
        "itemid": 20,
        "communityid": 30,
        "name": "picture1.jpg",
        "data": "Base64EncodedData",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-02T15:30:00Z"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
  }
  ```