const CRUD = require('./CRUD')
const { ConversationModel } = require('../scheme')
const ConversationLinks = require('./ConversationLinks')
const mongoose = require('mongoose')

class Conversations extends CRUD {
    constructor() {
        super(ConversationModel)
    }

    create(data) {
        return super.create(data).then((conv) =>
            ConversationLinks.create({
                conversationId: conv._id,
                userId: conv.ownerId,
            })
        )
    }

    findById(
        id,
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
        // return super.findById(id, params)
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $match: {
                        _id: { $eq: mongoose.Types.ObjectId(id) },
                    },
                },
                {
                    $limit: 1,
                },
                {
                    $lookup: {
                        from: 'conversationlinks',
                        localField: '_id',
                        foreignField: 'conversationId',
                        as: 'conversationLinks',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'ownerId',
                        foreignField: '_id',
                        as: 'owner',
                    },
                },
                {
                    $lookup: {
                        from: 'messages',
                        let: { local_id: '$_id' },
                        as: 'messages',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$$local_id', '$conversationId'],
                                    },
                                },
                            },
                            { $sort: { createdAt: -1 } },
                            // { $limit: 1 },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'conversationLinks.userId',
                        foreignField: '_id',
                        as: 'members',
                    },
                },
                {
                    $unset: ['conversationLinks'],
                },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                }
                console.log(`err`, err)
                console.log(`res`, res)
                resolve(res[0])
            })
        })
    }
    findPrivateByIds(userId1, userId2) {
        // TODO:
    }
    async updateById(id, newDate) {
        if (newDate.userIds) {
            await this.findById(id, { populate: ['conversationLinks'] }).then(
                (conv) => {
                    const oldUsersIds = conv.conversationLinks.map((cl) =>
                        cl.userId.toString()
                    )
                    const newUsersIds = newDate.userIds
                    // CLId
                    const needDelete = conv.conversationLinks
                        .filter(
                            ({ userId }) =>
                                newUsersIds.indexOf(userId.toString()) == -1
                        )
                        .map(({ _id }) => _id.toString())
                    // USERId
                    const needCreate = newUsersIds.filter(
                        (e) => oldUsersIds.indexOf(e) == -1
                    )

                    const deletingConvoLinks =
                        ConversationLinks.deleteManyById(needDelete)
                    const creatingConvoLinks = Promise.all(
                        needCreate.map((userId) =>
                            ConversationLinks.create({
                                conversationId: conv._id,
                                userId,
                            })
                        )
                    )

                    return Promise.all([deletingConvoLinks, creatingConvoLinks])
                }
            )
            delete newDate.userIds
        }
        return super.updateById(id, newDate)
    }
    // list(
    //     config,
    //     params = {
    //         populate: [
    //             'owner',
    //             'conversationLinks',
    //             'lastMessage',
    //             // 'members', // FIXME:
    //             {
    //                 path: 'conversationLinks',
    //                 populate: { path: 'user' },
    //             },
    //         ],
    //     }
    // ) {
    //     return super.list(config, params)
    // }
    list(
        config,
        params = {
            populate: [
                'owner',
                'conversationLinks',
                'lastMessage',
                // 'members', // FIXME:
                {
                    path: 'conversationLinks',
                    populate: { path: 'user' },
                },
            ],
        }
    ) {
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $lookup: {
                        from: 'conversationlinks',
                        localField: '_id',
                        foreignField: 'conversationId',
                        as: 'conversationLinks',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'ownerId',
                        foreignField: '_id',
                        as: 'owner',
                    },
                },
                {
                    $lookup: {
                        from: 'messages',
                        let: { local_id: '$_id' },
                        as: 'lastMessage',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$$local_id', '$conversationId'],
                                    },
                                },
                            },
                            { $sort: { createdAt: -1 } },
                            { $limit: 1 },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'conversationLinks.userId',
                        foreignField: '_id',
                        as: 'members',
                    },
                },
                {
                    $match: config.match,
                },
                {
                    $unset: ['conversationLinks'],
                },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                }
                console.log(`err`, err)
                console.log(`res`, res)
                resolve(res)
            })
        })
    }
}

module.exports = new Conversations()
