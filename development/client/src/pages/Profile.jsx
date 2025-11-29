// ========================================
// LEVEL 3: Profile Page
// Learning: Form editing, state updates, user data management
// ========================================

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/userService";
import "../styles/Profile.css";

function Profile() {
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    mobile_number: user?.mobile_number || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    start_date: user?.start_date || "",
    end_date: user?.end_date || "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Prepare data - convert empty strings to null for date fields
      const dataToSubmit = {
        ...formData,
        dob: formData.dob || null,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      // Call API to update user profile
      const updatedUser = await updateUser(user.id, dataToSubmit);

      // Update context with new user data
      setUser(updatedUser);

      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      mobile_number: user?.mobile_number || "",
      gender: user?.gender || "",
      dob: user?.dob || "",
      start_date: user?.start_date || "",
      end_date: user?.end_date || "",
    });
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
            <span className="role-badge">{user?.role || "STUDENT"}</span>
          </div>
        </div>

        {saved && (
          <div className="success-message">✓ Profile updated successfully!</div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="profile-card">
          <div className="card-header">
            <h2>Profile Details</h2>
            {!isEditing && (
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>User Status</label>
                <input
                  type="text"
                  value={user?.user_status || "N/A"}
                  disabled
                  className="readonly-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <p>
            Once you logout, you'll need to login again to access your account.
          </p>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

/*
🎓 LEARNING NOTES:

1. EDIT MODE TOGGLE:
   - isEditing state controls form editing
   - Same form for view and edit modes
   - disabled={!isEditing} on inputs

2. FORM STATE MANAGEMENT:
   - formData holds all profile fields
   - handleChange updates any field
   - handleCancel resets to original values

3. OPTIMISTIC UPDATES:
   - Show success message immediately
   - In real app, would await API response
   - setTimeout to auto-hide message

4. TEXTAREA:
   - Multi-line input for bio
   - rows prop controls height
   - Works like input with value/onChange

5. CONDITIONAL BUTTONS:
   - Show different buttons based on isEditing
   - Edit button when viewing
   - Save/Cancel when editing

6. FORM ACTIONS:
   - type="submit" for Save (triggers onSubmit)
   - type="button" for Cancel (prevents submit)
   - Prevents accidental form submission
*/
