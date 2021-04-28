import {ISignIn} from "../types/interfaces/services";

export default class SignInService implements ISignIn {
    logIn = async () => {
        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "email" : "qweasdzcc123@example.com",
	            "password" : "213"
            })
        }
        try {
            const result = await fetch('auth/login',requestOptions);
            console.log(await result.json());
        }catch(err){
            console.log(err)
        }
    }
}