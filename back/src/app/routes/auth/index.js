const express = require('express')
const router = express.Router()
const { AuthManager } = require('../../../api')

router.post('/signup', (req, res) => {
    const body = req.body
    console.log('signup :>> ', body)
    AuthManager.signUp(body)
        // AuthManager.signUp({ username: body.username, password: body.password })
        .then((user) => {
            // res.send({ success: true })
            const token = AuthManager.generateJWT(user)
            res.cookie('token', token, {
                maxAge: 12 * 60 * 60 * 1000,
                httpOnly: true,
            })
            res.redirect('/auth/me')
        })
        .catch((error) => {
            res.send({ success: false, error: error.message })
        })
})
router.post('/signin', (req, res) => {
    const body = req.body
    console.log('signin :>> ', body)
    AuthManager.signIn({ username: body.username, password: body.password })
        .then((token) => {
            res.cookie('token', token, {
                maxAge: 12 * 60 * 60 * 1000,
                httpOnly: true,
            })
            res.redirect('/auth/me')
            // res.send({
            //     success: true,
            //     me: req.user,
            // })
        })
        .catch((error) => {
            res.send({ success: false, error: error.message })
        })
})
router.post('/signout', (req, res) => {
    const body = req.body
    console.log('signout :>> ', body)

    res.clearCookie('token')
    res.send({ success: true })
})

router.get('/me', (req, res) => {
    if (req.user) {
        req.user.password = null
        // delete req.user.password
        res.send({ success: true, me: req.user })
    } else res.send({ success: false, error: 'Need to SignIn!' })
})

router.get('/emailconfirmation/:id/:code', (req, res) => {
    const { id, code } = req.params
    AuthManager.confirmEmail(id, code)
        .then((user) => {
            if (user) {
                user.password = undefined
                // delete req.user.password
                res.send({ success: true, user })
            } else {
                res.send({ success: false, error: 'wtf?!?' })
            }
        })
        .catch((err) => {
            res.send({ success: false, error: err.message })
        })
})

module.exports = router
