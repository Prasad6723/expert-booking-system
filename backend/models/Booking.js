const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  expertName: String,
  userName: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  notes: String,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);