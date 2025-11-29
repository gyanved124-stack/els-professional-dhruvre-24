const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");
const authMiddleware = require("../middleware/auth");

// Get current user (requires authentication)
router.get("/me", authMiddleware, (req, res) => {
  try {
    const user = db.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to fetch user",
        details: {},
      },
    });
  }
});

// Get all users (requires authentication)
router.get("/", authMiddleware, (req, res) => {
  try {
    const { role, status, search } = req.query;

    const users = db.getUsers({ role, status, search });

    // Remove passwords from all users
    const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);

    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to fetch users",
        details: {},
      },
    });
  }
});

// Get user by ID (requires authentication)
router.get("/:id", authMiddleware, (req, res) => {
  try {
    const user = db.getUserById(parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to fetch user",
        details: {},
      },
    });
  }
});

// Update user (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updates = req.body;

    // Check if user exists
    const existingUser = db.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    // Only allow users to update their own profile (unless admin)
    // For now, simplified: allow all authenticated users

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Check for duplicate email/username if they're being changed
    if (updates.email && updates.email !== existingUser.email) {
      const emailExists = db.getUserByEmail(updates.email);
      if (emailExists) {
        return res.status(400).json({
          error: {
            status: 400,
            name: "ValidationError",
            message: "Email already taken",
            details: {},
          },
        });
      }
    }

    if (updates.username && updates.username !== existingUser.username) {
      const usernameExists = db.getUserByUsername(updates.username);
      if (usernameExists) {
        return res.status(400).json({
          error: {
            status: 400,
            name: "ValidationError",
            message: "Username already taken",
            details: {},
          },
        });
      }
    }

    const updatedUser = db.updateUser(userId, updates);
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to update user",
        details: {},
      },
    });
  }
});

// Delete user (requires authentication)
router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const existingUser = db.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    // Only allow users to delete their own profile (unless admin)
    // For now, simplified: allow all authenticated users

    db.deleteUser(userId);

    res.json({
      message: "User deleted successfully",
      id: userId,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to delete user",
        details: {},
      },
    });
  }
});

// Get statistics (requires authentication)
router.get("/stats/overview", authMiddleware, (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      error: {
        status: 500,
        name: "InternalServerError",
        message: "Failed to fetch statistics",
        details: {},
      },
    });
  }
});

module.exports = router;
