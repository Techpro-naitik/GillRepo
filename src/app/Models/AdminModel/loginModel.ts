export class LoginModel {
    userName: string;
    password: string;

}

export class ApiResponseModel {
    status: string;
    message: string;
    data: Array<any>;
}