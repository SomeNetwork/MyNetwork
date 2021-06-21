import { IWSEventHandler, WSEvent } from "src/interfaces/WS";


export interface IWSManager {
    ws: WebSocket,
    subscribers: Map<string, IWSEventHandler[]>
    subscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    unSubscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    fireEvent(event: WSEvent): void

}

class WSManager {
    ws: WebSocket | null;
    subscribers: Map<string, IWSEventHandler[]>;
    // subscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    // unSubscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    // fireEvent(event: WSEvent): void
    constructor() {
        console.log(0)
        this.ws = null
        this.subscribers = new Map<string, IWSEventHandler[]>()
        if ((typeof WebSocket !== 'undefined'))
            this.connect()
    }
    connect(): void {
        this.ws = new WebSocket(process.env.WS_PATH || "")
        // this.subscribers = new Map<string, IWSEventHandler[]>()

        this.ws.onopen = () => {
            // subscribe to some channels
            this.ws?.send(JSON.stringify({
                //.... some message the I must send when I connect ....
            }));
        };

        this.ws.onmessage = (event) => {
            console.log(`event`, event)
            const { name, data }: WSEvent = JSON.parse(event.data)
            this.subscribers.get(name)?.forEach((cb) => {
                cb(data)
            });
        };



        this.ws.onclose = (event) => {
            console.log('Socket is closed.');
            if (event.wasClean) {
                console.log(
                    `[ws close] code=${event.code} reasom=${event.reason}`
                );
            } else {
                console.log("[close] not clean");
            }
            console.log('Reconnect will be attempted in 1 second.', event.reason);
            setTimeout(() => {
                if ((typeof WebSocket !== 'undefined'))
                    this.connect()
            }, 1000);

        };
        this.ws.onerror = (err) => {
            console.error('Socket encountered error: ', err, 'Closing socket');
            this.ws?.close();
        };
    }
    subscribe(name: WSEvent["name"], cb: IWSEventHandler): void {
        const subs = this.subscribers.get(name)
        this.subscribers.set(name, subs ? [...subs, cb] : [cb])
    }
    unSubscribe(name: WSEvent["name"], cb: IWSEventHandler): void {
        const subs = this.subscribers.get(name) || []
        this.subscribers.set(name, subs.filter((sub) => sub !== cb))
    }
    fireEvent(event: WSEvent): void {
        this.ws?.send(JSON.stringify(event))
    }
}

const WS = new WSManager()


export default WS