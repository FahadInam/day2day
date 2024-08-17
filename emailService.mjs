// emailService.mjs

import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the appropriate service, e.g., 'gmail'
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: "t83509011@gmail.com", // Your email address from .env
    pass: "wrsb llgb wofx psso", // Your email password or app-specific password
  },
  tls: {
    rejectUnauthorized: true,
  },
});

/**
 * Sends an email using the configured transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 */
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "t83509011@gmail.com", // Sender address
      to: "fahadinam4@gmail.com", // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
