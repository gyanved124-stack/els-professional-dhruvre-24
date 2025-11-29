// ========================================
// LEVEL 3: Authentication Service
// Learning: JWT authentication, Strapi API, async/await
// ========================================

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://192.168.18.84:1337/api";

/**
 * WHAT IS JWT (JSON Web Token)?
 * A secure token that proves a user is authenticated.
 * Structure: header.payload.signature
 * Example: "eyJhbGciOiJIUzI1NiIs..."
 *
 * HOW IT WORKS:
 * 1. User logs in → Server generates JWT
 * 2. Client stores JWT in localStorage
 * 3. Client sends JWT with every request
 * 4. Server validates JWT and returns data
 */

/**
 * Login with email/username and password
 *
 * @param {string} identifier - Email or username
 * @param {string} password - Password
 * @returns {Promise<{jwt: string, user: Object}>}
 */
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier, // Can be email OR username
      password,
    });

    // Strapi returns: { jwt: "token...", user: {...} }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);

    // Extract error message from Strapi response
    const message =
      error.response?.data?.error?.message ||
      "Login failed. Please check your credentials.";
    throw new Error(message);
  }
};

/**
 * Register a new user
 *
 * @param {string} username - Username (must be unique)
 * @param {string} email - Email (must be unique)
 * @param {string} password - Password (minimum 6 characters)
 * @returns {Promise<{jwt: string, user: Object}>}
 */
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });

    // Strapi returns: { jwt: "token...", user: {...} }
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);

    // Extract validation errors from Strapi
    const message =
      error.response?.data?.error?.message || "Registration failed";
    throw new Error(message);
  }
};

/**
 * Get current authenticated user
 * Requires JWT token in localStorage
 *
 * @returns {Promise<Object>} User object
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get user error:", error.response?.data || error.message);
    throw new Error("Failed to get current user. Please log in again.");
  }
};

/**
 * Logout (client-side only)
 * JWT tokens are stateless - server doesn't track them
 * We just remove the token from localStorage
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/*
🎓 LEARNING NOTES:

1. ASYNC/AWAIT:
   - Makes async code look synchronous
   - await pauses until Promise resolves
   - Must be inside async function

2. TRY/CATCH:
   - Catches errors in async code
   - Like try/catch for sync code
   - Always handle API errors

3. ERROR HANDLING:
   - error.response = server responded with error
   - error.request = no response received
   - error.message = something else went wrong

4. STRAPI AUTH ENDPOINTS:
   - /auth/local - Login
   - /auth/local/register - Register
   - /users/me - Get current user (requires auth)

5. TOKEN STORAGE:
   - localStorage persists across page reloads
   - Alternative: sessionStorage (clears on tab close)
   - Never store sensitive data unencrypted

6. IDENTIFIER vs EMAIL:
   - Strapi accepts both email and username
   - "identifier" field makes it flexible
   - User can log in with either
*/
