const { text } = require("express");
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) create transporter (service that will send the mail like "gmail", "mailtrap")
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
  // 2) define some options (from to )
  const mailOptions = {
    from: "E-Shop App <mahmoudwaell391@gmail.com>",
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  // 3) send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
