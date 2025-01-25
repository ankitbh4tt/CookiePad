const express = require("express");
const auth = require("../middlewares/auth");
const {
  fetchNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing user notifications
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Fetch user notifications
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "678e1234d8b282573b43f273"
 *                   type:
 *                     type: string
 *                     example: "comment"
 *                   user:
 *                     type: string
 *                     example: "678e1ce0d8b282573b43f273"
 *                   sender:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       profilePicture:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                   post:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "My First Post"
 *                   read:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-20T12:00:00.000Z"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to mark as read
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read"
 *                 notification:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "678e1234d8b282573b43f273"
 *                     type:
 *                       type: string
 *                       example: "comment"
 *                     user:
 *                       type: string
 *                       example: "678e1ce0d8b282573b43f273"
 *                     read:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-20T12:00:00.000Z"
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

// Fetch Notifications
router.get("/", auth, fetchNotifications);

// Mark Notification as Read
router.put("/:id/read", auth, markNotificationAsRead);

module.exports = router;
