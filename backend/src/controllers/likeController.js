const Post = require("../models/Post");
const User = require("../models/User");
const BADGES = require("../constant");

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ error: "You already liked this post" });
    }

    post.likes.push(req.user._id);
    await post.save();

    // Check and award "10 Likes" badge
    const user = await User.findById(post.author);
    if (post.likes.length >= 10 && !user.badges.includes(BADGES.TEN_LIKES)) {
      user.badges.push(BADGES.TEN_LIKES);
      await user.save();
    }

    res.json({ message: "Post liked successfully", likes: post.likes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes = post.likes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await post.save();

    res.json({
      message: "Post unliked successfully",
      likes: post.likes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
