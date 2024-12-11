# Chat API Specification

## Base URL
`https://localhost:3014/`

## Endpoints

### 1. **Send a New Message**
**Method:** POST  
**Endpoint:** `/messages`  
**Description:** Save a new message to a specific chat. 
**Request Parameters:**
- `chatId` (string, required): The unique identifier of the chat.
- `sender` (string, required): The ID of the message sender.
- `recipient` (string, required): The ID of the message recipient.
- `content` (string, required): The content of the message.

**Response:**
- **201 Created**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "Message sent.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
      "success": true
    }
  }

  ```
- **400 Bad Request**
  ```json
  {
    "meta": {
      "status": 400,
      "message": "Missing required fields",
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

### 2. **Get Messages for a Specific Chat**
**Method:** GET
**Endpoint:** `//chats/:chatId/messages`  
**Description:** Retrieve all messages for a specific chat.
**Request Parameters:**
- `chatId` (string, required): The unique identifier of the chat.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Messages retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": [
      {
        "sender": "user123",
        "recipient": "user456",
        "content": "Hello!",
        "timestamp": "2024-12-11T12:00:00Z"
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
      "message": "Failed to fetch messages",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```

### 3. **Get All Messages**
**Method:** GET  
**Endpoint:** `/messages`  
**Description:** Retrieve all messages from the database.  

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "All messages retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": [
      {
        "chatId": "chat123",
        "sender": "user123",
        "recipient": "user456",
        "content": "Hello!",
        "timestamp": 1702294800000
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
      "message": "Failed to fetch all messages",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": null
  }
  ```

### 4. **Get Last Messages for a User**
**Method:** GET
**Endpoint:** `/users/:userId/last-messages`
**Description:** Retrieve the last message from each chat related to a specific user.
**Request Parameters:**
- `userid` (string, required): The ID of the user creating the Chat.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Last messages retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": [
      {
        "chatId": "chat123",
        "sender": "user123",
        "recipient": "user456",
        "content": "Hello!",
        "timestamp": 1702294800000
      },
      ...
    ]
  }

  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "Chat not found.",
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

### 5. **Delete an Chat**
**Method:** DELETE
**Endpoint:** `/chats/{id}`
**Description:** Delete an Chat from the database.
**Request Parameters:**
- `id` (path, required): The unique identifier of the Chat.
- `userid` (string, required): The ID of the user creating the Chat.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Chat deleted successfully.",
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
      "message": "Chat not found.",
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