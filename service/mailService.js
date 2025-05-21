const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rizkirenden@gmail.com",
      pass: "vnes dbgd peri bicg",
    },
  });

  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Aplikasi Anda" <rizkirenden@gmail.com>',
    to: email,
    subject: "Verifikasi Email",
    html: `<p>Silakan klik link berikut untuk verifikasi email:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });
}

module.exports = sendVerificationEmail;
