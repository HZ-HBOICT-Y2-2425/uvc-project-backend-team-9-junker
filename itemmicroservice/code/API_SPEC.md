# Item API Specification

## Base URL
`https://localhost:3013/`

## Endpoints

### 1. **Show All Items**
**Method:** GET  
**Endpoint:** `/items`  
**Description:** Retrieve all items from the database.  

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Items retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z",
    },
    "data": [
      {
        "id": 1,
        "name": "Item Name",
        "description": "Item Description",
        "action": true,
        "available": true,
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
      "message": "No items found.",
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

### 2. **Prepare Item Creation**
**Method:** GET
**Endpoint:** `/items/create`  
**Description:** Prepare data for creating a new item.  
**Request Parameters:**
- `userid` (string, required): The unique identifier of the user.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Ready to create an item",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "userid": "12345"
    }
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

### 3. **Store a New Item**
**Method:** POST
**Endpoint:** `/items`
**Description:** Store a new item in the database.
**Request Parameters:**
- `name` (string, required): The name of the item.
- `description` (string, required): A description of the item.
- `action` (boolean, required): Indicates if the item requires action.
- `available` (boolean, required): Indicates if the item is currently available.
- `userid` (string, required): The ID of the user creating the item.

**Response:**
- **201 Created**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "Item successfully created.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "id": 1,
      "name": "New Item Name",
      "description": "New Item Description",
      "action": true,
      "available": true,
      "createdAt": "2024-12-11T12:00:00Z",
      "updatedAt": "2024-12-11T12:00:00Z"
    }
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

### 4. **Update an Existing Item**
**Method:** PUT
**Endpoint:** `/items/{id}`
**Description:** Update an item in the database.
**Request Parameters:**
- `id` (path, required): The unique identifier of the item.
- `name` (string, required): The name of the item.
- `description` (string, required): A description of the item.
- `action` (boolean, required): Indicates if the item requires action.
- `available` (boolean, required): Indicates if the item is currently available.
- `userid` (string, required): The ID of the user creating the item.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Item updated successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "id": 1,
      "name": "Updated Item Name",
      "description": "Updated Item Description",
      "action": false,
      "available": true,
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-12-11T12:00:00Z"
    }
  }

  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "Item not found for update.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
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

### 5. **Delete an Item**
**Method:** DELETE
**Endpoint:** `/items/{id}`
**Description:** Delete an item from the database.
**Request Parameters:**
- `id` (path, required): The unique identifier of the item.
- `userid` (string, required): The ID of the user creating the item.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Item deleted successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }


  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "Item not found for update.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
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