import { ISignUp } from "../types/interfaces/services";

class SignUpService implements ISignUp {
    constructor(){
        console.log('created signup service')
    }
    
    public send = async () => {
        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                test : 'test'
            })
        }
        try {
            const result = await fetch('auth/login',requestOptions);
            console.log(result);
        }catch(err){
            console.log(err)
        }
    }
}

export default SignUpService;