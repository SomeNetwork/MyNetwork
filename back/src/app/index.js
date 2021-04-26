const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

const httpsConfig = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CRT),
}

const corsOptions = {
    credentials: true,
    // origin: true,
    origin: process.env.FRONT_URL||true,
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

const apps = https.createServer(httpsConfig, app)

app.listen(process.env.PORT_HTTP || 3030, () => {
    console.log(`Server started on port: ${process.env.PORT_HTTP || 3030}`)
})
apps.listen(process.env.PORT_HTTPS || 3031, () => {
    console.log(`Server started on port: ${process.env.PORT_HTTPS || 3031}`)
})

module.exports = app
