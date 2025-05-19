const jwt = require("jsonwebtoken");
const { loginUser } = require("../service/authService");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1D" });

    return res.json({ message: "Login berhasil", token });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}

module.exports = { loginController };
