const Booking = require("../models/Booking");

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // real-time update
    req.app.get("io").emit("slotBooked", booking);

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: "Slot already booked or invalid data"
    });
  }
};

// GET /bookings?email=
exports.getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({
      email: req.query.email
    }).populate("expertId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// PATCH /bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ message: "Booking status updated" });
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};