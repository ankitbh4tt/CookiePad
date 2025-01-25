const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  bio: { type: String },
  profilePicture: { type: String },
  interests: [{ type: String }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Bookmarked posts
  badges: { type: [String], default: [] }, // Array to store badge names or IDs
});

module.exports = mongoose.model("User", UserSchema);
