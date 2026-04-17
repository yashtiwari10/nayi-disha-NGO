const Volunteer = require('../models/Volunteer');

exports.createVolunteer = async (req, res) => {
  try {
    const data = new Volunteer(req.body);
    await data.save();

    res.json({
      success: true,
      message: "Volunteer saved successfully"
    });

  } catch (err) {
    console.error("Volunteer Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save volunteer"
    });
  }
};