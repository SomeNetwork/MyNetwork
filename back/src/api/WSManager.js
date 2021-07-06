const { AuthManager, getCookie } = require('.')
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')

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
        this.subscribers = new Map() // [[name,[cb1,cb2]]]
    }

    connectToServer(server) {
        this.ws = new WebSocket.Server({ server })
        console.log('WS  server started')
        this.ws.on('connection', async (connection, req) => {
            connection.id === uuidv4()
            const token = getCookie(req.headers.cookie, 'token')
            const user = await AuthManager.getUserByJWT(token)
            if (user) {
                const userID = user._id.toString()
                const userConnections = this.connections.authorized.get(userID)
                this.connections.authorized.set(userID, [
                    ...(userConnections || []),
                    connection,
                ])
                console.log(`user connected`, user.username)
            } else {
                console.log(`ghost connected`)

                this.connections.ghosts.set(connection.id, connection)
            }

            connection.on('message', (sEvent) => {
                console.log(`Received event =>`, sEvent)
                try {
                    const oEvent = JSON.parse(sEvent)
                    const { name, data } = oEvent
                    const subs = this.subscribers.get(name) || []
                    subs.forEach((cb) => cb(data, user))
                } catch (error) {
                    console.error(error)
                }
            })

            connection.on('close', () => {
                if (user) {
                    const userID = user._id.toString()
                    const userConnections = this.connections.authorized
                        .get(userID)
                        .filter((uc) => uc !== connection)
                    this.connections.authorized.set(userID, userConnections)
                    console.log(`user disconnected`, user.username)
                } else {
                    console.log(`ghost disconnected`)

                    this.connections.ghosts.set(connection.id, connection)
                }
            })
        })
    }

    emit(event, users) {
        if (users) {
            users.forEach(({ _id: userId }) => {
                this.connections.authorized
                    .get(userId.toString())
                    ?.forEach((connection) =>
                        connection.send(JSON.stringify(event))
                    )
            })
        } else {
            this.connections.authorized?.forEach((connections) =>
                connections.forEach((connection) =>
                    connection.send(JSON.stringify(event))
                )
            )
            this.connections.ghosts?.forEach((connections) =>
                connections.forEach((connection) =>
                    connection.send(JSON.stringify(event))
                )
            )
        }
    }
    on() {}
    subscribe(name, cb) {
        const oldSubs = this.subscribers.get(name) || []
        this.subscribers.set(name, [...oldSubs, cb])
    }
    unsubscribe(name, cb) {
        const oldSubs = this.subscribers.get(name) || []
        this.subscribers.set(
            name,
            oldSubs.filter((e) => e !== cb)
        )
    }
}
const wsmanager = new WSManager()
module.exports = wsmanager
