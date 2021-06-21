const express = require('express')
const router = express.Router()
const DB = require('../../../db/crud')
const WSManager = require('../../ws')

router.get('/:id', (req, res) => {
    // const body = req.body
    const id = req.params.id
    DB.Messages.findById(id).then((message) => {
        if (message) {
            res.send({
                success: true,
                data: { message },
            })
        } else {
            res.send({
                success: false,
                error: "Message doen't exist!",
            })
        }
    })
})

router.post('/create', (req, res) => {
    const data = req.body
    DB.Messages.create(data)
        .then((message) => {
            return DB.Conversations.getMembersOfConv(data.conversationId).then(
                (users) =>
                    WSManager.emit(
                        { name: 'new message', data: message },
                        users
                    )
            )
        })

        .then((message) => {
            res.send({
                success: true,
                data: { message },
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
    DB.Messages.list(config)
        .then((messages) => {
            res.send({
                success: true,
                data: {
                    messages,
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
