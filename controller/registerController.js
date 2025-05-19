const { registerUser } = require("../service/registerService");

async function registerUserController(req, res) {
  try {
    const userData = req.body;
    const userId = await registerUser(userData);

    res.status(201).json({
      message: "User berhasil didaftarkan",
      user_id: userId,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { registerUserController };
