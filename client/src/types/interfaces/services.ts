export interface Service {

}

export interface ISignIn extends Service {
    logIn(email : string,password : string) : Promise<JSONResponce>;
}

export interface ISignUp extends Service {
    createUser(user : ICreateUser) : Promise<JSONResponce>;
}

export interface JSONResponce {
    body?: ILogInOk,
    error? : ILogInError
}

export interface ILogInOk {
    _id: string;
    token: string;
}

export interface ILogInError {
    error : string;
    code : string;
    message : string;
}

export interface ICreateUser {
    user_name : string;
    name : string;
    last_name : string;
    phone_number : string;
    email : string;
    password : string;
}