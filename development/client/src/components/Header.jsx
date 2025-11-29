// ========================================
// LEVEL 3: Header with Navigation
// Learning: useAuth, NavLink, conditional rendering
// ========================================

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Header.css";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container">
        {/* Logo and Branding */}
        <div className="header-brand">
          <NavLink to="/" className="logo">
            🎓 College Kit
          </NavLink>
          <p className="tagline">Your Campus Community Hub</p>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/members"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Members
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </NavLink>
              <button onClick={logout} className="nav-link logout-btn">
                Logout ({user?.username})
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

/*
🎓 LEARNING NOTES:

1. NAVLINK vs LINK:
   - NavLink provides isActive state
   - Use for navigation menus
   - Automatically adds "active" class

2. CONDITIONAL RENDERING:
   - isAuthenticated ? (logged in UI) : (public UI)
   - Different nav items for different user states

3. CONTEXT HOOKS:
   - useAuth() - gets authentication state
   - useTheme() - gets theme state
   - Both from Context API
*/
