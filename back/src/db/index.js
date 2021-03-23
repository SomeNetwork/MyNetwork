const mongoose = require('mongoose')
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db

// users.create({ username: 'Goga' }).then((user) => {
//     console.log('user :>> ', user)
// })
