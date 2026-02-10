const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const createTransporter = async () => {
  console.log("--- Initializing Transporter ---");
  console.log("Current NODE_ENV:", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    console.log("Using Ethereal (Development) Mode");
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  }

  console.log("Using Brevo (Production) Mode");
  console.log("Target Host:", process.env.BREVO_SMTP_HOST);
  console.log("Target User:", process.env.BREVO_SMTP_USER);

  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: parseInt(process.env.BREVO_SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
    // Adding a timeout so it doesn't hang forever
    connectionTimeout: 10000,
    greetingTimeout: 10000,
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

    if (process.env.NODE_ENV === "development") {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error("❌ EMAIL SERVICE CRITICAL ERROR:", error.message);
    // Log the whole error object to see SMTP codes (e.g., 535 Authentication failed)
    console.dir(error);
    throw error;
  }
};

module.exports = sendEmail;
