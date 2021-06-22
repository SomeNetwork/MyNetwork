const { AuthManager, getCookie } = require('../../api')
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')
const { connection } = require('mongoose')

const eventExample = {
    name: 'new message',
    data: {},
}
class WSManager {
    constructor() {
        this.ws = null
        this.connections = {
            authorized: new Map(), //[[userId,ws]...]
            ghosts: new Map(), //[[wsId,ws]...]
        }
    }

    connectToServer(server) {
        this.ws = new WebSocket.Server({ server })
        console.log('WS  server started')
        this.ws.on('connection', (connection, req) => {
            connection.id === uuidv4()
            const token = getCookie(req.headers.cookie, 'token')
            AuthManager.getUserByJWT(token).then((user) => {
                if (user) {
                    const userID = user._id.toString()
                    const userConnections =
                        this.connections.authorized.get(userID)
                    this.connections.authorized.set(userID, [
                        ...(userConnections || []),
                        connection,
                    ])
                } else this.connections.ghosts.set(connection.id, connection)
            })
            connection.on('message', (message) => {
                console.log(`Received message =>`, message)
            })
            // connection.send(
            //     JSON.stringify({
            //         name: 'new message',
            //         data: { success: true, bla: 'bla' },
            //     })
            // )
            // connection.send({ a: 'foo', b: 2 }) ERR
            connection.on('close', () => {
                // TODO:
                // delete from this.connections
            })
        })
    }

    emit(event, users) {
        if (users) {
            // console.log(`this.connections`, this.connections)

            users.forEach(({ _id: userId }) => {
                // // console.log(
                //     `send`,
                //     userId,
                //     event,
                //     this.connections.authorized.get(userId.toString())
                // )
                this.connections.authorized
                    .get(userId.toString())
                    ?.forEach((connection) =>
                        connection.send(JSON.stringify(event))
                    )
                // this.connections.authorized.get(userId)?.send(event)
            })
        } else {
        }
    }
    on() {}
    subscribe() {}
}
const wsmanager = new WSManager()
module.exports = wsmanager
