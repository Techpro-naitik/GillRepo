export interface ITextsResponse {
    status: string;
    message: string;
    data: ITextsResponseData;
}

interface ITextsResponseData {
    texts: ITextsResponseDataModel[];
    totalCount: number;
}

interface ITextsResponseDataModel {
    id: number;
    title: string;
    date: string;
    shortText: string;
    longText: string;
    pic: string;
    archive: number;
}

export interface ITextsResponseId {
    status: string;
    message: string;
    data: ITextsResponseDataModel;
}

export interface INewsResponse {
    status: string;
    message: string;
    data: INewsResponseData;
}

interface INewsResponseData {
    siteNews: INewsResponseDataModel[];
    totalCount: number;
}

interface INewsResponseDataModel {
    id: number;
    title: string;
    date: string;
    shortText: string;
    longText: string;
    pic: string;
    archive: number;
}

export interface INewsResponseId {
    status: string;
    message: string;
    data: INewsResponseDataModel;
}