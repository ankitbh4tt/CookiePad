const express = require("express");
const {
  searchPosts,
  getTrendingTags,
} = require("../controllers/searchController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search and trending tags related operations
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search posts by title, tags, or author
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Keyword to search in post titles or content
 *         example: "community"
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Comma-separated tags to filter posts
 *         example: "nature,poetry"
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Author ID to filter posts by specific author
 *         example: "678e3337f6ee6ffdc65938aa"
 *     responses:
 *       200:
 *         description: List of posts matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "My First Post"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the post."
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["nature", "poetry"]
 *                   author:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid author ID format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/search/trending-tags:
 *   get:
 *     summary: Get trending tags
 *     tags:
 *       - Search
 *     responses:
 *       200:
 *         description: List of trending tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tag:
 *                     type: string
 *                     example: "nature"
 *                   count:
 *                     type: integer
 *                     example: 25
 *       500:
 *         description: Internal server error
 */

// Routes
router.get("/", searchPosts); // Search posts by title, tags, or author
router.get("/trending-tags", getTrendingTags); // Get trending tags

module.exports = router;
