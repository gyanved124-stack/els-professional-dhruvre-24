// ========================================
// LEVEL 3: Home Page with API Integration
// Learning: Fetching data from REST API, useEffect, useState
// ========================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../services/userService";
import Hero from "../components/Hero";
import FeatureGrid from "../components/FeatureGrid";
import "../styles/Home.css";

/**
 * Home page shows:
 * - Hero section (welcome message)
 * - Feature grid (Browse, Search, Connect)
 * - Stats from API (if logged in)
 *
 * New in Level 3:
 * - Uses AuthContext to check if user is logged in
 * - Fetches real stats from backend API
 * - Shows personalized greeting
 */
function Home() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    alumni: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch stats when component mounts (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch real data from API
      const users = await getAllUsers();

      // Calculate stats based on user_role
      const studentCount = users.filter((u) => {
        const role = u.user_role || "STUDENT";
        return role === "STUDENT";
      }).length;

      const alumniCount = users.filter((u) => {
        const role = u.user_role || "STUDENT";
        return role === "ALUMNI";
      }).length;

      const adminCount = users.filter((u) => {
        const role = u.user_role || "STUDENT";
        return role === "ADMIN";
      }).length;

      setStats({
        totalUsers: users.length,
        students: studentCount,
        alumni: alumniCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback to default values
      setStats({
        totalUsers: 0,
        students: 0,
        alumni: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero
        title="Welcome to College Kit"
        subtitle="Connect with students, explore opportunities, and build your college network"
      />

      {/* Personalized Greeting */}
      {isAuthenticated && user && (
        <section className="welcome-section">
          <div className="container">
            <h2>Welcome back, {user.username}! 👋</h2>
            <p>You're logged in and ready to explore the college community.</p>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {isAuthenticated && (
        <section className="stats-section">
          <div className="container">
            <h2 className="section-title">Community Overview</h2>
            {loading ? (
              <div className="loading">Loading stats...</div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <h3 className="stat-value">{stats.totalUsers}</h3>
                  <p className="stat-label">Total Members</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎓</div>
                  <h3 className="stat-value">{stats.students}</h3>
                  <p className="stat-label">Students</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏆</div>
                  <h3 className="stat-value">{stats.alumni}</h3>
                  <p className="stat-label">Alumni</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Grid - same as Level 1 & 2 */}
      <section className="features-section">
        <div className="container">
          <FeatureGrid />
        </div>
      </section>

      {/* CTA Section - Updated for Level 3 */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="container">
            <h2>Ready to join the community?</h2>
            <p>
              Create an account to browse members, connect with alumni, and
              explore opportunities.
            </p>
            <div className="cta-buttons">
              <Link
                to="/register"
                className="btn btn-primary cta-button primary"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary cta-button secondary"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;

/*
🎓 LEARNING NOTES:

1. CONTEXT API USAGE:
   - useAuth() hook gives us user data and authentication state
   - No need to pass props down multiple levels
   - Can access auth state from any component

2. CONDITIONAL RENDERING:
   - {isAuthenticated && <Component />} - only show if logged in
   - {!isAuthenticated && <Component />} - only show if NOT logged in

3. USEEFFECT WITH DEPENDENCIES:
   - useEffect(() => {}, [isAuthenticated]) runs when isAuthenticated changes
   - Empty array [] means run once on mount
   - Missing array means run on every render (bad!)

4. API INTEGRATION PATTERN:
   - Set loading state before fetch
   - Try/catch for error handling
   - Finally block to stop loading (runs no matter what)

5. PROGRESSION:
   - Level 1: Static HTML
   - Level 2: React components with routing
   - Level 3: Context API + API calls + authentication
*/
