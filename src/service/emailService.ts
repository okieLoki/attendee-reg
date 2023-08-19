import 'dotenv/config';
import nodemailer from 'nodemailer';
import { htmlContent } from './emailTemplate';


const sendEmail = async (attendee, checkInURL) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        let qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
            checkInURL
        )}&chs=240x240`;

        await transporter.sendMail({
            from: '"GDSC TIET" <testuddeepta@gmail.com>', 
            to: attendee.email, 
            subject: "Thankyou for registering", 
            text: "",
            html: htmlContent(attendee, qrCodeUrl),
        });

    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;