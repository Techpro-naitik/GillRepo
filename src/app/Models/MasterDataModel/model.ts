export interface BaseModelProps {
    status: string;
    message: string;
    data: PropsValues[];
}

export interface PropsValues {
    id: number;
    prop5Name: string;
    catName: number;
    catOrder: number;
    options: PropOptions[];
}

export interface PropOptions {
    id: number;
    value: string;
}

export interface CharApiModel {
    status: string;
    message: string;
    data: CharParentData[];
}

export interface CharParentData {
    characteristicId: number;
    name: string;
    options: CharData[];
}

export interface CharData {
    id: number;
    characteristicId: number;
    value: string;
}

export interface ISubscriptionResponse {
    status: string;
    message: string;
    data: ISubscriptionResponseData[];
}

interface ISubscriptionResponseData {
    id: number;
    typeName: string;
    typeColor: string;
}