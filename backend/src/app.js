const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const setupSwaggerDocs = require("./swagger");
const socketMiddleware = require("./middlewares/socketMiddleware");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // You can adjust this in production for specific domains
    methods: ["GET", "POST"],
  },
});

// Listen for Socket.IO connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Emit events when necessary, for example:
  socket.on("send_message", (data) => {
    io.to(data.receiverId).emit("receive_message", data);
  });

  socket.on("send_notification", (data) => {
    io.to(data.receiverId).emit("receive_notification", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Setup Swagger Docs
setupSwaggerDocs(app);
app.use(express.json());
app.use(socketMiddleware);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/likes", require("./routes/likes"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/followers", require("./routes/followers"));
app.use("/api/drafts", require("./routes/drafts"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/notifications", require("./routes/notification"));
app.use("/api/bookmarks", require("./routes/bookmarks"));
app.use("/api/search", require("./routes/search"));
app.use("/api/badges", require("./routes/badge"));
app.use("/api/challenges", require("./routes/challenge"));
app.use("/api/messages", require("./routes/message"));

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = server; // Export server for Socket.IO to use
