const nodemailer = require('nodemailer');

exports.sendEmail = (email, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD
        }
      }); 

      var mailOptions = {
        to: email,
        from: process.env.MAILER_EMAIL,
        subject: subject,
        text: text
        };
    return transporter.sendMail(mailOptions);

}