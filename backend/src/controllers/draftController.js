const Post = require("../models/Post");

// Save a new draft
exports.saveDraft = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const draft = new Post({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      author: req.user._id,
      status: "draft",
    });

    await draft.save();
    res.status(201).json({ message: "Draft saved successfully", draft });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all drafts for the logged-in user
exports.getAllDrafts = async (req, res) => {
  try {
    const drafts = await Post.find({
      author: req.user._id,
      status: "draft",
    }).sort({ createdAt: -1 });

    res.json({ drafts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a draft
exports.updateDraft = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const draft = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id, status: "draft" },
      { title, content, tags: tags ? tags.split(",") : [] },
      { new: true }
    );

    if (!draft) {
      return res
        .status(404)
        .json({ error: "Draft not found or you are not authorized" });
    }

    res.json({ message: "Draft updated successfully", draft });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Publish a draft
exports.publishDraft = async (req, res) => {
  try {
    const draft = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id, status: "draft" },
      { status: "published" },
      { new: true }
    );

    if (!draft) {
      return res
        .status(404)
        .json({ error: "Draft not found or you are not authorized" });
    }

    res.json({ message: "Draft published successfully", post: draft });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
