const express = require("express");
const auth = require("../middlewares/auth");
const {
  createChallenge,
  getActiveChallenges,
  joinChallenge,
  submitContribution,
} = require("../controllers/challengeController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Challenges
 *   description: API for managing challenges
 */

/**
 * @swagger
 * /api/challenges:
 *   post:
 *     summary: Create a new challenge
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               theme:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             example:
 *               title: "Photography Challenge"
 *               description: "Capture your best sunset photo!"
 *               theme: "Sunsets"
 *               deadline: "2025-01-31T23:59:59Z"
 *     responses:
 *       201:
 *         description: Challenge created successfully
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Fetch all active challenges
 *     tags:
 *       - Challenges
 *     responses:
 *       200:
 *         description: List of active challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   theme:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   creator:
 *                     type: object
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/challenges/{id}/join:
 *   post:
 *     summary: Join a challenge
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the challenge to join
 *     responses:
 *       200:
 *         description: Successfully joined the challenge
 *       400:
 *         description: Already joined this challenge
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/challenges/{id}/submit:
 *   post:
 *     summary: Submit a contribution to a challenge
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the challenge to submit to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: "This is my contribution to the challenge!"
 *     responses:
 *       200:
 *         description: Submission added successfully
 *       403:
 *         description: Not part of this challenge
 *       404:
 *         description: Challenge not found
 *       500:
 *         description: Internal server error
 */

// Create a Challenge
router.post("/", auth, createChallenge);

// Fetch Active Challenges
router.get("/", getActiveChallenges);

// Join a Challenge
router.post("/:id/join", auth, joinChallenge);

// Submit a Contribution
router.post("/:id/submit", auth, submitContribution);

module.exports = router;
