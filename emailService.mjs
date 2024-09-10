// emailService.mjs

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
 * Sends an email using the configured transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} name - The name of the person requesting the quotation.
 * @param {string} email - The email of the person requesting the quotation.
 * @param {string} phone - The phone number of the person.
 * @param {string} deliverycity - Delivery city.
 * @param {string} departurecity - City of departure.
 * @param {string} ftype - Freight type.
 * @param {string} weight - Weight.
 * @param {string} height - Height.
 * @param {string} width - Width.
 * @param {string} length - Length.
 * @param {boolean} deliverytype - Is the delivery fragile?
 * @param {boolean} deliveryexpress - Is express delivery required?
 * @param {boolean} optname - Is packaging required?
 */
export const sendEmail = async (
  to,
  subject,
  name,
  email,
  phone,
  deliverycity,
  departurecity,
  ftype,
  weight,
  height,
  width,
  length,
  deliverytype,
  deliveryexpress,
  optname
) => {
  try {
    // Construct the HTML content
    const htmlContent = `
      <h1>Quotation Request Details</h1>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <th style="text-align:left; padding: 8px; border-bottom: 1px solid #ddd;">Field</th>
          <th style="text-align:left; padding: 8px; border-bottom: 1px solid #ddd;">Details</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Phone</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Delivery City</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${deliverycity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">City of Departure</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${departurecity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Freight Type</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${ftype}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Weight</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${weight}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Height</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${height}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Width</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${width}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Length</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${length}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Fragile</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            deliverytype ? "Yes" : "No"
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Express Delivery</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            deliveryexpress ? "Yes" : "No"
          }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Packaging</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
            optname ? "Yes" : "No"
          }</td>
        </tr>
      </table>
    `;

    const mailOptions = {
      from: '"Quotation Request" <quotation@day2daylogistics.co.uk>',
      to: "quotation@day2daylogistics.co.uk", // List of recipients
      subject: subject, // Subject line
      html: htmlContent, // Use the HTML content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
