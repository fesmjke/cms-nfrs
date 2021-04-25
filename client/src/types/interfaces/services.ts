export interface Service {

}

export interface ISignIn extends Service {

}

export interface ISignUp extends Service {
    send() : object;
}