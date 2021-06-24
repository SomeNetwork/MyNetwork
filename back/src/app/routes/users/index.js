const express = require('express')
const router = express.Router()
const DB = require('../../../db/crud')
const API = require('../../../api')
const { v4: uuidv4 } = require('uuid')

router.get('/:username', (req, res) => {
    // const body = req.body
    const username = req.params.username
    // console.log('username :>> ', username)
    DB.Users.findByUsername(username).then((user) => {
        // console.log('user', user)
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

router.post('/update/:username', async (req, res) => {
    const username = req.params.username
    const data = req.body
    if (data.avatar) {
        const filename = `/bucket/users/${username}/images/avatar_${uuidv4()}`
        await API.Bucket.saveBase64(data.avatar, '.' + filename)
        data.avatar = filename
    }
    DB.Users.updateByUsername(username, data)
        .then((user) => {
            // console.log('user', user)
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

    const match = {
        $and: [
            {
                _id: { $ne: req.user._id },
            },
        ],
    }
    if (config.match) match.$and.push(config.match)
    config.match = match
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
