// ========================================
// LEVEL 3: Members Page with Real API
// Learning: useEffect, API calls, data fetching, filtering
// ========================================

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../services/userService";
import "../styles/Members.css";

function Members() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user: currentUser } = useAuth();

  // Fetch users from Strapi API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call real API
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users when search or role filter changes
  useEffect(() => {
    let filtered = users;

    // Filter by role (if Strapi user has role field)
    if (roleFilter !== "ALL") {
      filtered = filtered.filter(
        (user) => user.role?.toUpperCase() === roleFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  if (loading) {
    return <div className="loading">Loading members...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="members-page">
      <div className="container">
        <div className="page-header">
          <h1>Member Directory</h1>
          <p>Browse and connect with {users.length} members</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="role-filters">
            <button
              className={
                roleFilter === "ALL" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRoleFilter("ALL")}
            >
              All
            </button>
            <button
              className={
                roleFilter === "STUDENT" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRoleFilter("STUDENT")}
            >
              Students
            </button>
            <button
              className={
                roleFilter === "ALUMNI" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRoleFilter("ALUMNI")}
            >
              Alumni
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="members-grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="member-card">
                <div className="member-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h3>{user.username}</h3>
                <p className="member-email">{user.email}</p>
                <span className={`member-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
                {currentUser?.id !== user.id && (
                  <button className="btn btn-secondary">Connect</button>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No members found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Members;

/*
🎓 LEARNING NOTES:

1. USEEFFECT FOR DATA FETCHING:
   - Runs after component mounts
   - Empty dependency array [] = run once
   - Common pattern for API calls

2. MULTIPLE USEEFFECT:
   - First: Fetch data on mount
   - Second: Filter data when filters change
   - Different dependencies for different purposes

3. DERIVED STATE:
   - filteredUsers derived from users + filters
   - Don't duplicate data in state
   - Re-calculate when dependencies change

4. CONTROLLED INPUTS:
   - searchTerm state controls search input
   - onChange updates state
   - React is source of truth

5. CONDITIONAL RENDERING:
   - {filteredUsers.length > 0 ? (...) : (...)}
   - Show different UI based on state
   - Empty state message

6. ARRAY METHODS:
   - .filter() creates new array
   - .includes() for search
   - .toLowerCase() for case-insensitive search

7. CSS CLASSES:
   - Dynamic class names: `user-badge ${user.role.toLowerCase()}`
   - Active state for filter buttons
   - Conditional styling
*/
