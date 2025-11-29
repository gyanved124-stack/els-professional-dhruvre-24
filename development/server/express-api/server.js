const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "College Member Directory API",
    version: "1.0.0",
    endpoints: {
      auth: {
        register: "POST /api/auth/local/register",
        login: "POST /api/auth/local",
      },
      users: {
        getAll: "GET /api/users",
        getMe: "GET /api/users/me",
        getById: "GET /api/users/:id",
        update: "PUT /api/users/:id",
        delete: "DELETE /api/users/:id",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      name: "NotFoundError",
      message: "Route not found",
      details: {},
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      name: err.name || "InternalServerError",
      message: err.message || "Something went wrong",
      details: err.details || {},
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express API running on http://localhost:${PORT}/api`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});
