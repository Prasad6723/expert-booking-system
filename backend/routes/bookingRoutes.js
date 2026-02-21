const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking successful", booking });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }
    res.status(500).json({ message: "Booking failed" });
  }
});

// GET BOOKINGS BY EMAIL
router.get("/", async (req, res) => {
  const { email } = req.query;
  const bookings = await Booking.find({ email }).populate("expert");
  res.json(bookings);
});

// UPDATE STATUS
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(booking);
});

module.exports = router;