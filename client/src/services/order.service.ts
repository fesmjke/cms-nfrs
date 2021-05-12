import { INewOrder } from "../types/interfaces/order";

interface ICreateOrderAnswer {
    status : string;
}

interface IOrder { 
    name : string;
    last_name : string;
    email : string;
    total_price : string;
    status : string;
}

export default class OrderService {
    loadAllOrders = async () : Promise<IOrder[]> => {
        const requestOptions = {
            method : "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const result = await (await fetch('/api/order',requestOptions)).json();

        return result
    }
    
    createOrder = async (newOrder : INewOrder) : Promise<ICreateOrderAnswer> => {
        const body = {
            "user_id" : newOrder.user_id!,
            "name" : newOrder.name, 
            "last_name" : newOrder.last_name,
            "email" : newOrder.email,
            "total_price" : newOrder.total_price,
            "products" : newOrder.products,
            "status" : newOrder.status
        }

        const requestOptions = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        const result = await (await fetch('/api/order',requestOptions)).json();

        return result
    }
}