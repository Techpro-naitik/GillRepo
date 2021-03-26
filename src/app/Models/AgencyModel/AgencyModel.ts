export class GetAllAgencyModel {
    id: number;
    name: string;
    agencyColor: string;
    agencyRank: string;
    agencyRankId: number;
}

export interface AllAgencyResponse {
    status: string;
    message: string;
    data: GetAllAgencyModel[];
}

export interface IAgencyResponseById {
    status: string;
    message: string;
    data: GetAllAgencyModel;
}