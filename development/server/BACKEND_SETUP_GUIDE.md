# Backend Configuration Guide - Level 3

## Overview

Level 3 now supports **two backend options**:

1. **Express REST API** (Simple, recommended for learning)
2. **Strapi CMS** (Advanced, production-ready)

Both backends have identical endpoint structures, so the client works with either one.

---

## Option 1: Express REST API

### Features

- ✅ In-memory database (no setup required)
- ✅ JWT authentication with bcrypt
- ✅ All CRUD operations
- ✅ Quick startup (~30 seconds)
- ✅ Perfect for learning

### Setup

```bash
cd level-3/college-app-server/express-api
npm install

# Create environment file
cp .env.example .env

# Edit .env and set your JWT_SECRET
# Example: JWT_SECRET=my-super-secret-key-12345

# Start server
npm run dev
```

Server runs on: `http://localhost:5000`

### Sample Users

All users have password: `password123`

1. **admin@college.edu** (Faculty)
2. **john@college.edu** (Student)
3. **jane@college.edu** (Alumni)

### Documentation

See `express-api/README.md` for:

- Complete API endpoint reference
- Authentication examples
- curl/Postman samples

---

## Option 2: Strapi CMS

### Features

- ✅ Real database (SQLite/PostgreSQL/MySQL)
- ✅ Admin UI for content management
- ✅ Built-in authentication
- ✅ Production-ready
- ✅ Plugin ecosystem

### Setup

```bash
cd level-3/college-app-server/strapi-cms
npm install
npm run develop
```

Server runs on: `http://localhost:1337`
Admin panel: `http://localhost:1337/admin`

### Documentation

See lesson files:

- `lesson-3.6-strapi-setup.md` - Installation guide
- `lesson-3.7-authentication.md` - Auth configuration

---

## Client Configuration

### Using Express API

1. Navigate to client folder:

```bash
cd level-3/college-app-client-level-3
```

2. Create/edit `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

3. Start client:

```bash
npm install
npm run dev
```

### Using Strapi CMS

1. Navigate to client folder:

```bash
cd level-3/college-app-client-level-3
```

2. Create/edit `.env`:

```bash
VITE_API_URL=http://localhost:1337/api
```

3. Start client:

```bash
npm install
npm run dev
```

### Switching Backends

Just change `VITE_API_URL` in `.env` and restart the dev server:

```bash
# Stop the dev server (Ctrl+C)
# Edit .env to use different API URL
# Restart
npm run dev
```

**The client works with both backends identically!**

---

## Endpoint Comparison

Both backends provide the same endpoints:

| Endpoint                   | Method | Description                  |
| -------------------------- | ------ | ---------------------------- |
| `/api/auth/local/register` | POST   | Register new user            |
| `/api/auth/local`          | POST   | Login (get JWT)              |
| `/api/users/me`            | GET    | Get current user (protected) |
| `/api/users`               | GET    | Get all users (protected)    |
| `/api/users/:id`           | GET    | Get user by ID (protected)   |
| `/api/users/:id`           | PUT    | Update user (protected)      |
| `/api/users/:id`           | DELETE | Delete user (protected)      |

**Protected** = Requires `Authorization: Bearer <JWT_TOKEN>` header

---

## Which Backend Should I Use?

### Use Express API if:

- 🎓 You're learning and want simplicity
- ⚡ You want quick setup (no database)
- 🧪 You're experimenting and testing
- 📚 You want to understand how backends work

### Use Strapi CMS if:

- 🏗️ You're building a real production app
- 👥 You need multiple users managing content
- 🔌 You want plugins and extensions
- 💾 You need persistent database storage
- 🎨 You want an admin UI for content

---

## Troubleshooting

### Port Conflicts

**Express API:**
Change `PORT` in `express-api/.env`:

```
PORT=5001
```

**Strapi:**
Change port in `strapi-cms/config/server.js`:

```javascript
module.exports = {
  port: 1338,
};
```

### CORS Errors

Both backends have CORS enabled by default. If issues persist:

**Express:** Check `server.js` has:

```javascript
app.use(cors());
```

**Strapi:** Check `strapi-cms/config/middlewares.js` has CORS configured.

### JWT Errors

Make sure `JWT_SECRET` in backend `.env` is set to a random string:

```
JWT_SECRET=your-super-secret-key-change-this-to-random-string
```

### Connection Refused

1. Make sure the backend server is running
2. Check the URL in client `.env` matches your running server
3. Verify port numbers match

---

## Development Workflow

### Recommended Setup for Learning

1. **Start with Express API:**

   ```bash
   # Terminal 1 - Backend
   cd level-3/college-app-server/express-api
   npm run dev
   ```

2. **Start client:**

   ```bash
   # Terminal 2 - Frontend
   cd level-3/college-app-client-level-3
   npm run dev
   ```

3. **Test in browser:**

   - Open `http://localhost:5173`
   - Register a new account
   - Login and explore

4. **Later, switch to Strapi:**
   - Stop Express API (Ctrl+C in Terminal 1)
   - Start Strapi: `cd ../strapi-cms && npm run develop`
   - Update client `.env` to use port 1337
   - Restart client

---

## Next Steps

After getting your backend running:

1. ✅ Test authentication (register/login)
2. ✅ Create users in the client
3. ✅ Update user profiles
4. ✅ Test protected routes
5. ✅ Use browser DevTools to see JWT tokens
6. ✅ Test API with Postman

**Happy coding!** 🚀
