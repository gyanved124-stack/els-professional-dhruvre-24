// ========================================
// LEVEL 3: Layout Component with Navigation
// Learning: Outlet from React Router, useAuth hook
// ========================================

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Layout.css";

/**
 * Layout wraps all pages with common elements:
 * - Header (with navigation)
 * - Main content area (Outlet)
 * - Footer
 *
 * Outlet is where child routes render
 */
function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

/*
🎓 LEARNING NOTES:

1. OUTLET:
   - Special component from React Router
   - Acts as a placeholder for child routes
   - Example: When URL is /, Home component renders in Outlet
   - Example: When URL is /login, Login component renders in Outlet

2. LAYOUT PATTERN:
   - Common UI elements (Header, Footer) defined once
   - Don't repeat on every page
   - Consistent user experience

3. PROGRESSION:
   - Level 2: Each page had its own Header/Footer
   - Level 3: Shared Layout component with Outlet
*/
