import {IUserLoad,IUserLoadError} from "../types/interfaces/user"

type JSONResponce = {
    body? : IUserLoad,
    error? : IUserLoadError
}

type JSONResponceOk = {
    body : IUserLoad,
    error? : IUserLoadError
}

export default class UserService {
    public loadUser = async (id : string,token : string,role : string) : Promise<JSONResponce> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `${id}.${token}.${role}`
            }
        }

        console.log(requestOptions)

        const responce = await fetch(`/api/user/${id}`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        if(responce.status === 500){
            return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        }

        return {body : result,error : undefined}
        
    }
    public loadUserById = async (id : string) : Promise<JSONResponceOk> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json',
            }
        }

        console.log(requestOptions)

        const responce = await fetch(`/api/user/${id}`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        return {body : result,error : undefined}
    }
}