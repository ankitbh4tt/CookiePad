const mongoose = require("mongoose");
const Post = require("../models/Post");

// Search posts by title, tags, or author
exports.searchPosts = async (req, res) => {
  try {
    const { query, tags, author } = req.query;

    let filter = {};

    // Search by title or content
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search in title
        { content: { $regex: query, $options: "i" } }, // Case-insensitive search in content
      ];
    }

    // Search by tags
    if (tags) {
      filter.tags = { $in: tags.split(",") }; // Match any of the provided tags
    }

    // Search by author
    if (author) {
      if (mongoose.isValidObjectId(author)) {
        filter.author = new mongoose.Types.ObjectId(author); // Properly convert to ObjectId
      } else {
        return res.status(400).json({ error: "Invalid author ID format" });
      }
    }

    const posts = await Post.find(filter)
      .populate("author", "name profilePicture") // Populate author details
      .sort({ createdAt: -1 }); // Sort by newest posts first

    res.json(posts);
  } catch (err) {
    console.error("Error in searchPosts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get trending tags
exports.getTrendingTags = async (req, res) => {
  try {
    const trendingTags = await Post.aggregate([
      { $unwind: "$tags" }, // Break each tag into individual entries
      { $group: { _id: "$tags", count: { $sum: 1 } } }, // Count occurrences of each tag
      { $sort: { count: -1 } }, // Sort by count descending
      { $limit: 10 }, // Limit to top 10 trending tags
    ]);

    res.json(
      trendingTags.map((tag) => ({
        tag: tag._id,
        count: tag.count,
      }))
    );
  } catch (err) {
    console.error("Error in getTrendingTags:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
