export interface Service {

}

export interface ISignIn extends Service {
    logIn(email : string,password : string) : Promise<JSONResponce>;
}

export interface ISignUp extends Service {
    send() : object;
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