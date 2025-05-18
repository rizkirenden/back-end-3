const pool = require("../config/database");
const bcrypt = require("bcrypt");

async function loginUser(email, password) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }

  delete user.password;
  return user;
}

module.exports = { loginUser };
