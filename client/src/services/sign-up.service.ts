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
            const result = await fetch('api/user',requestOptions);
            console.log(await result.json());
        }catch(err){
            console.log(err)
        }
    }
}

export default SignUpService;