const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient
  type: { type: String, required: true }, // e.g., "like", "comment", "follow"
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who triggered the notification
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Optional, for "like" or "comment"
  read: { type: Boolean, default: false }, // Whether the user has read the notification
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
