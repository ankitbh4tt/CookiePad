const User = require("../models/User");
const Post = require("../models/Post");

// Bookmark a post
exports.addBookmark = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(req.user._id);
    if (user.bookmarks.includes(req.params.postId)) {
      return res.status(400).json({ error: "Post already bookmarked" });
    }

    user.bookmarks.push(req.params.postId);
    await user.save();

    res.json({ message: "Post bookmarked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove a bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== req.params.postId
    );
    await user.save();

    res.json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all bookmarks for the logged-in user
exports.getAllBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "bookmarks",
      "title content author createdAt"
    );

    res.json(user.bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
