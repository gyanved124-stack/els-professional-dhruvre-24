// ========================================
// LEVEL 3: Protected Route Component
// Learning: Route guards, conditional rendering
// ========================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;

/*
🎓 LEARNING NOTES:

1. ROUTE PROTECTION:
   - Wraps routes that require authentication
   - Checks isAuthenticated before rendering
   - Redirects to /login if not logged in

2. NAVIGATE COMPONENT:
   - Declarative navigation from react-router-dom
   - replace prop removes from history
   - User can't go back to protected page

3. LOADING STATE:
   - Prevents flash of redirect
   - Waits for auth check to complete
   - Shows spinner during check

4. USAGE IN APP.JSX:
   <Route 
     path="/users" 
     element={
       <ProtectedRoute>
         <Users />
       </ProtectedRoute>
     } 
   />

5. CHILDREN PROP:
   - Special prop that contains nested elements
   - Here it's the page component (Users, Profile, etc.)
*/
