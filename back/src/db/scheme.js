const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* User */
const UserModelShema = new Schema(
    {
        id: Schema.Types.ObjectId,
        email: { type: String, lowercase: true },
        name: String,
        family_name: String,
        username: String,
        password: String,
        emailConfirmationCode: String,
        avatar: String,
        confirmed: {
            type: Boolean,
            default: false,
        },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
UserModelShema.virtual('conversationLinks', {
    ref: 'ConversationLink',
    localField: '_id',
    foreignField: 'userId',
})
UserModelShema.virtual('conversations', {
    ref: 'Conversation',
    localField: 'conversationLink.conversationId',
    foreignField: '_id',
})

/* Message */
const MessageModelShema = new Schema(
    {
        id: Schema.Types.ObjectId,
        content: {
            type: String,
            default: '',
        },
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
        // conversation: ConversationModelShema,
        readed: {
            type: Boolean,
            default: false,
        },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
MessageModelShema.virtual('conversation', {
    ref: 'Conversation',
    localField: 'conversationId',
    foreignField: '_id',
    justOne: true,
})
MessageModelShema.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true,
})

/* Conversation */
const ConversationModelShema = new Schema(
    {
        id: Schema.Types.ObjectId,
        name: { type: String, default: 'Some Chat' },
        avatar: String,
        ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
        // messages: [MessageModelScheme],
        // users: [UserModelScheme],
        // ownder: UserModelScheme,
        type: {
            type: String,
            enum: ['private', 'group'],
            default: 'private',
        },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
ConversationModelShema.virtual('owner', {
    ref: 'User',
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true,
})
ConversationModelShema.virtual('conversationLinks', {
    ref: 'ConversationLink',
    localField: '_id',
    foreignField: 'conversationId',
    // justOne: true,
})
ConversationModelShema.virtual('members', {
    ref: 'User',
    localField: 'conversationLinks.userId',
    foreignField: '_id',
})

/* ConversationLink */
const ConversationLinkModelShema = new Schema(
    {
        id: Schema.Types.ObjectId,
        conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
ConversationLinkModelShema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
})
ConversationLinkModelShema.virtual('conversation', {
    ref: 'Conversation',
    localField: 'conversationId',
    foreignField: '_id',
    justOne: true,
})

const UserModel = mongoose.model('User', UserModelShema)
const MessageModel = mongoose.model('Message', MessageModelShema)
const ConversationModel = mongoose.model('Conversation', ConversationModelShema)
const ConversationLinkModel = mongoose.model(
    'ConversationLink',
    ConversationLinkModelShema
)

module.exports.UserModel = UserModel
module.exports.MessageModel = MessageModel
module.exports.ConversationModel = ConversationModel
module.exports.ConversationLinkModel = ConversationLinkModel
