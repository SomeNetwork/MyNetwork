const AuthManager = require('./AuthManager')
module.exports.AuthManager = AuthManager
const Bucket = require('./Bucket')
module.exports.Bucket = Bucket

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

// const API = {
//     func,
//     AuthManager,
// }

// module.exports = API
