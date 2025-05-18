const pool = require("../config/database");

const UserModel = {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  async create({ paket_id, fullname, username, email, hashedPassword }) {
    const query = `
      INSERT INTO users (paket_id, fullname, username, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [paket_id, fullname, username, email, hashedPassword];
    const [result] = await pool.query(query, values);
    return result.insertId;
  },
};

module.exports = UserModel;
