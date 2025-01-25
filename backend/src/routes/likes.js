const express = require("express");
const auth = require("../middlewares/auth");
const { likePost, unlikePost } = require("../controllers/likeController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API for liking and unliking posts
 */

/**
 * @swagger
 * /api/likes/{id}/like:
 *   post:
 *     summary: Like a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to like
 *     responses:
 *       200:
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post liked successfully"
 *                 likes:
 *                   type: number
 *       400:
 *         description: Post already liked
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Unlike a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to unlike
 *     responses:
 *       200:
 *         description: Post unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post unliked successfully"
 *                 likes:
 *                   type: number
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

// Like a post
router.post("/:id/like", auth, likePost);

// Unlike a post
router.delete("/:id/like", auth, unlikePost);

module.exports = router;
