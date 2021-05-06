export interface IStateSignUp{
    user_name : string;
    name : string;
    last_name : string;
    phone_number : string;
    email : string;
    password : string;
    error : {
        message : string;
        status : boolean;
    };
    success : string;
}