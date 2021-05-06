import { ICategory } from "../types/interfaces/category";



export default class CategoryService {
    public loadCategories = async () : Promise<ICategory[]> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        }

        console.log(requestOptions)

        const responce = await fetch(`/api/category`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
        
    }
    public loadCategoryById = async (id : string) : Promise<ICategory> => {
        const requestOptions = {
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        }

        console.log(requestOptions)

        const responce = await fetch(`/api/category/${id}`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
    }
}