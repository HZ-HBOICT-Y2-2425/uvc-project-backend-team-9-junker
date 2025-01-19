# Chat API Specification

## Base URL

`https://localhost:3014/api/chat`

## Endpoints

### 1. **Send a Message**

**Method:** POST**Endpoint:** `/send`**Description:** Save a new message to the database.**Request Parameters (Body):**

- `chatId` (string, required): The unique identifier for the chat (e.g., user1_user2).
- `sender` (string, required): The sender’s username.
- `recipient` (string, required): The recipient’s username.
- `content` (string, required): The message content.

**Response:**

- **201 Created**
  ```json
  {
    "success": true,
    "message": "Message sent"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error": "Missing required fields"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Failed to send message",
    "details": "Error details here"
  }
  ```

### 2. **Get Messages for a Specific Chat**

**Method:** GET**Endpoint:** `/{chatId}`**Description:** Retrieve all messages for a specific chat.**Request Parameters (Path):**

- `chatId` (string, required): The unique identifier for the chat (e.g., user1_user2).

**Response:**

- **200 OK**
  ```json
  [
    {
      "sender": "user1",
      "recipient": "user2",
      "content": "Hello!",
      "timestamp": 1678462800000
    },
    {
      "sender": "user2",
      "recipient": "user1",
      "content": "Hi there!",
      "timestamp": 1678462860000
    }
  ]
  ```
- **400 Bad Request**
  ```json
  {
    "error": "Missing chatId"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Failed to fetch messages",
    "details": "Error details here"
  }
  ```

### 3. **Get All Messages**

**Method:** GET
**Endpoint:** `/`
**Description:** Retrieve all messages across all chats.

**Response:**

- **200 OK**
  ```json
  [
    {
      "sender": "user1",
      "recipient": "user2",
      "content": "Hello!",
      "timestamp": 1678462800000
    },
    {
      "sender": "user2",
      "recipient": "user1",
      "content": "Hi there!",
      "timestamp": 1678462860000
    },
    {
      "sender": "user3",
      "recipient": "user4",
      "content": "Good morning!",
      "timestamp": 1678462920000
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Failed to fetch all messages",
    "details": "Error details here"
  }
  ```

### 4. **Get Last Messages for a User**

**Method:** GET**Endpoint:** `/last-messages/{userId}`**Description:** Retrieve the last message for each chat where the user is a participant.**Request Parameters (Path):**

- `userId` (string, required): The user’s unique identifier.

**Response:**

- **200 OK**
  ```json
  [
    {
      "chatId": "user1_user2",
      "sender": "user1",
      "recipient": "user2",
      "content": "Hello!",
      "timestamp": 1678462800000
    },
    {
      "chatId": "user3_user4",
      "sender": "user3",
      "recipient": "user4",
      "content": "Good morning!",
      "timestamp": 1678462920000
    }
  ]
  ```
- **400 Bad Request**
  ```json
  {
    "error": "Missing userId"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": "No chats found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Failed to fetch last messages",
    "details": "Error details here"
  }
  ```

## Error Codes

### HTTP Status Codes

- **200 OK:** The request was successful, and the server returned the requested data.
- **201 Created:** The request was successful, and the resource was created.
- **400 Bad Request:** The request is invalid or missing required fields.
- **404 Not Found:** The requested resource could not be found.
- **500 Internal Server Error:** The server encountered an error while processing the request.

## Environment Variables

The service uses the following environment variables configured in `variables.env`:

| Variable Name             | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `NODE_ENV`              | The environment in which the app is running (development, production). |
| `HOST`                  | The server’s host address.                                            |
| `PORT`                  | The port the server listens on.                                        |
| `FIREBASE_PROJECT_ID`   | The Firebase project ID.                                               |
| `FIREBASE_CREDENTIALS`  | Path to the Firebase credentials JSON file.                            |
| `FIREBASE_DATABASE_URL` | Firebase Realtime Database URL.                                        |