const CRUD = require('./CRUD')
const { ConversationModel, ConversationLinkModel } = require('../scheme')

class Conversations extends CRUD {
    constructor() {
        super(ConversationModel)
    }

    create(data) {
        return super.create(data).then((conv) =>
            ConversationLinkModel.create({
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
        return super.findById(id, params)
    }
    findPrivateByIds(userId1, userId2) {
        // TODO:
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
}

module.exports = new Conversations()
