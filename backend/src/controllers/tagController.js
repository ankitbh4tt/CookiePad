const Post = require("../models/Post");

// Fetch Trending Tags
exports.getTrendingTags = async (req, res) => {
  try {
    const tags = await Post.aggregate([
      { $unwind: "$tags" }, // Decompose the tags array
      { $group: { _id: "$tags", count: { $sum: 1 } } }, // Group by tag and count
      { $sort: { count: -1 } }, // Sort by count descending
      { $limit: 10 }, // Limit to top 10 tags
    ]);

    res.json(tags);
  } catch (err) {
    console.error("Error fetching trending tags:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
