const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, html, text }) => {
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });
  return info;
};

module.exports = { sendMail };
