# Express REST API - College App Server

A lightweight Express.js REST API for the College Kit App (Level 3). This server provides an alternative to Strapi CMS with the same endpoint structure, making it easier to get started without database setup.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Full CRUD operations for user profiles
- **In-Memory Database**: No database setup required - perfect for learning
- **CORS Enabled**: Ready for frontend integration
- **Strapi-Compatible**: Matches Strapi endpoint structure for easy switching

## Requirements

- Node.js 18+
- npm 9+

## Installation

1. Navigate to the express-api directory:

```bash
cd level-3/college-app-server/express-api
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your JWT_SECRET (use a random string)
# Example: JWT_SECRET=your-super-secret-key-change-this
```

4. Start the server:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register New User

```http
POST /api/auth/local/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@college.edu",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "mobile": "1234567890",
  "role": "Student",
  "status": "Active"
}
```

**Response:**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 4,
    "username": "johndoe",
    "email": "john@college.edu",
    "firstName": "John",
    "lastName": "Doe",
    "mobile": "1234567890",
    "role": "Student",
    "status": "Active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login

```http
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "john@college.edu",
  "password": "password123"
}
```

**Response:**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@college.edu",
    ...
  }
}
```

### User Management

All user endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Current User

```http
GET /api/users/me
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Users

```http
GET /api/users
Authorization: Bearer YOUR_JWT_TOKEN

# With filters
GET /api/users?role=Student&status=Active&search=john
```

#### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update User

```http
PUT /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "mobile": "9876543210",
  "status": "Inactive"
}
```

#### Delete User

```http
DELETE /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Statistics

```http
GET /api/users/stats/overview
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "total": 15,
  "byRole": {
    "Student": 10,
    "Alumni": 3,
    "Faculty": 2
  },
  "byStatus": {
    "Active": 12,
    "Inactive": 3
  }
}
```

## Sample Users

The API comes with 3 pre-loaded users (password: `password123`):

1. **Admin User**

   - Email: `admin@college.edu`
   - Username: `admin`
   - Role: Faculty

2. **Student User**

   - Email: `john@college.edu`
   - Username: `john_doe`
   - Role: Student

3. **Alumni User**
   - Email: `jane@college.edu`
   - Username: `jane_smith`
   - Role: Alumni

## Using with the Client

### Option 1: Express API (This Server)

1. Start the Express server (port 5000)
2. In the client project (`college-app-client-level-3`), create `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Option 2: Strapi CMS

1. Set up and start Strapi (port 1337)
2. In the client project, create `.env`:

```bash
VITE_API_URL=http://localhost:1337/api
```

The client will automatically use the configured API URL.

## Error Handling

All errors follow Strapi's error format:

```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Email already taken",
    "details": {}
  }
}
```

Common status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Project Structure

```
express-api/
├── server.js           # Main server file
├── db.js              # In-memory database
├── .env.example       # Environment template
├── package.json       # Dependencies
├── middleware/
│   └── auth.js        # JWT authentication
└── routes/
    ├── auth.js        # Authentication endpoints
    └── users.js       # User management endpoints
```

### Adding New Routes

1. Create route file in `routes/` directory
2. Import and mount in `server.js`:

```javascript
const newRoutes = require("./routes/new-routes");
app.use("/api/new-endpoint", newRoutes);
```

### Database Persistence

Currently using in-memory storage (data resets on server restart). For production:

1. Replace `db.js` with a real database (PostgreSQL, MongoDB, etc.)
2. Use an ORM like Prisma or Sequelize
3. Update route handlers to use async database operations

## Troubleshooting

**Port already in use:**

```bash
# Change PORT in .env file
PORT=5001
```

**JWT verification fails:**

```bash
# Make sure JWT_SECRET in .env matches the secret used to sign tokens
# Restart the server after changing .env
```

**CORS errors:**

```bash
# The server allows all origins by default (cors: true)
# For production, configure specific origins in server.js
```

## Next Steps

- [ ] Add role-based access control (RBAC)
- [ ] Implement database persistence
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add rate limiting
- [ ] Add request validation middleware

## License

MIT
