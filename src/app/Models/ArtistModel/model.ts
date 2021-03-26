export interface ApiResponseModel {
    status: string;
    message: string;
    data: ArtistModel[];
}

export interface ApiResponseModelForArtist {
    status: string;
    message: string;
    data: ArtistModel;
}

export class ArtistModel {
    firstName: string;
    lastName: string;
    gender: any;
    height: number;
    description: string;
    birthDay: Date;
    membershipStartDate: Date;
    membershipExpiryDate: Date;
    agencyId: number;
    disable: number;
    hidden: number;
    email: string;
    phone: number;
    maxPictures: number;
    maxVideos: number;
    maxSounds: number;
    userName: string;
    password: string;
    friend: number;
    notes: string;
    loginId: string;
    resume: string;
    mailArtistMsgs: number;
    charValues: Array<any>;
    prop5Values: Array<any>;
    id: number;
    artistId: number;
    prop5Id: number;
    value: number;
    drama: string;
    comic: string;
    musical: string;
    artistPictures: any[];
    artistEmbeds: any[];
    actStatusType: number;
    actStatusColor: string;
    actTakeJub: number;
    insideNotes: string;
}

export interface ArtistSearchByTerm {
    status: string;
    message: string;
    data: ArtistSearchTermData[];
}

export class ArtistSearchTermData {
    id: number;
    label: string;
}