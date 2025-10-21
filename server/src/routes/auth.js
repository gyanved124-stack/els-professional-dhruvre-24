const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Mock user database (plain text passwords for now)
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123', // plain text
    name: 'Administrator',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: 'userpass', // plain text
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user'
  }
]

// Login endpoint (plain text validation)
router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body)
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }

    const user = users.find(u => u.username === username)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Plain text check (⚠️ insecure, only for temporary dev use!)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    )

    const { password: _, ...userWithoutPassword } = user
    res.json({ message: 'Login successful', user: userWithoutPassword, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key')
    const user = users.find(u => u.id === decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const { password: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

module.exports = router
