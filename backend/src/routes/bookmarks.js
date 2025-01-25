const express = require("express");
const auth = require("../middlewares/auth");
const {
  addBookmark,
  removeBookmark,
  getAllBookmarks,
} = require("../controllers/bookmarkController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: API for managing bookmarks
 */

/**
 * @swagger
 * /api/bookmarks/{postId}:
 *   post:
 *     summary: Bookmark a post
 *     tags:
 *       - Bookmarks
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to bookmark
 *     responses:
 *       200:
 *         description: Post bookmarked successfully
 *       400:
 *         description: Post already bookmarked
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Remove a bookmark
 *     tags:
 *       - Bookmarks
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to remove bookmark
 *     responses:
 *       200:
 *         description: Bookmark removed successfully
 *       500:
 *         description: Internal server error
 *
 * /api/bookmarks:
 *   get:
 *     summary: Fetch all bookmarks for the logged-in user
 *     tags:
 *       - Bookmarks
 *     responses:
 *       200:
 *         description: Bookmarks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author:
 *                     type: object
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */

// Bookmark a post
router.post("/:postId", auth, addBookmark);

// Remove a bookmark
router.delete("/:postId", auth, removeBookmark);

// Get all bookmarks for the logged-in user
router.get("/", auth, getAllBookmarks);

module.exports = router;
