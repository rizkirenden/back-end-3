// UserModel.js
const pool = require("../config/database");

const UserModel = {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  async findByVerificationToken(token) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE verification_token = ?",
      [token]
    );
    return rows[0];
  },

  async create({
    paket_id,
    fullname,
    username,
    email,
    hashedPassword,
    verificationToken,
  }) {
    const query = `
      INSERT INTO users (paket_id, fullname, username, email, password, verification_token, is_verified)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `;
    const values = [
      paket_id,
      fullname,
      username,
      email,
      hashedPassword,
      verificationToken,
    ];
    const [result] = await pool.query(query, values);
    return result.insertId;
  },

  async verifyEmail(token) {
    const [result] = await pool.query(
      "UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?",
      [token]
    );
    return result.affectedRows > 0;
  },
};

module.exports = UserModel;
