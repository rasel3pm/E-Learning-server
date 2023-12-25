const SendEmailUtility = require("../utility/mailSend2");
const nodemailer = require("nodemailer");
exports.sendEmail = async (req, res) => {
  try {
    const { recipients, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
      host: "mail.teamrabbil.com",
      port: 25,
      secure: false,
      auth: {
        user: "info@teamrabbil.com",
        pass: "~sR4[bhaC[Qs",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "E-Learning Platform <info@teamrabbil.com>",
      to: recipients,
      subject: subject,
      text: text,
    };
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
