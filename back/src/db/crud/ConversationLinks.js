const CRUD = require('./CRUD')
const { ConversationLinkModel } = require('../scheme')

class ConversationLinks extends CRUD {
    constructor() {
        super(ConversationLinkModel)
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
}

module.exports = new ConversationLinks()
