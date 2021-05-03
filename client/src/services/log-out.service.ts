

export default class LogOutService {
    logIn = async (authId : string) => {
        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "authId" : authId
            })
        }
        try {
            const result = await fetch('auth/logout',requestOptions);
            console.log(await result.json());
        }catch(err){
            console.log(err)
        }
    }
}