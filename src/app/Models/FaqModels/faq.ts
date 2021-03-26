export interface IFaqResponse{
    status: string;
    message: string;
    data: IFaqResponseData;
}

interface IFaqResponseData{
    faqs: IFaqData[];
    totalCount: number;
}

interface IFaqData{
    id: number;
    question: string;
    answer: string;
    disabled: number;
    ord: number;
}

export interface IFaqResponseId{
    status: string;
    message: string;
    data: IFaqResponseDataId;
}

interface IFaqResponseDataId{
    faqs: IFaqData;
    totalCount: number;
}