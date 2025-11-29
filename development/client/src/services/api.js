// ========================================
// LEVEL 3: API Service Layer
// Learning: Axios, interceptors, base URL configuration
// ========================================

import axios from "axios";

/**
 * WHAT IS AXIOS?
 * Axios is a promise-based HTTP client for making API requests.
 * It's easier to use than fetch() and has more features.
 *
 * WHY USE AXIOS?
 * - Automatic JSON parsing
 * - Request/response interceptors
 * - Better error handling
 * - Request cancellation
 * - Works in Node.js and browsers
 */

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.18.84:1337/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Runs BEFORE every request is sent
 * Use for: Adding auth tokens, logging, modifying headers
 */
api.interceptors.request.use(
  (config) => {
    // Add JWT token if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Runs AFTER every response is received
 * Use for: Error handling, data transformation, logging
 */
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.config.url, response.status);
    // Return just the data, not the whole response object
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error (4xx, 5xx)
      console.error(
        "❌ API Error:",
        error.response.status,
        error.response.data
      );

      // If 401 Unauthorized, redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (error.request) {
      // Request sent but no response (network error)
      console.error("❌ Network Error:", error.message);
    } else {
      // Something else went wrong
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

/*
🎓 LEARNING NOTES:

1. AXIOS INSTANCE:
   - axios.create() makes a configured instance
   - All requests use same baseURL and headers
   - Don't repeat configuration in every request

2. INTERCEPTORS:
   - Like middleware for HTTP requests
   - Request interceptor: modify before sending
   - Response interceptor: modify after receiving

3. BASE URL:
   - import.meta.env.VITE_API_URL reads from .env
   - Falls back to default if not set
   - Vite replaces at build time

4. AUTOMATIC JSON:
   - Axios auto-parses JSON responses
   - No need for response.json() like fetch()
   - Content-Type header set automatically

5. ERROR HANDLING:
   - 401 = Unauthorized (token expired/invalid)
   - 404 = Not Found
   - 500 = Server Error
   - Network error = Server unreachable
*/
