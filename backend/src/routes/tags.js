const express = require("express");
const { getTrendingTags } = require("../controllers/tagController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operations related to tags
 */

/**
 * @swagger
 * /api/tags/trending:
 *   get:
 *     summary: Fetch trending tags
 *     tags:
 *       - Tags
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
 *                   _id:
 *                     type: string
 *                     example: "nature"
 *                   count:
 *                     type: integer
 *                     example: 25
 *       500:
 *         description: Internal server error
 */

// Route for fetching trending tags
router.get("/trending", getTrendingTags);

module.exports = router;
