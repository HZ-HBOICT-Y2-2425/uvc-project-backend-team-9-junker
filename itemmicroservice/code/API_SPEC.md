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
  [
      {
          "id": 1,
          "userid": 1,
          "name": "Item Name",
          "description": "Item Description",
          "action": true,
          "available": true,
          "createdAt": "2024-01-01T12:00:00Z",
          "updatedAt": "2024-01-02T15:30:00Z"
      },
      ...
  ]

**Response:**
- **200 OK**
  ```json
  [
      {
          "id": 1,
          "name": "Item Name",
          "description": "Item Description",
          "action": true,
          "available": true,
          "createdAt": "2024-01-01T12:00:00Z",
          "updatedAt": "2024-01-02T15:30:00Z"
      },
      ...
  ]
  ```
- **404 Not Found**
  ```json
  {
      "message": "Item not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
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
      "message": "Ready to create an item",
      "userid": "12345"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
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
    "message": "Item successfully created.",
    "itemId": 1
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Internal server error"
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
    "message": "Item updated successfully"
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
    "message": "Item deleted successfully"
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