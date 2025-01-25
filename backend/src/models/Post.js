const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  files: [{ type: String }],
  status: { type: String, default: "published" }, // "draft" or "published"
  views: { type: Number, default: 0 }, // Number of views
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Array of comment IDs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
