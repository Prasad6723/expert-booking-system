const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Expert = require("./models/Expert");
const Booking = require("./models/Booking");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* =======================
   EXPERT APIs
======================= */
app.get("/experts", async (req, res) => {
  const { search = "", category = "", page = 1, limit = 5 } = req.query;

  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;

  const experts = await Expert.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Expert.countDocuments(query);

  res.json({
    experts,
    totalPages: Math.ceil(total / limit),
  });
});

app.get("/experts/:id", async (req, res) => {
  const expert = await Expert.findById(req.params.id);
  res.json(expert);
});

/* =======================
   BOOKING APIs
======================= */

// CREATE BOOKING (double booking prevent)
app.post("/bookings", async (req, res) => {
  const { expertId, date, time } = req.body;

  const exists = await Booking.findOne({ expertId, date, time });
  if (exists) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  await Booking.create(req.body);
  res.json({ message: "Booking successful" });
});

// GET BOOKINGS BY EMAIL
app.get("/bookings", async (req, res) => {
  const { email } = req.query;
  const bookings = await Booking.find({ email });
  res.json(bookings);
});

// GET BOOKINGS BY EXPERT (for polling)
app.get("/bookings/expert/:expertId", async (req, res) => {
  const bookings = await Booking.find({ expertId: req.params.expertId });
  res.json(bookings);
});

// UPDATE BOOKING STATUS
app.patch("/bookings/:id/status", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });
  res.json({ message: "Status updated" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});