const Challenge = require("../models/Challenge");

// Create a Challenge
exports.createChallenge = async (req, res) => {
  try {
    const { title, description, theme, deadline } = req.body;

    const challenge = new Challenge({
      title,
      description,
      theme,
      creator: req.user._id,
      deadline,
    });

    await challenge.save();
    res
      .status(201)
      .json({ message: "Challenge created successfully", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch Active Challenges
exports.getActiveChallenges = async (req, res) => {
  try {
    const currentDate = new Date();
    const challenges = await Challenge.find({ deadline: { $gte: currentDate } })
      .populate("creator", "name profilePicture")
      .sort({ createdAt: -1 });

    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Join a Challenge
exports.joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    if (challenge.participants.includes(req.user._id)) {
      return res
        .status(400)
        .json({ error: "You have already joined this challenge" });
    }

    challenge.participants.push(req.user._id);
    await challenge.save();

    res.json({ message: "Joined challenge successfully", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Submit a Contribution
exports.submitContribution = async (req, res) => {
  try {
    const { content } = req.body;

    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    if (!challenge.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ error: "You are not part of this challenge" });
    }

    challenge.submissions.push({ participant: req.user._id, content });
    await challenge.save();

    res.json({ message: "Submission added successfully", challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
