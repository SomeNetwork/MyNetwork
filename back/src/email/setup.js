const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'gmail',
        auth: {
            user: 'somenetworktest@gmail.com',
            pass: 'somenetworktest111',
        },
    })
)

// const mailOptions = {
//     from: 'somenetworktest@gmail.com',
//     to: 'tiger0776770@gmail.com',
//     subject: 'Some Network',
//     text:
//         'To confirm your account, follow the link "http://dev.localhost:3000/auth/emailconfirmation?id=6065dc153cbf33cc10199fcc&code=code123"',
// }

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('Email sent: ' + info.response)
//     }
// })

module.exports = transporter
