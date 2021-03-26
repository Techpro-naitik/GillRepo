export interface IAuditionBudgetResponse {
    status: string;
    message: string;
    data: Array<IAuditionBudget>;
}

export interface IAuditionBudget {
    id: number;
    isCurrency: number;
    order: number;
    budgetName: string;
}

export interface IAuditionResponse {
    status: string;
    messasge: string;
    data: IAuditionData;
}

export interface IAuditionData {
    "ptitle": string,
    "pauditionDate": string,
    "pauditionCreationDate": string,
    "plocation": string,
    "pclosingDate": string,
    "direction": number,
    "pauditionTypeId": number,
    "ptopic": string,
    "ptopicId": 0,
    "pbudgetType": number,
    "pbudget": number,
    "prehearsalStart": string,
    "prehearsalEnd": string,
    "pworkStart": string,
    "pworkEnd": string,
    "pdescription": string,
    "pimage": string,
    "pcolor": string,
    "pallowApplicationToManyParts": number,
    "pallowApplicationToUnfitParts": number,
    "pmaxAllowedPictures": number,
    "psentToCasterDate": string,
    "pcasterId": number,
    "pviewedByCaster": number,
    "pcasterReplied": number,
    "preventApplications": number,
    "preventCasterEdit": number,
    "pautoApplication": number,
    "pautoAbilityText": number,
    "invite_msg_title": string,
}