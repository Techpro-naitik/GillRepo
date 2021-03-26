export class SearchRequest {
    selecttypesmanuy: number;
    actjobsel: number;
    autonames: string[];
    fartistIds: number[];
    gender: string;
    ageStart: number;
    ageEnd: number;
    heightStart: number;
    heightEnd: number;
    firstName: string;
    lastName: string;
    agencyId: number[];
    isFriend: string;
    membershipEndDateOperator: number;
    membershipEndDate: Date;
    membershipEndDate_day: number;
    membershipEndDate_month: number;
    membershipEndDate_year: number;
    charIds: KeyValues[];
    prop5Ids: KeyValues[];
    membershipStartDate: Date;
    checkWithoutFilter: number
}

export class KeyValues {
    id: number;
    values: number[];
}

export class SearchResultApi {
    status: string;
    message: string;
    data: SearchResults[];
}

export class SearchResults {
    name: string;
    mobile: string;
    email: string;
    age: string;
    height: number;
    bodyType: string;
    internalComments: string;
    artistImages: any[];
    artistVideos:any[];
    remarks: string;
    tookAJob: number;
    color: string;
    id: number
    isSelected: boolean;
    agencyTitle: string;
    prop5Data: any[];
    messageForEmail: string;
    externalLink: string;
}

export class SearchRequestRecipients {
    gender: string;
    ageStart: number;
    ageEnd: number;
    heightStart: number;
    heightEnd: number;
    firstName: string;
    lastName: string;
    membershipEndDateOperator: number;
    membershipEndDate: Date;
    membershipEndDate_day: number;
    membershipEndDate_month: number;
    membershipEndDate_year: number; 
    charIds: keyValue[];
    checkWithoutFilter: number;
    agencyIds: number[];
    isFriend: string;
}

interface keyValue {
    id: number;
    values: number[];
}