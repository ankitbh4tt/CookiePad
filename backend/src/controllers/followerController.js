const User = require("../models/User");

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (targetUser.followers.includes(req.user._id)) {
      return res.status(400).json({ error: "Already following this user" });
    }

    targetUser.followers.push(req.user._id);
    currentUser.following.push(req.params.id);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Followed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    targetUser.followers = targetUser.followers.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    currentUser.following = currentUser.following.filter(
      (userId) => userId.toString() !== req.params.id.toString()
    );

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get followers of a user
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "followers",
      "name profilePicture"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get users followed by a user
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "following",
      "name profilePicture"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
