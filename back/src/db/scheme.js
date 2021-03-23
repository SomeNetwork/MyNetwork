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
    username: String,
    password: String,
    // type: {
    //     type: String,
    //     enum: ['Coffee', 'Tea', 'Water'],
    // },
    updatedAt: { type: Date, default: Date.now },
})

var UserModel = mongoose.model('User', UserModelShema)

module.exports.UserModel = UserModel
