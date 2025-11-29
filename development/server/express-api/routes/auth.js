const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Register new user
router.post("/local/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      mobile,
      role = "Student",
      status = "Active",
    } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Missing required fields",
          details: {
            errors: [
              { path: ["username"], message: "Username is required" },
              { path: ["email"], message: "Email is required" },
              { path: ["password"], message: "Password is required" },
              { path: ["firstName"], message: "First name is required" },
              { path: ["lastName"], message: "Last name is required" },
            ],
          },
        },
      });
    }

    // Check if user exists
    const existingEmail = db.getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Email already taken",
          details: {},
        },
      });
    }

    const existingUsername = db.getUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Username already taken",
          details: {},
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = db.createUser({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      mobile: mobile || "",
      role,
      status,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      jwt: token,
      user: newUser,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Registration failed",
        details: {},
      },
    });
  }
});

// Login
router.post("/local", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Missing credentials",
          details: {},
        },
      });
    }

    // Find user by email or username
    let user = db.getUserByEmail(identifier);
    if (!user) {
      user = db.getUserByUsername(identifier);
    }

    if (!user) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Invalid identifier or password",
          details: {},
        },
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: {
          status: 400,
          name: "ValidationError",
          message: "Invalid identifier or password",
          details: {},
        },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      jwt: token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Login failed",
        details: {},
      },
    });
  }
});

module.exports = router;
