const express = require('express')
const router = express.Router()
const DB = require('../../../db/crud')

router.get('/:id', (req, res) => {
    // const body = req.body
    const id = req.params.id
    // DB.Conversations.findById(id).then((conversation) => {
    DB.Conversations.findById(id, req.user._id).then((conversation) => {
        console.log(`conversation`, conversation)
        if (conversation) {
            res.send({
                success: true,
                data: { conversation },
            })
        } else {
            res.send({
                success: false,
                error: "Conversation doen't exist!",
            })
        }
    })
})

router.post('/create', (req, res) => {
    const data = req.body

    if (data.ownerId) {
        DB.Users.findById(data.ownerId).then((user) =>
            DB.Conversations.create({ ...data, owner: user._id })
                // DB.Conversations.create({ ...data, owner: user._id })
                .then((conv) => {
                    res.send({
                        success: true,
                        data: { conv },
                    })
                })
                .catch((error) => {
                    res.send({
                        success: false,
                        error: error.message,
                    })
                })
        )
    } else
        DB.Conversations.create(data)
            .then((conv) => {
                res.send({
                    success: true,
                    data: { conv },
                })
            })
            .catch((error) => {
                res.send({
                    success: false,
                    error: error.message,
                })
            })
})
router.post('/update/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
    DB.Conversations.updateById(id, data)
        .then((conv) => {
            if (conv) {
                res.send({
                    success: true,
                    data: { conv },
                })
            } else
                res.send({
                    success: false,
                    error: 'Conversation not found!',
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
    config.match = {
        ...config.match,
        'members._id': { $eq: req.user._id },
    }
    // config.my_id = req.user._id
    // req.user.id
    DB.Conversations.list(config, req.user._id)
        .then((conversations) => {
            res.send({
                success: true,
                data: {
                    conversations,
                },
            })
        })
        .catch((error) => {
            res.send({
                success: false,
                error: error.message,
            })
        })
})

module.exports = router
