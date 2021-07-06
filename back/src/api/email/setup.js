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

module.exports = transporter
