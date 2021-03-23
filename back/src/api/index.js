const AuthManager = require('./AuthManager')
function func(a) {
    console.log('api func :>> ', a)
}

module.exports = {
    func,
    AuthManager: new AuthManager(),
}
