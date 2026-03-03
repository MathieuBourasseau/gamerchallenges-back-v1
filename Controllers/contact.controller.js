import nodemailer from 'nodemailer';

// Create transporter to specify to nodemailer which service will be used and how to connect with it

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const contactController = {

    // Method to send message from contact
    sendMessage(req, res) {

        // Extract data from front 
        const { name, email, message } = req.body;
        
    }

}