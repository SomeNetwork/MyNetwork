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
                    isOwner: req.user?._id.toString() === user._id.toString(),
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

router.post('/update/:username', (req, res) => {
    const username = req.params.username
    const data = req.body
    DB.Users.updateByUsername(username, data)
        .then((user) => {
            console.log('user', user)
            if (user) {
                user.password = undefined
                res.send({
                    success: true,
                    data: {
                        user,
                        isOwner:
                            req.user?._id.toString() === user._id.toString(),
                    },
                })
            } else
                res.send({
                    success: false,
                    error: 'User not found!',
                })
        })
        .catch((error) => {
            res.send({
                success: false,
                error: error.message,
            })
        })
})

router.post('', (req, res) => {
    const data = req.body
    const { config } = data
    DB.Users.list(config).then((users) => {
        res.send({
            success: true,
            data: {
                users,
            },
        })
    })
})

module.exports = router
