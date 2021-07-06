const express = require('express')
const router = express.Router()
const DB = require('../../../api/db')
const API = require('../../../api')
const { v4: uuidv4 } = require('uuid')
const WSManager = require('../../../api/WSManager')

router.get('/:id', (req, res) => {
    // const body = req.body
    const id = req.params.id
    // DB.Conversations.findById(id).then((conversation) => {
    console.log(`req.user._id`, req.user._id)
    DB.Conversations.findById(id, req.user._id.toString())
        .then((conversation) => {
            // console.log(`conversation`, conversation)
            if (conversation) {
                res.send({
                    success: true,
                    data: { conversation },
                })
            }
        })
        .catch((error) => {
            res.send({
                success: false,
                error: error.message,
            })
        })
})
router.get('/private/:userId', (req, res) => {
    const userId = req.params.userId
    DB.Conversations.findPrivateIdByIds(userId, req.user._id).then((convId) => {
        if (convId) {
            res.send({
                success: true,
                data: { convId },
            })
        } else {
            res.send({
                success: false,
                error: 'Something went wrong...',
            })
        }
    })
})

router.post('/create', (req, res) => {
    const data = req.body
    if (!data.ownerId) data.ownerId = req.user._id
    DB.Conversations.create({ ...data })
        .then((data) =>
            DB.Conversations.findById(data._id).then((conv) => {
                WSManager.emit(
                    { name: 'new conversation created', data: conv },
                    conv.members
                )
                return conv
            })
        )
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
    if (config.match.$and)
        config.match.$and.push({ 'members._id': { $eq: req.user._id } })
    else
        config.match = {
            // ...config.match,
            $and: [{ 'members._id': { $eq: req.user._id } }],
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
