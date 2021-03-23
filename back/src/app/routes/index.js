const express = require('express')
const router = express.Router()
const { AuthManager } = require('../../api')

router.use((req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        req.user = AuthManager.getUserIdByJWT(token)
        next()
    }
    next()
})

const routes = ['auth']
routes.forEach((route) => router.use(`/${route}`, require(`./${route}`)))
// router.use(`/auth`, require(`./auth`))

module.exports = router
