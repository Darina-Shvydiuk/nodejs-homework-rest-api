import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const { PORT, SENDGRID_USER_EMAIL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export const emailSender = async (email, verificationToken) => {
    const msg = {
        to: email,
        from: SENDGRID_USER_EMAIL,
        subject: 'Email verification',
        text: 'Please, confirm your email address',
        html: `<strong>Please, confirm your email address POST http://localhost:${PORT}/api/users/verify/${verificationToken}</strong>`,
    };

    await sgMail.send(msg);
    return true;
};