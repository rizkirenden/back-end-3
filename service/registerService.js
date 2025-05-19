const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");

async function registerUser(user) {
  const { paket_id, fullname, username, email, password } = user;

  if (!paket_id || !fullname || !username || !email || !password) {
    throw new Error("Data tidak lengkap");
  }

  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await UserModel.create({
    paket_id,
    fullname,
    username,
    email,
    hashedPassword,
  });

  return userId;
}

module.exports = { registerUser };
