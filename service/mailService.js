const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "yourpassword",
    },
  });

  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Aplikasi Anda" <youremail@gmail.com>',
    to: email,
    subject: "Verifikasi Email",
    html: `<p>Silakan klik link berikut untuk verifikasi email:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });
}

module.exports = sendVerificationEmail;
