const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const { Users } = require('../db/crud')
const Email = require('../email')

class AuthManager {
    signIn(data) {
        const { username, password } = data
        // const usernameExists = await this.checkUsernameExists(username)
        return Users.findByUsername(username).then((user) => {
            if (user) {
                return this.comparePass(password, user.password).then(
                    (passwordsAreIdentical) => {
                        if (passwordsAreIdentical) {
                            // const token = this.generateJWT(user)
                            // return token

                            if (user.confirmed) {
                                const token = this.generateJWT(user)
                                return token
                            } else {
                                throw new Error('User not confirmed!')
                            }
                        } else {
                            throw new Error('Wrong password!')
                        }
                    }
                )
            } else {
                throw new Error('User not found!')
            }
        })
    }

    signUp(data) {
        const { username, password } = data
        // const usernameExists = await this.checkUsernameExists(username)
        return Users.checkUsernameExists(username)
            .then((usernameExists) => {
                if (usernameExists) {
                    throw new Error('Username is exists!')
                } else return
            })
            .then(() => {
                return this.encodePass(password)
            })
            .then((hash) => {
                const emailConfirmationCode = uuidv4()
                return Users.create({
                    ...data,
                    password: hash,
                    emailConfirmationCode,
                })
            })
            .then(async (user) => {
                await Email.send(user.email, {
                    subject: 'Some Network',
                    text: `To confirm your account, use code: ${user.emailConfirmationCode}, or follow the link ${process.env.FRONT_URL}/auth/emailconfirmation?username=${user.username}&code=${user.emailConfirmationCode}`,
                })
                return user
            })
    }

    sendConfirmationCodeById(id) {
        return Users.findById(id).then(async (user) => {
            await Email.send(user.email, {
                subject: 'Some Network',
                text: `To confirm your account, use code: ${user.emailConfirmationCode}, or follow the link ${process.env.FRONT_URL}/auth/emailconfirmation?username=${user.username}&code=${user.emailConfirmationCode}`,
            })
            return user
        })
    }
    sendConfirmationCodeByUsername(username) {
        return Users.findByUsername(username).then(async (user) => {
            if (user) {
                if (user.emailConfirmationCode === null)
                    throw new Error('Email is confirmed!')
                await Email.send(user.email, {
                    subject: 'Some Network',
                    text: `To confirm your account, use code: ${user.emailConfirmationCode}, or follow the link ${process.env.FRONT_URL}/auth/emailconfirmation?username=${user.username}&code=${user.emailConfirmationCode}`,
                })
            } else throw new Error('User not found!')
            return user
        })
    }

    // confirmEmail(id, code) {
    //     return Users.findById(id).then((user) => {
    //         if (!user) throw new Error('User not found!')
    //         if (user.emailConfirmationCode === null) {
    //             throw new Error('Email alredy confirmed!')
    //         }
    //         if (user.emailConfirmationCode === code) {
    //             return Users.updateById(id, {
    //                 emailConfirmationCode: null,
    //                 confirmed: true,
    //             })
    //         } else throw new Error('The code is not correct!')
    //     })
    // }

    confirmEmailByUsername(username, code) {
        return Users.findByUsername(username).then((user) => {
            if (!user) throw new Error('User not found!')
            if (user.emailConfirmationCode === null) {
                throw new Error('Email alredy confirmed!')
            }
            if (user.emailConfirmationCode === code) {
                return Users.updateByUsername(username, {
                    emailConfirmationCode: null,
                    confirmed: true,
                })
            } else throw new Error('The code is not correct!')
        })
    }

    encodePass(password) {
        return bcrypt.hash(password, +process.env.SALT_ROUNDS || 10)
    }
    comparePass(password, encodedPassword) {
        return bcrypt.compare(password, encodedPassword)
    }

    generateJWT(user) {
        const head = Buffer.from(
            JSON.stringify({ alg: 'HS256', typ: 'jwt' })
        ).toString('base64')
        const body = Buffer.from(JSON.stringify(user)).toString('base64')
        const signature = crypto
            .createHmac('SHA256', process.env.JWT_KEY || '1a2b-3c4d-5e6f-7g8h')
            .update(`${head}.${body}`)
            .digest('base64')
        const token = `${head}.${body}.${signature}`
        return token
    }

    getUserIdByJWT(token) {
        if (!token) return null
        let tokenParts = token.split('.')
        let signature = crypto
            .createHmac('SHA256', process.env.JWT_KEY || '1a2b-3c4d-5e6f-7g8h')
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64')
        if (signature === tokenParts[2])
            return JSON.parse(
                Buffer.from(tokenParts[1], 'base64').toString('utf8')
            )._id
        return null
    }
    getUserByJWT(token) {
        const id = this.getUserIdByJWT(token)
        if (id) return Users.findById(id)
        else return null
    }
}

module.exports = AuthManager
