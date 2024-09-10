import express from "express";
import bodyParser from "body-parser";
import { sendEmail } from "./emailService.mjs";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Construct the email content
  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Message: ${message}
  `;

  try {
    // Send the email using the sendEmail function
    await sendEmail("fahadinam4@gmail.com", subject, emailContent);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
