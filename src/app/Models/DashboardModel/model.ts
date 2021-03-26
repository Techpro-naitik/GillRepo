export class ApiResponseModel {
    status: string;
    message: string;
    data: Array<any>;
}

export class SearchMessages {
    // word: number;
    texttype: number;
    text: string;
    direction: number;
    startDate: string | Date;
    endDate: string | Date;
    msgType: number;
    disabled: number;
    readOnce: number;
    read: number;
    byEmail: number;
}

// {
//     "Text": "testing",
//     "Texttype": 1,
//     "StartDate": "2020-02-20",
//     "EndDate": "2020-02-28",
//     "MsgType": 1,
//     "Direction": 1,
//     "ReadOnce": 1,
//     "Disabled": 1,
//     "ByEmail": 1
//     }

// {
//     "text": "string",
//     "texttype": 0,
//     "startDate": "2020-03-20T07:06:06.401Z",
//     "endDate": "2020-03-20T07:06:06.401Z",
//     "msgType": 0,
//     "direction": 0,
//     "disabled": 0,
//     "readOnce": 0,
//     "byEmail": 0,
//     "pageNumber": 0,
//     "pageSize": 0
//   }