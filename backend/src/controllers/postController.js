const Post = require("../models/Post");
const User = require("../models/User");
const BADGES = require("../constant");

// Create a Post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const filePaths = req.files?.map((file) => file.path);

    const post = new Post({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(","),
      author: req.user._id,
      files: filePaths,
    });

    await post.save();

    // Check and award "First Post" badge
    const user = await User.findById(req.user._id);
    const postCount = await Post.countDocuments({ author: req.user._id });

    if (postCount === 1 && !user.badges.includes(BADGES.FIRST_POST)) {
      user.badges.push(BADGES.FIRST_POST);
      await user.save();
    }

    res.json({ message: "Post created successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

// Fetch Posts with Pagination
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Post.countDocuments();

    res.json({ posts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch a Single Post and Increment Views
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author", "name profilePicture");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch Trending Posts
exports.getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name profilePicture")
      .sort({ likes: -1, views: -1, createdAt: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch Posts by a Specific User
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { title, content, tags: tags ? tags.split(",") : [] },
      { new: true }
    );

    if (!post) {
      return res
        .status(403)
        .json({ error: "Not authorized or post not found" });
    }

    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      return res
        .status(403)
        .json({ error: "Not authorized or post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
