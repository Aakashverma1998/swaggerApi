var nodemailer = require('nodemailer');
var dotenv = require("dotenv").config()
var smtpTransport = require('nodemailer-smtp-transport');

let EMAIL = process.env.email;
let PASSWORD = process.env.password;

const transport = smtpTransport({
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
})


module.exports.sendMail = async (objBody) => {
    try {
        let transporter = nodemailer.createTransport(
            transport
        );
        var mailOptions = {
            from: EMAIL,
            to: objBody.email,
            subject: objBody.subject,
            html: objBody.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent to : ' + mailOptions.to + ` ` + info.response);
            }
        });
        transporter.close()
    } catch (err) {
        console.error(err)
        throw err;
  }
}   




