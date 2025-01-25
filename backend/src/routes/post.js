const express = require("express");
const auth = require("../middlewares/auth");
const multer = require("multer");
const {
  createPost,
  getPosts,
  getSinglePost,
  getTrendingPosts,
  getUserPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Post"
 *               content:
 *                 type: string
 *                 example: "This is the content of my first post."
 *               tags:
 *                 type: string
 *                 example: "tag1,tag2,tag3"
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post created successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "My First Post"
 *                     content:
 *                       type: string
 *                       example: "This is the content of my first post."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     files:
 *                       type: array
 *                       items:
 *                         type: string
 *                     author:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *     400:
 *       description: Validation error or invalid file type
 *     500:
 *       description: Internal server error
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Fetch all posts
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "My First Post"
 *                       content:
 *                         type: string
 *                         example: "Post content"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       author:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Fetch a single post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/trending:
 *   get:
 *     summary: Fetch trending posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of trending posts
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/user/{id}:
 *   get:
 *     summary: Fetch posts by a specific user
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of posts by the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               content:
 *                 type: string
 *                 example: "Updated Content"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

// Routes
router.post("/", auth, upload.array("files", 3), createPost);
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.get("/trending", getTrendingPosts);
router.get("/user/:id", getUserPosts);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
