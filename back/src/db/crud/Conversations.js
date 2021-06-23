const CRUD = require('./CRUD')
const { ConversationModel } = require('../scheme')
const ConversationLinks = require('./ConversationLinks')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const API = require('../../api')

// FIXME: delete me plz
const _findInterlocutor = (conv, my_id) => {
    if (conv.type === 'private') {
        conv.interlocutor = conv.members.find(
            (user) => user._id.toString() !== my_id.toString()
        )
        conv.name = conv.interlocutor?.username || conv.name
        conv.avatar = conv.interlocutor?.avatar || conv.avatar
    }
    return conv
}
class Conversations extends CRUD {
    constructor() {
        super(ConversationModel)
    }

    create(data) {
        return super.create(data).then((conv) => {
            console.log(`data`, data)
            const members = data.members.map((e) => e._id)
            if (members.indexOf(conv.ownerId) !== -1)
                members.unshift(conv.ownerId)
            return Promise.all(
                members.map((userId) =>
                    ConversationLinks.create({
                        conversationId: conv._id,
                        userId: userId.toString(),
                    })
                )
            )
        })
    }

    findById(
        id,
        // FIXME:plz
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
        // return super.findById(id, params)
        console.log(`id`, id)
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $match: {
                        _id: { $eq: mongoose.Types.ObjectId(id.toString()) },
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
                                        $and: [
                                            {
                                                $eq: [
                                                    '$$local_id',
                                                    '$conversationId',
                                                ],
                                            },
                                        ],
                                        // $eq: ['$$local_id', '$conversationId'],
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
                    $lookup: {
                        from: 'users',
                        localField: 'members._id',
                        foreignField: '_id',
                        as: 'interlocutor_',
                    },
                },
                // FIXME: plz
                // {
                //     $lookup: {
                //         from: 'users',
                //         let: {
                //             mem: '$members',
                //             // local_type: '$type',
                //         },
                //         as: 'interlocutor',
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: {
                //                         // $and: [
                //                         //     {
                //                         // $eq: ['$_id', '$$mem._id'],
                //                         $eq: ['$$mem._id', '$_id'],
                //                         //     },
                //                         // ],
                //                         // $eq: ['$$local_id', '$conversationId'],
                //                     },
                //                 },
                //                 // $match: {
                //                 //     $expr: {
                //                 //         $eq: ['$$local_id', '$_id'],
                //                 //         $and: {
                //                 //             $eq: ['$$local_type', 'private'],
                //                 //         },
                //                 //     },
                //                 // },
                //             },
                //             { $sort: { createdAt: -1 } },
                //             // { $limit: 1 },
                //         ],
                //     },
                // },
                // {
                //     $unset: ['conversationLinks'],
                // },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                    return
                }
                // console.log(`err`, err)
                // console.log(`res`, res)
                resolve(_findInterlocutor(res[0], my_id))
                // resolve(res[0])
            })
        })
    }
    findPrivateByIds(userId1, userId2) {
        // TODO:
    }
    async updateById(id, newDate) {
        return this.findById(id)
            .then(async (conv) => {
                if (newDate.avatar && newDate.avatar !== conv.avatar) {
                    const filename = `/bucket/users/${
                        conv.ownerId
                    }/images/conv_avatar_${uuidv4()}`
                    await API.Bucket.saveBase64(newDate.avatar, '.' + filename)
                    newDate.avatar = filename
                }
                return conv
            })
            .then((conv) => {
                const oldUsersIds = conv.members.map((e) => e._id.toString())
                const newUsersIds = newDate.members.map((e) => e._id.toString())
                const needCreate = newUsersIds.filter(
                    (id) => oldUsersIds.indexOf(id) === -1
                )
                const needDelete = conv.conversationLinks
                    .filter(
                        ({ userId }) =>
                            newUsersIds.indexOf(userId.toString()) === -1
                    )
                    .map(({ _id }) => _id.toString())

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
            })
            .then(() => {
                delete newDate.members
                return super.updateById(id, newDate)
            })
        // delete newDate.members
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

    list(config, my_id) {
        console.log(`config`, config)
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
                        as: 'messages',
                        // as: 'lastMessage',
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
                    $addFields: {
                        lastMessageDate: { $max: '$messages.createdAt' },
                    },
                },
                { $sort: { lastMessageDate: -1 } },
                {
                    $unset: ['conversationLinks'],
                },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                }
                // console.log(`err`, err)
                // console.log(`res`, res)
                // FIXME: plz
                resolve(res.map((c) => _findInterlocutor(c, my_id)))
                // resolve(res)
            })
        })
    }

    getMembersOfConv(conversationId) {
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $match: {
                        _id: { $eq: mongoose.Types.ObjectId(conversationId) },
                    },
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
                        localField: 'conversationLinks.userId',
                        foreignField: '_id',
                        as: 'members',
                    },
                },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                }
                // console.log(`err`, err)
                // console.log(`res`, res)
                if (res.length > 0) resolve(res[0].members)
                reject(new Error('Conversation not found!'))
            })
        })
    }
}

module.exports = new Conversations()
