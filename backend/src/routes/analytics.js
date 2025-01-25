const express = require("express");
const auth = require("../middlewares/auth");
const {
  getPostAnalytics,
  incrementViewCount,
} = require("../controllers/analyticsController");

const router = express.Router();

// Get analytics for a specific post
/**
 * @swagger
 * /api/analytics/posts/{id}:
 *   get:
 *     summary: Get analytics for a specific post
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   description: Post details
 *                 analytics:
 *                   type: object
 *                   description: Analytics data (views, likes, comments)
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/posts/:id", auth, getPostAnalytics);

// Increment views when a post is viewed
/**
 * @swagger
 * /api/analytics/posts/{id}/view:
 *   post:
 *     summary: Increment view count for a post
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 views:
 *                   type: integer
 *                   description: Updated view count
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.post("/posts/:id/view", incrementViewCount);

module.exports = router;
