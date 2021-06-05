const mongoose = require('mongoose')
const Schema = mongoose.Schema

// var schema = new Schema({
//     name: String,
//     binary: Buffer,
//     living: Boolean,
//     updated: { type: Date, default: Date.now },
//     age: { type: Number, min: 18, max: 65, required: true },
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String], // You can also have an array of each of the other types too.
//     nested: { stuff: { type: String, lowercase: true, trim: true } },
//     drink: {
//         type: String,
//         enum: ['Coffee', 'Tea', 'Water'],
//     },
// })

const UserModelShema = new Schema({
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
    conversationLinkIds: [{ type: Schema.Types.ObjectId, ref: 'ConversationLink' }],
    updatedAt: { type: Date, default: Date.now },
})

const MessageModelShema = new Schema({
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
})

const ConversationModelShema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String, default: 'Some Chat' },
    avatar: String,
    messageIds: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    conversationLinkIds: [{ type: Schema.Types.ObjectId, ref: 'ConversationLink' }],
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    // messages: [MessageModelScheme],
    // users: [UserModelScheme],
    // ownder: UserModelScheme,
    updatedAt: { type: Date, default: Date.now },
})
const ConversationLinkModelShema = new Schema({
    id: Schema.Types.ObjectId,
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now },
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
