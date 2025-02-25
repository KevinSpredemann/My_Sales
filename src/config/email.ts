import nodemailer from 'nodemailer';
import 'dotenv/config';

interface ISendEmail {
  to: string;
  subject: string;
  body: string;
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DATABASE_EMAIL,
    pass: process.env.DATABASE_EMAIL_PASS,
  },
});

export const sendEmail = ({ to, subject, body }: ISendEmail) => {
  const mailOptions = {
    from: process.env.DATABASE_EMAIL,
    to,
    subject,
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
