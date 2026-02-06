import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/env.js';

export const sendVerificationEmail = async (toEmail, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: toEmail,
        subject: 'Email Verification',
        html:`Please verify your email using this link it will expire in 15 minutes
         <a href="http://localhost:5173/auth/verify-email/${token}">Verify Email</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to', toEmail);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Could not send verification email');
    }
}
