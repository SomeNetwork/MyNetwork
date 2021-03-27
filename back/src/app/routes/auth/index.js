const express = require('express')
const router = express.Router()
const { AuthManager } = require('../../../api')

router.post('/signup', (req, res) => {
    const body = req.body
    console.log('signup :>> ', body)
    AuthManager.signUp({ username: body.username, password: body.password })
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

router.get('/me', (req, res) => {
    if (req.user) {
        req.user.password = null
        // delete req.user.password
        res.send({ success: true, me: req.user })
    } else res.status(401).send({ success: false, error: 'Need to SignIn!' })
})
module.exports = router
