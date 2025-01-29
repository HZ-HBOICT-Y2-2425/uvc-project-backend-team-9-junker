# Community API Specification

## Base URL
`https://localhost:3011/`

## Endpoints

### 1. **Show All Communities**
**Method:** GET  
**Endpoint:** `/communities`  
**Description:** Retrieve all communities from the database.  

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Communities retrieved successfully.",
      "timestamp": "2024-12-11T12:00:00Z",
    },
    "data": [
      {
        "id": 1,
        "name": "Community Name",
        "description": "Community Description",
        "location": "Community Location",
        "status": "Community Status",
        "cover_pic": "Community Cover Picture",
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
      "message": "No Communities found.",
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

### 2. **Prepare Community Creation**
**Method:** GET
**Endpoint:** `/communities/create`  
**Description:** Prepare data for creating a new Community.  
**Request Parameters:**
- `userid` (string, required): The unique identifier of the user who create the community.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Ready to create an Community",
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

### 3. **Store a New Community**
**Method:** POST
**Endpoint:** `/communities`
**Description:** Store a new Community in the database.
**Request Parameters:**
- `name` (string, required): The name of the Community.
- `description` (string, required): A description of the Community.
- `location` (string, required): The location of the Community.
- `status` (string, required): The status of the Community.
- `cover_pic` (string, required): The cover picture of the Community.
- `userid` (string, required): The ID of the user creating the Community.

**Response:**
- **201 Created**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "Community successfully created.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
        "id": 1,
        "name": "Community Name",
        "description": "Community Description",
        "location": "Community Location",
        "status": "Community Status",
        "cover_pic": "Community Cover Picture",
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-02T15:30:00Z"
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

### 4. **Update an Existing Community**
**Method:** PUT
**Endpoint:** `/communities/{id}`
**Description:** Update an Community in the database.
**Request Parameters:**
- `name` (string, required): The name of the Community.
- `description` (string, required): A description of the Community.
- `location` (string, required): The location of the Community.
- `status` (string, required): The status of the Community.
- `cover_pic` (string, required): The cover picture of the Community.
- `userid` (string, required): The ID of the user creating the Community.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Community updated successfully.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
        "id": 1,
        "name": "Community Name",
        "description": "Community Description",
        "location": "Community Location",
        "status": "Community Status",
        "cover_pic": "Community Cover Picture",
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-02T15:30:00Z"
    }
  }

  ```
- **404 Not Found**
  ```json
  {
    "meta": {
      "status": 404,
      "message": "Community not found for update.",
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

### 5. **Delete an Community**
**Method:** DELETE
**Endpoint:** `/communities/{id}`
**Description:** Delete an Community from the database.
**Request Parameters:**
- `id` (path, required): The unique identifier of the Community.
- `userid` (string, required): The ID of the user creating the Community.

**Response:**
- **200 OK**
  ```json
  {
    "meta": {
      "status": 200,
      "message": "Community deleted successfully.",
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
      "message": "Community not found for update.",
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

### 6. **Join a Community**
**Method:** POST
**Endpoint:** `/join/:community_id`
**Description:** Join a new Community in the database.
**Request Parameters:**
- `community_id` (string, required): The id of the Community.

**Response:**
- **201 Created**
  ```json
  {
    "meta": {
      "status": 201,
      "message": "Successfully joined the community.",
      "timestamp": "2024-12-11T12:00:00Z"
    },
    "data": {
        "user_id": 1,
        "community_id": 1,
        "role": "Member",
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
