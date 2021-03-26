export interface IMessageResponse {
    status: string;
    messgae: string;
    data: IMessageData;
}

export interface IMessageData {
    artistIds: any,
    creationDate: string,
    readDate: string,
    title: string,
    artistId: number,
    body: string,
    direction: number,
    hidden: number,
    addToEmailQueue: number,
    readOnce: number,
    disabled: number,
    msgType: number,
    type: number
}