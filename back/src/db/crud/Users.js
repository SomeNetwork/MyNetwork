const CRUD = require('./CRUD')
const { UserModel } = require('../scheme')
const { v4: uuidv4 } = require('uuid')
// const { Bucket } = require('../../api')

class Users extends CRUD {
    constructor() {
        super(UserModel)
    }
    create(user) {
        // return new Promise((resolve, reject) => {
        //     this.Model.exists(
        //         { username: user.username },
        //         function (err, userExists) {
        //             if (err) reject(err)
        //             resolve(userExists)
        //         }
        //     )
        // })
        return this.exists({ username: user.username })
            .then((isExist) => {
                if (isExist === true)
                    throw new Error('Username is useb by other user')
            })
            .then(
                () =>
                    new Promise((resolve, reject) => {
                        this.Model.create(user, function (err, user) {
                            if (err) {
                                // handleError(err)
                                reject(err)
                            }
                            resolve(user)
                        })
                    })
            )
    }
    findByUsername(username, params) {
        // FIXME:
        params = { populate: ['conversationsId'] }
        return new Promise((resolve, reject) => {
            const query = this.Model.findOne({ username })
            const { populate } = params
            if (populate) populate.forEach((p) => query.populate(p))
            query.exec(function (err, res) {
                if (err) {
                    // handleError(err)
                    reject(err)
                }
                resolve(res)
            })
        })
        // return new Promise((resolve, reject) => {
        //     this.Model.findOne({ username }, function (err, user) {
        //         if (err) {
        //             // handleError(err)
        //             reject(err)
        //         }
        //         resolve(user)
        //     })
        // })
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
            // if (newData.avatar) {
            //     const filename = `/bucket/users/${username}/images/avatar${uuidv4()}`

            //     await Bucket.saveBase64(newData.avatar, '.' + filename)
            //     newData.avatar = filename
            // }
            if (newData.username) {
                if (newData.username !== username) {
                    const isExist = await new Promise((resolve, reject) => {
                        this.Model.exists(
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
            this.Model.findOneAndUpdate(
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
    checkUsernameExists(username) {
        return new Promise((resolve, reject) => {
            this.Model.exists({ username }, function (err, userExists) {
                if (err) reject(err)
                resolve(userExists)
            })
        })
    }

}

module.exports = new Users()
