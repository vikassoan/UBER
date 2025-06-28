# Backend API Documentation

## Base URL
```
http://localhost:4000
```

## Authentication Endpoints

### Register User
Register a new user in the system.

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Validation Rules:**
- `fullname.firstname`: Minimum 3 characters required
- `email`: Must be a valid email address
- `password`: Minimum 6 characters required

**Success Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65df12345678901234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

**Error Response:**
```json
{
    "errors": [
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

### Login User
Authenticate an existing user.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters required

**Success Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65df12345678901234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

**Error Response:**
```json
{
    "message": "Invalid email or password"
}
```

**Status Codes:**
- 200: Successfully authenticated
- 400: Validation errors
- 401: Invalid credentials

### Get User Profile
Get the authenticated user's profile information.

**Endpoint:** `GET /users/profile`

**Authentication:** 
- Requires valid JWT token in Authorization header (`Bearer <token>`) or cookie

**Success Response:**
```json
{
    "_id": "65df12345678901234567890",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}
```

**Error Response:**
```json
{
    "message": "Unauthorized"
}
```

**Status Codes:**
- 200: Success
- 401: Unauthorized

### Logout User
Logout the currently authenticated user.

**Endpoint:** `GET /users/logout`

**Authentication:** 
- Requires valid JWT token in Authorization header (`Bearer <token>`) or cookie

**Success Response:**
```json
{
    "message": "Logged out successfully"
}
```

**Error Response:**
```json
{
    "message": "Unauthorized"
}
```

**Status Codes:**
- 200: Successfully logged out
- 401: Unauthorized

## Captain Endpoints

### Register Captain
Register a new captain (driver) in the system.

**Endpoint:** `POST /captains/register`

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
    }
}
```

**Validation Rules:**
- `fullname.firstname`: Minimum 3 characters required
- `email`: Must be a valid email address
- `password`: Minimum 6 characters required
- `vehicle.color`: Minimum 3 characters required
- `vehicle.plate`: Must match pattern [A-Z0-9]{1,10}
- `vehicle.capacity`: Must be integer and minimum 1
- `vehicle.type`: Must be one of: 'car', 'bike', 'auto'

**Success Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "65df12345678901234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.driver@example.com",
        "status": "inactive",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "type": "car"
        },
        "location": {
            "lat": null,
            "lng": null
        }
    }
}
```

**Error Response:**
```json
{
    "errors": [
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```
OR
```json
{
    "message": "Captain already exists"
}
```

**Status Codes:**
- 201: Captain successfully registered
- 400: Validation errors or captain already exists

### Login Captain
Authenticate an existing captain.

**Endpoint:** `POST /captains/login`

**Request Body:**
```json
{
    "email": "john.driver@example.com",
    "password": "password123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters required

**Success Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "65df12345678901234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.driver@example.com",
        "status": "inactive",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "type": "car"
        },
        "location": {
            "lat": null,
            "lng": null
        }
    }
}
```

**Error Response:**
```json
{
    "message": "Invalid email or password"
}
```

**Status Codes:**
- 200: Successfully authenticated
- 400: Validation errors
- 401: Invalid credentials

### Get Captain Profile
Get the authenticated captain's profile information.

**Endpoint:** `GET /captains/profile`

**Authentication:** 
- Requires valid JWT token in Authorization header (`Bearer <token>`) or cookie

**Success Response:**
```json
{
    "_id": "65df12345678901234567890",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "inactive",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
    },
    "location": {
        "lat": null,
        "lng": null
    }
}
```

**Error Response:**
```json
{
    "message": "Unauthorized"
}
```

**Status Codes:**
- 200: Success
- 401: Unauthorized

### Logout Captain
Logout the currently authenticated captain.

**Endpoint:** `GET /captains/logout`

**Authentication:** 
- Requires valid JWT token in Authorization header (`Bearer <token>`) or cookie

**Success Response:**
```json
{
    "message": "Logged out successfully"
}
```

**Error Response:**
```json
{
    "message": "Unauthorized"
}
```

**Status Codes:**
- 200: Successfully logged out
- 401: Unauthorized

## Status Codes
- 200: Success
- 201: Resource created
- 204: No content
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Internal server error