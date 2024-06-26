import nodemailer from 'nodemailer';

// Replace these values with your actual Gmail username and password
const GMAIL_USER = 'receivermail135@gmail.com';
const GMAIL_PASSWORD = 'Aarush135';

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
}
