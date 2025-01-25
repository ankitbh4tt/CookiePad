const express = require("express");
const auth = require("../middlewares/auth");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followerController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Followers
 *   description: API for managing followers and following relationships
 */

/**
 * @swagger
 * /api/followers/{id}/follow:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to follow
 *     responses:
 *       200:
 *         description: Followed successfully
 *       400:
 *         description: Already following the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Unfollowed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/followers/{id}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags:
 *       - Followers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose followers are to be retrieved
 *     responses:
 *       200:
 *         description: List of followers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   profilePicture:
 *                     type: string
 *                     format: uri
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/followers/{id}/following:
 *   get:
 *     summary: Get users followed by a user
 *     tags:
 *       - Followers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose following list is to be retrieved
 *     responses:
 *       200:
 *         description: List of following users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   profilePicture:
 *                     type: string
 *                     format: uri
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// Follow a user
router.post("/:id/follow", auth, followUser);

// Unfollow a user
router.delete("/:id/follow", auth, unfollowUser);

// Get followers of a user
router.get("/:id/followers", getFollowers);

// Get users followed by a user
router.get("/:id/following", getFollowing);

module.exports = router;
