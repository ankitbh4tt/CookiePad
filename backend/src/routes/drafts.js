const express = require("express");
const auth = require("../middlewares/auth");
const {
  saveDraft,
  getAllDrafts,
  updateDraft,
  publishDraft,
} = require("../controllers/draftController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Drafts
 *   description: API for managing drafts
 */

/**
 * @swagger
 * /api/drafts:
 *   post:
 *     summary: Save a new draft
 *     tags:
 *       - Drafts
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
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               title: "My Draft Title"
 *               content: "This is the content of my draft."
 *               tags: ["tag1", "tag2"]
 *     responses:
 *       201:
 *         description: Draft saved successfully
 *       400:
 *         description: Title and content are required
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all drafts for the logged-in user
 *     tags:
 *       - Drafts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drafts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drafts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/drafts/{id}:
 *   put:
 *     summary: Update a draft
 *     tags:
 *       - Drafts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Draft ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               title: "Updated Draft Title"
 *               content: "Updated content for the draft."
 *               tags: ["updatedTag1", "updatedTag2"]
 *     responses:
 *       200:
 *         description: Draft updated successfully
 *       400:
 *         description: Title and content are required
 *       404:
 *         description: Draft not found or unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/drafts/{id}/publish:
 *   post:
 *     summary: Publish a draft
 *     tags:
 *       - Drafts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Draft ID
 *     responses:
 *       200:
 *         description: Draft published successfully
 *       404:
 *         description: Draft not found or unauthorized
 *       500:
 *         description: Internal server error
 */

// Save a new draft
router.post("/drafts", auth, saveDraft);

// Get all drafts for the logged-in user
router.get("/drafts", auth, getAllDrafts);

// Update a draft
router.put("/drafts/:id", auth, updateDraft);

// Publish a draft
router.post("/drafts/:id/publish", auth, publishDraft);

module.exports = router;
