export class CasterApiModel {
    status: string;
    message: string;
    data: CasterDataModel[];
}

export class CasterDataModel {
    id: number;
    firstName: string;
    lastName: string;
    email1: string;
    email2: string;
    phone1: string;
    phone2: string;
    fax: string;
    address: string;
    company: string;
    notes: string;
    username: string;
    website: string;
    password: string;
    disabled: number;
    isSelected: boolean;
}

export interface AudtionTypeApiModel {
    status: string;
    message: string;
    data: AuditionTypeData[];
}

export interface AuditionTypeData {
    id: number;
    order: number;
    typeName: string;
}

export interface AudtionTopicApiModel {
    status: string;
    message: string;
    data: AuditionTypeData[];
}

export interface AuditionTopicData {
    id: number;
    order: number;
    topicName: string;
}

export interface ICasterId{
    status: string;
    message: string;
    data: CasterDataModel;
}