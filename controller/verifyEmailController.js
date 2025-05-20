const { verifyEmail } = require("../service/verifyEmailService");

async function verifyEmailController(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token diperlukan" });
    }

    await verifyEmail(token);

    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Invalid Verification Token" });
  }
}

module.exports = { verifyEmailController };
