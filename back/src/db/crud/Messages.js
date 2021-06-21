const CRUD = require('./CRUD')
const { MessageModel } = require('../scheme')
const Users = require('./Users')
const Conversations = require('./Conversations')

class Messages extends CRUD {
    constructor() {
        super(MessageModel)
    }

    create(data) {
        // TODO: emit event (msg created)
        return this.canCreate(true)
            .then(() => super.create(data))
            .then((res) => {
                // TODO: ws emit to all members
                // const event = {
                //     name: 'new message',
                //     data: {
                //         conversationId,
                //         authorId,
                //         content,
                //     }, //message
                // }
                // WSmanager.emit()
                return res
            })
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
}

module.exports = new Messages()
