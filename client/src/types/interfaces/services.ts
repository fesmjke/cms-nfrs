export interface Service {

}

export interface ISignIn extends Service {
    logIn() : object;
}

export interface ISignUp extends Service {
    send() : object;
}