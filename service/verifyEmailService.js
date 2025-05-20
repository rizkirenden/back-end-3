const UserModel = require("../model/UserModel");

async function verifyEmail(token) {
  const user = await UserModel.findByVerificationToken(token);
  if (!user) {
    throw new Error("Invalid Verification Token");
  }

  const success = await UserModel.verifyEmail(token);
  if (!success) {
    throw new Error("Token sudah digunakan atau tidak valid");
  }

  return true;
}

module.exports = { verifyEmail };
