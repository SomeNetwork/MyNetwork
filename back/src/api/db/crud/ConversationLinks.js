const CRUD = require('./CRUD')
const { ConversationLinkModel } = require('../scheme')
const Messages = require('./Messages')
const Users = require('./Users')

class ConversationLinks extends CRUD {
    constructor() {
        super(ConversationLinkModel)
    }

    create(cl) {
        return super.create(cl).then(async (res) => {
            await Users.findById(cl.userId).then((user) =>
                Messages.create({
                    content: `User ${user.username} join the chat`, // FIXME:  link to user
                    authorId: user._id,
                    conversationId: cl.conversationId,
                    type: 'info',
                })
            )
            return res
        })
    }

    findById(
        id,
        params = {
            populate: ['user', 'conversation'],
        }
    ) {
        return super.findById(id, params)
    }

    list(
        config,
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
        return super.list(config, params)
    }

    deleteMany(cls) {
        return super.deleteMany(cls).then((res) => {
            //  FIXME: optimize to 1 query for finding users
            const creatingMessages1 = Promise.all(
                cls.map((cl) =>
                    Users.findById(cl.userId).then((user) =>
                        Messages.create({
                            content: `User ${user.username} left the chat`, // FIXME:  link to user
                            authorId: user._id,
                            conversationId: cl.conversationId,
                            type: 'info',
                        })
                    )
                )
            )
        })
    }
}

module.exports = new ConversationLinks()
