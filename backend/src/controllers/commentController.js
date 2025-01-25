const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

// Add a Comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = new Comment({
      content,
      author: req.user._id,
      post: req.params.postId,
    });

    await comment.save();

    // Create a notification for the post author
    if (req.user._id.toString() !== post.author.toString()) {
      await Notification.create({
        user: post.author, // Notify the post's author
        type: "comment",
        sender: req.user._id,
        post: post._id,
      });
    }

    res.json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch Comments for a Post
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
