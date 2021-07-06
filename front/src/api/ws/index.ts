import { IWSEventHandler, WSEvent } from "src/interfaces/WS";


export interface IWSManager {
    ws: WebSocket,
    subscribers: Map<string, IWSEventHandler[]>
    subscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    unsubscribe(name: WSEvent["name"], cb: IWSEventHandler): void
    fireEvent(event: WSEvent): void

}

class WSManager {
    ws: WebSocket | null;
    subscribers: Map<string, IWSEventHandler[]>;

    constructor() {
        this.ws = null
        this.subscribers = new Map<string, IWSEventHandler[]>()
    }
    connect(): void {
        if (!this.ws) {
            this.ws = new WebSocket(process.env.WS_PATH || "")

            this.ws.onopen = () => {
                console.log(`WS connected to ${process.env.WS_PATH}`)
            };

            this.ws.onmessage = (event) => {
                const { name, data }: WSEvent = JSON.parse(event.data)
                this.subscribers.get(name)?.forEach((cb) => {
                    cb(data)
                });
            };



            this.ws.onclose = (event) => {
                if (event.wasClean) {
                    console.log(
                        `[ws close] code=${event.code} reasom=${event.reason}`
                    );
                } else {
                    console.log("[close] not clean");
                    const _t = setTimeout(() => {
                        clearTimeout(_t)
                        if ((typeof WebSocket !== 'undefined')) {
                            this.reconnect()
                            console.log('Reconnect will be attempted in 1 second.', event.reason);
                        }
                    }, 1000);
                }


            };
            this.ws.onerror = (err) => {
                console.error('Socket encountered error: ', err, 'Closing socket');
                this.ws?.close();
            };
        }
    }
    reconnect(): void {
        this.ws?.close();
        this.ws = null
        this.connect()
    }
    subscribe(name: WSEvent["name"], cb: IWSEventHandler): void {
        const subs = this.subscribers.get(name)
        this.subscribers.set(name, subs ? [...subs, cb] : [cb])

    }
    unsubscribe(name: WSEvent["name"], cb: IWSEventHandler): void {
        const subs = this.subscribers.get(name) || []
        this.subscribers.set(name, subs.filter((sub) => sub !== cb))
    }
    emit(event: WSEvent, callback?: () => void): void {
        this.waitForConnection(() => {
            this.ws?.send(JSON.stringify(event))
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 1000);

    }
    waitForConnection(callback: () => void, interval: number): void {
        if (this.ws?.readyState === 1) {
            callback();
        } else {
            const t = setTimeout(() => {
                clearTimeout(t)
                this.waitForConnection(callback, interval);
            }, interval);
        }
    }
}

const WS = new WSManager()


export default WS