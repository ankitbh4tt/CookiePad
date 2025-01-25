const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Remove "Bearer " from the token
    const pureToken = token.replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Access denied. User not found." });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = auth;
