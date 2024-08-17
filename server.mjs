import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { sendEmail } from "./emailService.mjs";
import signupRouter from "./signup.mjs";
import signinRouter from "./signin.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "AIzaSyBFl_RbbAYl8WeodWJppLRJOcV1PFXvnxw";

app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);

// Route to handle Google Places API search
app.post("/api/search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching data from Google Places API" });
  }
});

// Route to handle email sending
app.post("/api/send-email", async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    deliverycity,
    departurecity,
    ftype,
    incoterms,
    weight,
    height,
    width,
    length,
    deliverytype,
    deliveryexpress,
    optname,
  } = req.body;

  // Validate required fields
  if (!email || !subject || !name) {
    return res
      .status(400)
      .json({ error: "Email, Subject, and Name are required" });
  }

  // Construct the email text using the form data
  const text = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Delivery City: ${deliverycity}
    City of Departure: ${departurecity}
    Freight Type: ${ftype}
    Incoterms: ${incoterms}
    Weight: ${weight}
    Height: ${height}
    Width: ${width}
    Length: ${length}
    Delivery Type: ${deliverytype ? "Fragile" : "Regular"}
    Express Delivery: ${deliveryexpress ? "Yes" : "No"}
    Packaging: ${optname}
  `;

  try {
    await sendEmail(email, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error sending email", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
