// ========================================
// LEVEL 3: Authentication Context with Real API
// Learning: Context API, JWT tokens, async operations, Strapi integration
// ========================================

import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Verify token is still valid by fetching user
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear storage
          console.error("Session invalid:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function - calls real Strapi API
  const login = async (identifier, password) => {
    try {
      // Call Strapi login endpoint
      const response = await authService.login(identifier, password);

      // Store JWT token
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Update state
      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function - calls real Strapi API
  const register = async (userData) => {
    try {
      // Call Strapi register endpoint
      const response = await authService.register(
        userData.username,
        userData.email,
        userData.password
      );

      // Store JWT token
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Update state
      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

/*
🎓 LEARNING NOTES:

1. AUTHENTICATION STATE:
   - user: Current user object
   - isAuthenticated: Boolean flag
   - loading: Prevents flash of wrong content

2. ASYNC FUNCTIONS:
   - login(), register() return Promises
   - Use try/catch for error handling
   - Real app would call actual API

3. LOCALSTORAGE FOR PERSISTENCE:
   - Survives page refresh
   - JSON.stringify() to store objects
   - JSON.parse() to retrieve

4. USEEFFECT ON MOUNT:
   - Empty dependency array [] = runs once
   - Checks for existing session
   - Restores user if logged in

5. CONTEXT VALUE:
   - All functions and state in one object
   - Consumers get everything they need
   - Single source of truth
*/
