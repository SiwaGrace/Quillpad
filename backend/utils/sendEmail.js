const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const createTransporter = async () => {
  console.log("--- Initializing Transporter ---");
  console.log("Using Ethereal (Nodemailer Test) Mode");

  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = await createTransporter();

    console.log(`Attempting to send email to: ${to}...`);

    const info = await transporter.sendMail({
      from: `"Quillpad" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Message sent successfully!");
    console.log("Message ID:", info.messageId);

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return info;
  } catch (error) {
    console.error("❌ EMAIL SERVICE CRITICAL ERROR:", error.message);
    // Log the whole error object to see SMTP codes (e.g., 535 Authentication failed)
    console.dir(error);
    throw error;
  }
};

module.exports = sendEmail;
