const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
