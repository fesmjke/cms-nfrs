export interface IUser {
    id : string;
    user_name : string;
    name : string;
    last_name : string;
    phone_number : string;
    email : string;
}

export interface IUserLoad {
    id : string;
    user_name : string;
    name : string;
    last_name : string;
    phone_number : string;
    email : string;
}

export interface IUserLoadError {
    error : string;
    code : string;
    message : string;
}