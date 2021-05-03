import {ILogInError, ILogInOk, ISignIn} from "../types/interfaces/services";

type JSONResponce = {
    body?: ILogInOk,
    error? : ILogInError
}

export default class SignInService implements ISignIn {
    logIn = async (email : string,password : string) : Promise<JSONResponce> => {
        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "email" : `${email}`,
	            "password" : `${password}`
            })
        }

        const responce = await (await fetch('auth/login',requestOptions)).json();
        
        if("error" in responce){
            return {body : undefined,error : responce}
        }
        
        return {body : responce,error : undefined};
    }
}