export interface ICastingNewsResponse{
    status: string;
    message: string;
    data: ICastingNewsResponseData
}

interface ICastingNewsResponseData{
    castingNews: ICastingNewsResponseDataArray[];
    totalCount: number;
}

interface ICastingNewsResponseDataArray{
    id: number;
    body: string;
    disabled: number;
    ord: number;
}

export interface ICastingNewsResponseId{
    status: string;
    message: string;
    data: ICastingNewsResponseIdData
}

interface ICastingNewsResponseIdData{
    castingNews: ICastingNewsResponseDataArray;
    totalCount: number;
}