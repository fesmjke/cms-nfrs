import { IProduct } from "../types/interfaces/product";

export default class ProductService {
    public loadProducts = async () : Promise<IProduct[]> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const responce = await fetch(`/api/product`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
        
    }
    public loadProductById = async (id : string) : Promise<IProduct> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const responce = await fetch(`/api/product/${id}`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
    }
    public loadProductByCategory = async (id : string) : Promise<IProduct[]> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const responce = await fetch(`/api/product/category/${id}`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
    }
}
