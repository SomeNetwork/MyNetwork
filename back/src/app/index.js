const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

var corsOptions = {
    credentials: true,
    // origin: true,
    origin: 'http://dev.localhost:3000',
    body: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
        'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Headers,',
    preflightContinue: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/bucket', express.static('bucket'))
app.use(routes)

app.get('/', (req, res) => {
    res.send(`Hello, ${req.user?.username || 'stranger'}`)
})

app.listen(process.env.PORT_HTTP || 3030, () => {
    console.log(
        `Server started http://dev.localhost:${process.env.PORT_HTTP || 3030}`
    )
})

module.exports = app
