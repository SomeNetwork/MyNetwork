const DB = require('../../api/db')
const WSManager = require('../../api/WSManager')

/* new message create */

const handleCreateNewMessage = (data, user) => {
    console.log('new message create', data)
    DB.Messages.create(data)
        .then((message) =>
            DB.Messages.findById(message._id).then((message) =>
                DB.Conversations.getMembersOfConv(data.conversationId).then(
                    (users) =>
                        WSManager.emit(
                            { name: 'new message created', data: message },
                            users
                        )
                )
            )
        )
        .catch((error) => {
            WSManager.emit({ name: 'error', data: { error } }, user)
        })
}

const events = new Map([['new message create', [handleCreateNewMessage]]])

module.exports = events

// WSManager.subscribe('new message create', handleCreateNewMessage)
