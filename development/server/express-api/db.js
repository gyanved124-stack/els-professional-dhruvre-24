// In-memory database (for development only)
// All sample users have password: 'password123'
let users = [
  {
    id: 1,
    username: "admin",
    email: "admin@college.edu",
    password: "$2a$10$jTGh2BT07IkPqWIcP8SnGuHPfzbiMMwB6QyGS4C6RfdV1QAc0hSyK", // 'password123'
    firstName: "Admin",
    lastName: "User",
    mobile: "1234567890",
    role: "Admin",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    username: "john_doe",
    email: "john@college.edu",
    password: "$2a$10$jTGh2BT07IkPqWIcP8SnGuHPfzbiMMwB6QyGS4C6RfdV1QAc0hSyK",
    firstName: "John",
    lastName: "Doe",
    mobile: "9876543210",
    role: "Student",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    username: "jane_smith",
    email: "jane@college.edu",
    password: "$2a$10$jTGh2BT07IkPqWIcP8SnGuHPfzbiMMwB6QyGS4C6RfdV1QAc0hSyK",
    firstName: "Jane",
    lastName: "Smith",
    mobile: "5551234567",
    role: "Alumni",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let currentId = 4;

const db = {
  // Get all users
  getUsers: (filters = {}) => {
    let filteredUsers = [...users];

    // Filter by role
    if (filters.role) {
      filteredUsers = filteredUsers.filter((u) => u.role === filters.role);
    }

    // Filter by status
    if (filters.status) {
      filteredUsers = filteredUsers.filter((u) => u.status === filters.status);
    }

    // Search by name or email
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.firstName.toLowerCase().includes(searchLower) ||
          u.lastName.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower) ||
          u.username.toLowerCase().includes(searchLower)
      );
    }

    return filteredUsers.map((u) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  },

  // Get user by ID
  getUserById: (id) => {
    const user = users.find((u) => u.id === parseInt(id));
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Get user by email
  getUserByEmail: (email) => {
    return users.find((u) => u.email === email);
  },

  // Get user by username
  getUserByUsername: (username) => {
    return users.find((u) => u.username === username);
  },

  // Create user
  createUser: (userData) => {
    const newUser = {
      id: currentId++,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Update user
  updateUser: (id, updates) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      id: users[index].id, // Ensure ID doesn't change
      password: updates.password || users[index].password, // Keep old password if not updating
      updatedAt: new Date().toISOString(),
    };

    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  },

  // Delete user
  deleteUser: (id) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) return null;

    const deleted = users.splice(index, 1)[0];
    const { password, ...userWithoutPassword } = deleted;
    return userWithoutPassword;
  },

  // Get stats
  getStats: () => {
    return {
      total: users.length,
      byRole: {
        Student: users.filter((u) => u.role === "Student").length,
        Alumni: users.filter((u) => u.role === "Alumni").length,
        Admin: users.filter((u) => u.role === "Admin").length,
      },
      byStatus: {
        Active: users.filter((u) => u.status === "Active").length,
        Inactive: users.filter((u) => u.status === "Inactive").length,
      },
    };
  },
};

module.exports = db;
