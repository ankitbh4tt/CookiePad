const express = require("express");
const auth = require("../middlewares/auth");
const {
  sendMessage,
  getConversations,
  getMessagesWithUser,
  markMessagesAsRead,
} = require("../controllers/messageController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing messages and conversations
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: ID of the user receiving the message
 *                 example: "678e1ce0d8b282573b43f273"
 *               content:
 *                 type: string
 *                 description: Message content
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully"
 *                 data:
 *                   $ref: "#/components/schemas/Message"
 *       400:
 *         description: Message content is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/conversations:
 *   get:
 *     summary: Get conversations
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       profilePicture:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                   lastMessage:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                         example: "Hello!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{userId}:
 *   get:
 *     summary: Get messages with a specific user
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to fetch messages with
 *     responses:
 *       200:
 *         description: List of messages with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Message"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{userId}/read:
 *   put:
 *     summary: Mark messages as read
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose messages are being marked as read
 *     responses:
 *       200:
 *         description: Messages marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Messages marked as read"
 *       500:
 *         description: Internal server error
 */

// Send a message
router.post("/", auth, sendMessage);

// Get conversations
router.get("/conversations", auth, getConversations);

// Get messages with a specific user
router.get("/:userId", auth, getMessagesWithUser);

// Mark messages as read
router.put("/:userId/read", auth, markMessagesAsRead);

module.exports = router;
