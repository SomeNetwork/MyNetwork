const transporter = require('./setup')

function send(to, config) {
    const mailOptions = {
        from: 'somenetworktest@gmail.com',
        to,
        ...config,
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            } else {
                resolve(info)
                console.log('Email sent: ' + info.response)
            }
        })
    })
}
const Email = {
    send,
}

module.exports = Email
