import nodemailer from "nodemailer";

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  host: "smtp.ionos.co.uk", // IONOS SMTP server
  port: 587, // TLS port for secure connections
  secure: false, // Use false for STARTTLS (which is commonly used with port 587)
  auth: {
    user: "quotation@day2daylogistics.co.uk", // Your IONOS email address
    pass: "Markettingg!568", // Your IONOS email password
  },
  tls: {
    rejectUnauthorized: true, // Reject unauthorized certificates
  },
});

/**
 * Sends a contact form email using the configured transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} emailContent - The plain text body of the email.
 * @param {string} senderEmail - The sender's email address.
 */
export const sendContactEmail = async (
  to,
  subject,
  emailContent,
  senderEmail
) => {
  try {
    const mailOptions = {
      from: '"Contact Request" <quotation@day2daylogistics.co.uk>',
      to: to, // List of recipients
      subject: subject, // Subject line
      text: emailContent, // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent:", info.response);
  } catch (error) {
    console.error("Error sending contact email:", error);
  }
};
