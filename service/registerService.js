const pool = require("../config/database");
const bcrypt = require("bcrypt");

async function registerUser(user) {
  const { paket_id, fullname, username, email, password } = user;

  if (!paket_id || !fullname || !username || !email || !password) {
    throw new Error("Data tidak lengkap");
  }

  const [existingUser] = await pool.query(
    "SELECT 1 FROM users WHERE email = ?",
    [email]
  );
  if (existingUser.length > 0) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (paket_id, fullname, username, email, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [paket_id, fullname, username, email, hashedPassword];
  const [result] = await pool.query(query, values);

  return result.insertId;
}

module.exports = { registerUser };
