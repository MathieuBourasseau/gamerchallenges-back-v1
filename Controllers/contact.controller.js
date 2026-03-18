import nodemailer from "nodemailer";
import "dotenv/config";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code";

// Create transporter to specify to nodemailer which service will be used and how to connect with it

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Adress selected to handle mail sent/received
    pass: process.env.EMAIL_PASS, // Password to authorize the connection to the mail provider
  },
});

export const contactController = {
  // Method to send message from contact
  async sendMessage(req, res) {
    // Extract data from front
    const { name, email, message } = req.body;

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // ID sent to gmail to authorize the connection
      to: process.env.EMAIL_USER, // Adress where the message will be sent
      replyTo: email, // User adress
      subject: `Nouveau message de ${name} - GamerChallenges`,
      html: `
                    <h2>Nouveau contact via le formulaire</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Message :</strong></p>
                    <p style="border-left: 3px solid #ccc; padding-left: 10px;">${message}</p>
                  `,
    };

    try {
      // Send to google all mail options
      await transporter.sendMail(mailOptions);
      return res
        .status(httpStatusCodes.OK)
        .json({ message: "Votre message a été envoyé avec succès." });
    } catch (error) {
      // Return an error to the front if something is wrong
      console.error("Erreur Nodemailer :", error);
      return res
        .status(httpStatusCodes.SERVER_ERROR)
        .json({
          status: httpStatusCodes.SERVER_ERROR,
          error: responseMessages[httpStatusCodes.SERVER_ERROR],
        });
    }
  },
};
