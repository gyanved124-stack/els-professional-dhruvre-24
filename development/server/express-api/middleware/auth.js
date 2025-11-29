const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: {
          status: 401,
          name: "UnauthorizedError",
          message: "Missing or invalid authorization header",
          details: {},
        },
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        status: 401,
        name: "UnauthorizedError",
        message: "Invalid or expired token",
        details: {},
      },
    });
  }
};

module.exports = authMiddleware;
