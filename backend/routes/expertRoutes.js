const express = require("express");
const router = express.Router();
const Expert = require("../models/Expert");

// GET ALL EXPERTS
router.get("/", async (req, res) => {
  try {
    console.log("🔥 FRONTEND SE /experts HIT AAYA");
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch experts" });
  }
});

// GET SINGLE EXPERT BY ID
router.get("/:id", async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    res.json(expert);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expert" });
  }
});

module.exports = router;
