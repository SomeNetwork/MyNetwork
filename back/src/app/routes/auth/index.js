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

module.exports = router
