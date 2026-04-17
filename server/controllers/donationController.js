const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
  try {
    const data = new Donation({
      ...req.body,
      paymentMethod: req.body.payment
    });

    await data.save();

    res.json({
      success: true,
      message: "Donation saved successfully"
    });

  } catch (err) {
    console.error("Donation Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save donation"
    });
  }
};