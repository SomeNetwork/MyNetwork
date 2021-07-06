const CRUD = require('./CRUD')
const { ConversationModel } = require('../scheme')
const ConversationLinks = require('./ConversationLinks')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Bucket = require('../../Bucket')

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
    async create(data) {
        if (data.avatar) {
            const filename = `/bucket/users/${data.ownerId.toString()}/images/conv_avatar_${uuidv4()}`
            await Bucket.saveBase64(data.avatar, '.' + filename)
            data.avatar = filename
        }
        return super.create(data).then(async (conv) => {
            console.log(`data`, data)
            const members = data.members?.map((e) => e._id) || []
            if (members.indexOf(conv.ownerId.toString()) === -1)
                members.unshift(conv.ownerId)
            await Promise.all(
                members.map((userId) =>
                    ConversationLinks.create({
                        conversationId: conv._id,
                        userId: userId.toString(),
                    })
                )
            )
            conv.members = members
            return conv
        })
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
                                                            $eq: [
                                                                '$$authorId',
                                                                '$_id',
                                                            ],
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
                                },
                            },
                            { $sort: { createdAt: -1 } },
                            // { $limit: 1 },
                        ],
                    },
                },
                // {
                //     $lookup: {
                //         from: 'users',
                //         localField: 'messages.authorId',
                //         foreignField: '_id',
                //         as: 'messages.author',
                //     },
                // },
                // {
                //     $group: {
                //         messages: {
                //             ['messages._id']: '$messages._id',
                //             ['messages.content']: '$messages.content',
                //             ['messages.type']: '$messages.type',
                //             ['messages.readed']: '$messages.readed',
                //             ['messages.authorId']: '$messages.authorId',
                //             ['messages.conversationId']:
                //                 '$messages.conversationId',
                //             ['messages.createdAt']: '$messages.createdAt',
                //             ['messages.author']: '$author',
                //         },
                //     },
                // },
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

                {
                    $limit: 1,
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
                if (res.length === 0) {
                    reject(new Error("Conversation doesn't exist!"))
                    return
                }
                console.log(res[0].messages[0])
                resolve(_findInterlocutor(res[0], my_id))
            })
        })
    }
    findPrivateIdByIds(interlocutorId, myId) {
        return new Promise((resolve, reject) => {
            this.Model.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                type: { $eq: 'private' },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'conversationlinks',
                        let: { convId: '$_id' },

                        // localField: '_id',
                        // foreignField: 'conversationId',
                        as: 'conversationLinks',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$$convId', '$conversationId'],
                                    },
                                },
                            },
                            {
                                $sort: { createdAt: -1 },
                            },
                        ],
                    },
                },
                {
                    $addFields: {
                        membersId: '$conversationLinks.userId',
                        // membersId: [mongoose.Types.ObjectId(interlocutorId),mongoose.Types.ObjectId(myId)],
                    },
                },
                {
                    $match: {
                        $and: [
                            {
                                membersId: {
                                    $all: [
                                        mongoose.Types.ObjectId(interlocutorId),
                                        mongoose.Types.ObjectId(myId),
                                    ],
                                },
                            },
                            // { membersId: mongoose.Types.ObjectId(myId) },
                        ],
                        // $all: [
                        //     interlocutorId.toString(),
                        //     myId.toString()
                        // ],
                        // $all: [
                        //     mongoose.Types.ObjectId(interlocutorId),
                        //     mongoose.Types.ObjectId(myId),
                        // ],

                        // $and: [
                        //     {
                        //         membersId: {
                        //             $elemMatch:
                        //                 mongoose.Types.ObjectId(interlocutorId),
                        //         },
                        //     },
                        //     {
                        //         membersId: {
                        //             $elemMatch: mongoose.Types.ObjectId(myId),
                        //         },
                        //     },
                        // ],
                    },
                },

                /* {
                    $match: {
                        members: {
                            $elemMatch: {
                                _id: {
                                    $in: [
                                        mongoose.Types.ObjectId(interlocutorId),
                                        mongoose.Types.ObjectId(myId),
                                    ],
                                },
                            },
                        },
                    },
                }, */
            ]).exec((err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                if (res.length == 0)
                    this.create({
                        ownerId: myId.toString(),
                        members: [
                            { _id: interlocutorId.toString() },
                            { _id: myId.toString() },
                        ],
                        type: 'private',
                    }).then((conv) => {
                        resolve(conv._id)
                    })
                else {
                    resolve(res[0]._id)
                }
            })
        })
    }
    async updateById(id, newDate) {
        return this.findById(id)
            .then(async (conv) => {
                if (newDate.avatar && newDate.avatar !== conv.avatar) {
                    const filename = `/bucket/users/${
                        conv.ownerId
                    }/images/conv_avatar_${uuidv4()}`
                    await Bucket.saveBase64(newDate.avatar, '.' + filename)
                    newDate.avatar = filename
                }
                return conv
            })
            .then(async (conv) => {
                const oldUsersIds = conv.members.map((e) => e._id.toString())
                const newUsersIds = newDate.members.map((e) => e._id.toString())
                const needCreate = newUsersIds.filter(
                    (id) => oldUsersIds.indexOf(id) === -1
                )
                const needDeleteCL = conv.conversationLinks.filter(
                    ({ userId }) =>
                        newUsersIds.indexOf(userId.toString()) === -1
                )
                const deletingConvoLinks =
                    ConversationLinks.deleteMany(needDeleteCL)
                // const deletingConvoLinks = ConversationLinks.deleteManyById(
                //     needDeleteCL.map(({ _id }) => _id.toString())
                // )

                const creatingConvoLinks = Promise.all(
                    needCreate.map((userId) =>
                        ConversationLinks.create({
                            conversationId: conv._id,
                            userId,
                        })
                    )
                )
                // FIXME: optimize to 1 query for finding users
                // const creatingMessages1 = Promise.all(
                //     needDeleteCL.map((cl) =>
                //         Users.findById(cl.userId).then((user) =>
                //             Messages.create({
                //                 content: `User ${user.username} left the chat`, // FIXME:  link to user
                //                 authorId: user._id,
                //                 conversationId: conv._id,
                //                 type: 'info',
                //             })
                //         )
                //     )
                // )
                // const creatingMessages2 = Promise.all(
                //     needCreate.map((userId) =>
                //         Users.findById(userId).then((user) =>
                //             Messages.create({
                //                 content: `User ${user.username} join the chat`, // FIXME:  link to user
                //                 authorId: user._id,
                //                 conversationId: conv._id,
                //                 type: 'info',
                //             })
                //         )
                //     )
                // )
                return Promise.all([
                    deletingConvoLinks,
                    creatingConvoLinks,
                    // creatingMessages1,
                    // creatingMessages2,
                ])
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
                // {
                //     $lookup: {
                //         from: 'users',
                //         let: { local_id: '$members' },
                //         as: 'interlocutors',
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: {
                //                         $and: [
                //                             {
                //                                 $eq: ['$$local_id._id', '$_id'],
                //                             },
                //                             // {
                //                             //     $ne: [
                //                             //         '$_id',
                //                             //         mongoose.Types.ObjectId(
                //                             //             my_id
                //                             //         ),
                //                             //     ],
                //                             // },
                //                         ],
                //                     },
                //                 },
                //             },
                //             // { $sort: { createdAt: -1 } },
                //             // { $limit: 1 },
                //         ],
                //     },
                // },
                {
                    $match: config.match,
                },
                {
                    $addFields: {
                        lastMessageDate: { $max: '$messages.createdAt' },
                    },
                },
                { $sort: { lastMessageDate: -1 } },
                // {
                //     $project: {
                //         _id: '$_id',
                //         name: '$name',
                //         avatar: '$avatar',
                //         messages: '$messages',
                //         ownerId: '$ownerId',
                //         owner: '$owner',
                //         lastMessage: '$lastMessage',
                //         members: '$members',
                //         createdAt: '$createdAt',
                //         interlocutors: '$interlocutors',
                //     },
                // },
                // {
                //     $unset: ['conversationLinks', 'lastMessageDate'],
                // },
            ]).exec(function (err, res) {
                if (err) {
                    reject(err)
                    return
                }
                // console.log(res[0].interlocutors)
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
