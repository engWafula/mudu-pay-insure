

import nodemailer from "nodemailer";

export async  function sendAccountEmail(email: string, name: string, password: string) {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use any SMTP provider, like SendGrid or custom SMTP
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail or SMTP email
        pass: process.env.EMAIL_PASS, // Your Gmail or SMTP password
      },
    });
  
  
  
    // Email content
    const mailOptions = {
      from: `${process.env.EMAIL_USER} Worker's Compensation Information Portal`, // Sender's email address
      to: email, // Recipient's email
      subject: 'Account Created Successfully ', // Email subject
      text: `Hello ${name},\n\nYour account has been successfully created. Your login details are as follows:\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and start managing information.\n\nBest regards,\nThe Admin Team`, // Plain text email body
      html: `<p>Hello ${name},</p><p>Your account has been successfully created. Here are your login details:</p><p><b>Email:</b> ${email}<br/><b>Password:</b> ${password}</p><p>Please log in and start managing information.</p><p>Best regards,<br/>The Admin Team</p>`, // HTML email body
    };
  
    // Send the email
    await transporter.sendMail(mailOptions);
  }