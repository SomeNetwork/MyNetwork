const CRUD = require('./CRUD')
const { UserModel } = require('../scheme')
class Users extends CRUD {
    constructor() {
        super()
    }
    create(user) {
        return new Promise((resolve, reject) => {
            UserModel.create(user, function (err, user) {
                if (err) {
                    handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, function (err, user) {
                if (err) {
                    handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    findByUsername(username) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) {
                    handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    updateById(id, newDate) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ id }, newDate, function (err, user) {
                if (err) {
                    handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    list(config) {
        return new Promise((resolve, reject) => {
            UserModel.find({ ...config }, function (err, user) {
                if (err) {
                    handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    checkUsernameExists(username) {
        return new Promise((resolve, reject) => {
            UserModel.exists({ username }, function (err, userExists) {
                if (err) reject(err)
                resolve(userExists)
            })
        })
    }
}

module.exports = Users
