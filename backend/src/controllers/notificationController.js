const Notification = require("../models/Notification");

exports.fetchNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .populate("sender", "name profilePicture")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    // Emit a socket event to notify the user that new notifications are fetched
    req.app
      .get("io")
      .to(req.user._id.toString())
      .emit("notifications", notifications);

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Emit socket event when notification is marked as read
    req.app
      .get("io")
      .to(req.user._id.toString())
      .emit("notification-read", notification);

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
