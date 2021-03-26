export interface INotification {
    status: string;
    message: string;
    data: INotificationData;
}

interface INotificationData {
    notifications: INotificationArrayData[];
    totalCount: number;
}

export interface INotificationById {
    status: string;
    message: string;
    data: INotificationDataById;
}

interface INotificationDataById{
    notifications: INotificationArrayData[];
    totalCount: number;
}

interface INotificationArrayData {
    dataId: number;
    created: string;
    viewed: string;
    completedDateTime: string;
    title: string;
    body: string;
    markAsUnread: number;
    completed: number;
    type: number;
    json: any;
    typeName: string;
    artistId: number;
}