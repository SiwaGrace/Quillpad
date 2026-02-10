const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const createTransporter = async () => {
  // DEVELOPMENT → Ethereal
  if (process.env.NODE_ENV === "development") {
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // PRODUCTION → Brevo
  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST, // smtp-relay.brevo.com
    port: process.env.BREVO_SMTP_PORT, // 587
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER, // your Brevo email
      pass: process.env.BREVO_SMTP_PASS, // API key as SMTP password
    },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Quillpad" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent:", info.messageId);

    if (process.env.NODE_ENV === "development") {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
