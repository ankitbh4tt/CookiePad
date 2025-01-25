const Post = require("../models/Post");

exports.getPostAnalytics = async (req, res) => {
  try {
    const postId = req.params.id.trim(); // Trim any unexpected characters

    const post = await Post.findById(postId)
      .populate("author", "name profilePicture")
      .populate("comments", "content author createdAt");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const analytics = {
      views: post.views,
      likes: post.likes.length,
      comments: post.comments.length,
    };

    res.json({ post, analytics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.incrementViewCount = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "View count updated", views: post.views });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
