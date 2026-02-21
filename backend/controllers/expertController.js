const Expert = require("../models/Expert");

// GET /experts
exports.getExperts = async (req, res) => {
  try {
    const { page = 1, category, search } = req.query;
    const limit = 5;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(experts);
  } catch (error) {
  console.error("GET /experts ERROR:", error);
  res.status(500).json({
    message: "Failed to fetch experts",
    error: error.message
  });
}
};

// GET /experts/:id
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    res.json(expert);
  } catch (error) {
    res.status(404).json({ message: "Expert not found" });
  }
};