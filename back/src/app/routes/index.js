const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const { AuthManager } = require('../../api')

router.use(async (req, res, next) => {
    // if (req.headers.authorization) {
    // const token = req.headers.authorization.split(' ')[1]
    if (req.cookies) {
        const token = cookieParser.JSONCookies(req.cookies)['token']
        req.user = await AuthManager.getUserByJWT(token)
        if (req.user === null) res.clearCookie('token')
        // next()
    }
    // if (req.user == null){
    //     res.status(401).send({success:false, error:"Need SignIn!"})
    // }

    next()
})

const routes = ['auth', 'users', 'conversations', 'messages']
routes.forEach((route) => router.use(`/${route}`, require(`./${route}`)))
// router.use(`/auth`, require(`./auth`))

module.exports = router
