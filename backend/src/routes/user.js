const express = require("express");
const auth = require("../middlewares/auth");
const {
  getUserProfile,
  toggleFollow,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile and follow operations
 */

/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "678e3337f6ee6ffdc65938aa"
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "678e3337f6ee6ffdc65938aa"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "678e3337f6ee6ffdc65938ab"
 *                       name:
 *                         type: string
 *                         example: "Jane Doe"
 *                 following:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "678e3337f6ee6ffdc65938ac"
 *                       name:
 *                         type: string
 *                         example: "Alice Smith"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/follow/{id}:
 *   post:
 *     summary: Follow/unfollow a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "678e3337f6ee6ffdc65938aa"
 *         description: User ID to follow or unfollow
 *     responses:
 *       200:
 *         description: Follow state updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               bio:
 *                 type: string
 *                 example: "Software developer and open-source enthusiast."
 *               profilePicture:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Coding", "Traveling", "Reading"]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

// Get user profile
router.get("/profile/:id", getUserProfile);

// Follow/unfollow user
router.post("/follow/:id", auth, toggleFollow);

// Update User Profile
router.put("/profile", auth, updateUserProfile);

module.exports = router;
