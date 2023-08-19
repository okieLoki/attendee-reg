export const htmlContent = (attendee, qrCodeUrl) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Registration Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f7f7f7;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
                color: #333;
            }

            p {
                color: #666;
            }

            img {
                display: block;
                margin: 20px auto;
                max-width: 100%;
                height: auto;
            }

            .footer {
                margin-top: 20px;
                text-align: center;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Thank You for Registering, ${attendee.name}!</h1>
            <p>We are excited to have you at our event.</p>
            <p>Please find below your check-in QR Code:</p>
            <img src="${qrCodeUrl}" alt="QR Code for Check-in" />
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>See you at the event!</p>
        </div>
        <div class="footer">
            This email was sent by GDSC TIET.
        </div>
    </body>
    </html>
`;
