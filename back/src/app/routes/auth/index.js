const express = require('express')
const router = express.Router()
const { AuthManager } = require('../../../api')

router.post('/signup', (req, res) => {
    const body = req.body
    console.log('signup :>> ', body)
    AuthManager.signUp({ username: body.username, password: body.password })
        .then(() => {
            res.send({ success: true })
        })
        .catch((a) => {
            res.status(500).send({ success: false })
        })
})
router.post('/signin', (req, res) => {
    const body = req.body
    console.log('signin :>> ', body)
    AuthManager.signIn({ username: body.username, password: body.password })
        .then((token) => {
            res.send({
                success: true,
                token,
            })
        })
        .catch((err) => {
            res.send({ success: false, error: err })
        })
})

router.get('/me', (req, res) => {
    if (req.user) {
        res.send({ success: true, me: req.user })
    } else res.status(401).send({ success: false, error: 'Need to SignIn!' })
})
module.exports = router
