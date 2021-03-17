import nodemailer from 'nodemailer';

let mailConfig;

if (process.env.NODE_ENV === 'production') {
  // all emails are delivered to destination
  mailConfig = 0
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: !process.env.MAIL_DEBUG,
    auth: null,
    debug: process.env.MAIL_DEBUG, // show debug output
    logger: true // log information in console
  };
}

// const transporter = nodemailer.createTransport(mailConfig);

// export default transporter;
