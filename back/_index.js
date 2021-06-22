const mongoose = require('mongoose')
require('dotenv').config()
const { Users } = require('./src/db/crud')
// const users = new Users()
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// users.create({ username: 'Goga' }).then((user) => {
//     // console.log('user :>> ', user)
// })
