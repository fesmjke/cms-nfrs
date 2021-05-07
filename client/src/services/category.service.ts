import { ICategory } from "../types/interfaces/category";

interface INewCategory{ 
    title : string;
    description : string;
    category_image : File;
}

interface IUpdateCategory{
    title?: string;
    description?: string;
    category_image?: File;
}

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
    createNewCategory = async (newCategory : INewCategory) : Promise<ICategory> => {
        const data = new FormData();

        data.append("title",newCategory.title);
        data.append("description",newCategory.description);
        data.append("category_image",newCategory.category_image);
    
        const requestOptions = {
            method : "POST",
            body : data
        }

        const responce = await fetch('/api/category',requestOptions);

        const result = await responce.json();

        return result;
    }
    deleteCategoryById = async (id : string) : Promise<ICategory> => {

        const requestOptions = {
            method : "DELETE"
        }

        const responce = await fetch(`/api/category/${id}`,requestOptions);

        const result = await responce.json();

        return result;
    }
    updateCategoryById = async (id : string,updatedCategory : IUpdateCategory) : Promise<ICategory> => {
        // const data = new FormData();

        // data.append("title",updatedCategory.title);
        // data.append("description",updatedCategory.description);
        // data.append("category_image",updatedCategory.category_image);
    
        const request = {
            "title" : updatedCategory.title,
            "description" : updatedCategory.description,
            "category_image" : updatedCategory.category_image
        }
        
        const data  = JSON.stringify(request);

        const requestOptions = {
            method : "PUT",
            header : {
                'Content-Type': 'application/json'
            },
            body : data
        }

        const responce = await fetch(`/api/category/${id}`,requestOptions);

        const result = await responce.json();

        return result;
    }
}

