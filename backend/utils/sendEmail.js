const nodemailer = require("nodemailer");

// sendEmail function for localhost testing
const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create a test account (Ethereal)
    const testAccount = await nodemailer.createTestAccount();

    // Create transporter using Ethereal SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // TLS
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Your App" <no-reply@example.com>`,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
