const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendEmail = () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email
    to: 'abhishek.kaundal0052@gmail.com', // Receiver email
    subject: 'Successful Registration',   // Email subject
    text: 'Congratulations! Your registration was successful.', // Email body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent successfully:', info.response);
  });
};

module.exports = sendEmail;