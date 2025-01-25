const User = require("../models/User");
const BADGES = require("../constant");

// Fetch all badges for the authenticated user
exports.getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("badges");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ badges: user.badges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch all available badges
exports.getAvailableBadges = (req, res) => {
  res.json(BADGES);
};
