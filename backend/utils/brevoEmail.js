const brevo = require("@getbrevo/brevo");

// Create API instance
const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `Welcome to Quillpad, ${userName}!`;
    sendSmtpEmail.sender = {
      name: "Quillpad Team",
      email: process.env.BREVO_SENDER_EMAIL,
    };

    sendSmtpEmail.to = [{ email: userEmail, name: userName }];

    sendSmtpEmail.htmlContent = `
      <h1>Welcome ${userName} 🎉</h1>
      <p>Thanks for joining Quillpad.</p>
      <a href="${process.env.FRONTEND_URL}/home">
        Go to dashboard
      </a>
    `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Brevo email sent:", data.body.messageId);
    return data;
  } catch (error) {
    console.error(
      "❌ Brevo email error:",
      error.response?.body || error.message,
    );
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetUrl) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.sender = {
      name: "Quillpad Team",
      email: process.env.BREVO_SENDER_EMAIL,
    };
    sendSmtpEmail.to = [{ email: userEmail, name: userName }];

    sendSmtpEmail.htmlContent = `
      <h1>Password Reset</h1>
      <p>Hello ${userName || "there"},</p>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Brevo reset email sent:", data.body.messageId);
    return data;
  } catch (error) {
    console.error(
      "❌ Brevo reset email error:",
      error.response?.body || error.message,
    );
    throw error;
  }
};

// Test connection
const testBrevoConnection = async () => {
  try {
    const accountApi = new brevo.AccountApi();
    const data = await accountApi.getAccount();
    console.log("✅ Brevo connected. Plan:", data.body.plan[0].type);
    return true;
  } catch (error) {
    console.error("❌ Brevo connection failed:", error.message);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  testBrevoConnection,
};
