const CRUD = require('./CRUD')
const { MessageModel } = require('../scheme')
const mongoose = require('mongoose')
// const Users = require('./Users')
// const Conversations = require('./Conversations')

class Messages extends CRUD {
    constructor() {
        super(MessageModel)
    }

    canCreate(data) {
        const authorExists = Users.exists({ _id: data.authorId })
        const conversationExists = Conversations.exists({
            _id: data.conversationId,
        })
        return Promise.all([authorExists, conversationExists]).then(
            (exists) => {
                const errors = []
                if (exists[0] === false) errors.push('User')
                if (exists[1] === false) errors.push('Conversation')
                if (errors.length === 0)
                    throw new Error(`${errors.join(' and ')} doesn't exists!`)
                else return true
            }
        )
    }

    findById(
        id,
        my_id,
        params = {
            populate: [
                'owner',
                'conversationLinks',
                {
                    path: 'conversationLinks',
                    populate: { path: 'user' },
                },
            ],
        }
    ) {
        console.log(`id`, id)
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $match: {
                        _id: { $eq: mongoose.Types.ObjectId(id.toString()) },
                    },
                },

                {
                    $lookup: {
                        from: 'users',
                        let: { authorId: '$authorId' },
                        as: 'authors',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$$authorId', '$_id'],
                                            },
                                        ],
                                    },
                                },
                            },
                            { $limit: 1 },
                        ],
                    },
                },
                {
                    $project: {
                        author: { $first: '$authors' },
                        _id: '$_id',
                        content: '$content',
                        type: '$type',
                        readed: '$readed',
                        createdAt: '$createdAt',
                        conversationId: '$conversationId',
                    },
                },
                {
                    $limit: 1,
                },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                    return
                }
                if (res.length === 0) {
                    reject(new Error("Message doesn't exist!"))
                    return
                }
                resolve(res[0])
            })
        })
    }
}

module.exports = new Messages()
