const CRUD = require('./CRUD')
const { UserModel } = require('../scheme')
const { v4: uuidv4 } = require('uuid')
const Bucket = require('../../api/Bucket')

class Users extends CRUD {
    constructor() {
        super()
    }
    create(user) {
        return new Promise((resolve, reject) => {
            UserModel.exists(
                { username: user.username },
                function (err, userExists) {
                    if (err) reject(err)
                    resolve(userExists)
                }
            )
        })
            .then((isExist) => {
                if (isExist === true)
                    throw new Error('Username is udeb by other user')
            })
            .then(
                () =>
                    new Promise((resolve, reject) => {
                        UserModel.create(user, function (err, user) {
                            if (err) {
                                // handleError(err)
                                reject(err)
                            }
                            resolve(user)
                        })
                    })
            )
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, function (err, user) {
                if (err) {
                    // handleError(err)
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
                    // handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    async updateByUsername(username, newData) {
        return new Promise(async (resolve, reject) => {
            if (newData.email) {
                newData = {
                    ...newData,
                    confirmed: false,
                    emailConfirmationCode: uuidv4(),
                }
            }
            if (newData.avatar) {
                const filename = `/bucket/users/${username}/images/avatar${uuidv4()}`

                await Bucket.saveBase64(newData.avatar, '.' + filename)
                newData.avatar = filename
            }
            if (newData.username) {
                if (newData.username !== username) {
                    const isExist = await new Promise((resolve, reject) => {
                        UserModel.exists(
                            { username: newData.username },
                            function (err, userExists) {
                                if (err) reject(err)
                                resolve(userExists)
                            }
                        )
                    })
                    if (isExist === true) {
                        reject(new Error('Username is useb by other user'))
                        return
                    }
                }
            }
            UserModel.findOneAndUpdate(
                { username },
                newData,
                {
                    new: true,
                },
                function (err, user) {
                    if (err) {
                        // handleError(err)
                        reject(err)
                    }
                    resolve(user)
                }
            )
        })
    }
    // updateById(id, newData) {
    //     return new Promise((resolve, reject) => {
    //         UserModel.findOneAndUpdate(
    //             { _id: id },
    //             newData,
    //             function (err, user) {
    //                 if (err) {
    //                     // handleError(err)
    //                     reject(err)
    //                 }
    //                 resolve(user)
    //             }
    //         )
    //     })
    // }
    list(config) {
        return new Promise((resolve, reject) => {
            UserModel.find({ ...config }, function (err, user) {
                if (err) {
                    // handleError(err)
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
