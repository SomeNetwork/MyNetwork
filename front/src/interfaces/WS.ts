export interface WSEvent {
    name: string,
    data: any
}

export type IWSEventHandler = (data: WSEvent["data"]) => void

// export interface WSSubscriber {
//     id: string,
//     cb: IWSEventHandler
// }