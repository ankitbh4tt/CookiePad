const express = require("express");
const auth = require("../middlewares/auth");
const {
  getUserBadges,
  getAvailableBadges,
} = require("../controllers/badgeController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Badges
 *   description: API for managing and fetching badges
 */

/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: Fetch all badges for the authenticated user
 *     tags:
 *       - Badges
 *     responses:
 *       200:
 *         description: Badges fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 badges:
 *                   type: array
 *                   description: List of badges for the user
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/badges/available:
 *   get:
 *     summary: Fetch all available badges
 *     tags:
 *       - Badges
 *     responses:
 *       200:
 *         description: Available badges fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 badges:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

// Fetch all badges for the authenticated user
router.get("/", auth, getUserBadges);

// Fetch all available badges
router.get("/available", getAvailableBadges);

module.exports = router;
