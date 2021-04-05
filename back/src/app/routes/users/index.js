const express = require('express')
const router = express.Router()
const DB = require('../../../db/crud')
router.get('/:username', (req, res) => {
    // const body = req.body
    const username = req.params.username
    console.log('username :>> ', username)
    DB.Users.findByUsername(username).then((user) => {
        console.log('user', user)
        if (user) {
            user.password = undefined
            res.send({
                success: true,
                data: {
                    user,
                    isOwner: req.user?._id === user._id,
                },
            })
        } else
            res.send({
                success: true,
                data: {
                    user,
                    isOwner: false,
                },
            })
    })
})

module.exports = router
