const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')

var corsOptions = {
    // credentials: true,
    // origin: true,
    // body: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders:
        // 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

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
