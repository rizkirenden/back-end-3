const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../model/UserModel");
const sendVerificationEmail = require("./mailService");

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
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const userId = await UserModel.create({
    paket_id,
    fullname,
    username,
    email,
    hashedPassword,
    verificationToken,
  });

  await sendVerificationEmail(email, verificationToken);

  return userId;
}

module.exports = { registerUser };
