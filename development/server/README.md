# College App Server

This folder contains the backend servers for Level 3.

## 📂 Structure

```
college-app-server/
├── express-api/          # Simple Express.js API (Lessons 3.2-3.3)
│   ├── routes/           # API route handlers
│   ├── server.js         # Main server file
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
└── strapi-cms/           # Strapi CMS (Lesson 3.4+)
    └── (You'll create this with npx create-strapi-app)
```

## 🚀 Quick Start

### Express API

```bash
cd express-api
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

### Strapi CMS

```bash
# From college-app-server folder
npx create-strapi-app@latest strapi-cms --quickstart
```

Admin panel: `http://localhost:1337/admin`

## 📚 What You'll Build

### Express API (Lessons 3.2-3.3)

- Simple REST API
- In-memory data storage
- CRUD operations
- Route organization
- Basic validation

### Strapi CMS (Lessons 3.4-3.6)

- Real database (SQLite)
- Admin panel
- User authentication
- JWT tokens
- Media library
- Production-ready backend

## 🔗 API Endpoints

### Express API

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Strapi API

- `POST /api/auth/local/register` - Register
- `POST /api/auth/local` - Login
- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all users (protected)
- And more...

## 📖 Learn More

Follow the lessons in order:

1. [Lesson 3.2 - REST APIs & Express](../lessons/lesson-3.2-rest-apis.md)
2. [Lesson 3.3 - CRUD Operations](../lessons/lesson-3.3-crud-operations.md)
3. [Lesson 3.4 - Strapi Setup](../lessons/lesson-3.4-strapi-setup.md)
4. [Lesson 3.5 - Authentication](../lessons/lesson-3.5-authentication.md)
5. [Lesson 3.6 - Protected Routes](../lessons/lesson-3.6-protected-routes.md)
