import { ILogInError, ILogInOk, ISignUp,ICreateUser, JSONResponce } from "../types/interfaces/services";


class SignUpService implements ISignUp {
    public createUser = async (user : ICreateUser) : Promise<JSONResponce> => {
        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "user_name" : `${user.user_name}`,
                "name" : `${user.name}`,
                "last_name" : `${user.last_name}`,
                "phone_number" : `${user.phone_number}`,
                "email" : `${user.email}`,
                "password" : `${user.password}`
            })
        }
        const result = await (await fetch('api/user',requestOptions)).json();

        if("error" in result){
            return {body : undefined,error : result}
        }

        return {body : result,error : undefined};
    }
}

export default SignUpService;