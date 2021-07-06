const AuthManager = require('./AuthManager')
const Bucket = require('./Bucket')
const DB = require('./db')
const Email = require('./email')

function getCookie(cookies, name) {
    let matches = cookies?.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}
module.exports.getCookie = getCookie
module.exports.AuthManager = AuthManager
module.exports.Bucket = Bucket
module.exports.DB = DB
module.exports.Email = Email
