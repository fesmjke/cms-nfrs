export interface INewOrder{
    user_id? : string;
    name : string;
    last_name : string;
    email : string;
    total_price : string;
    products : string[];
    status : string;
}

export interface IOrder { 
    name : string;
    last_name : string;
    email : string;
    total_price : string;
    status : string;
}
