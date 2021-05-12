import { INewProduct,IUpdateProduct,IProduct } from "../types/interfaces/product";

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

    public createNewProduct = async (product : INewProduct) => {
        const data = new FormData();

        data.append('title',product.title)
        data.append('price',product.price)
        data.append('discount',product.discount)
        data.append('description',product.description)
        data.append('product_image',product.image_url!)
        data.append('developer',product.developer)
        data.append('activation_code','[]')
        data.append('category',product.category)

        console.log(product);

        console.log(data);


        const requestOptions = {
            method : "POST",
            body : data
        }

        const responce = await fetch(`/api/product`,requestOptions);

        const codeStatus = responce.status;

        const result = await responce.json();

        console.log(result);

        // if(responce.status === 500){
        //     return {body : undefined,error : {code : codeStatus.toString(),error : "true",message : result.error.message}}
        // }

        return result;
    }
    updateProductById = async (id : string,updatedProduct : IUpdateProduct) : Promise<IProduct> => {
        const data = new FormData();

        data.append('title',updatedProduct.title!)
        data.append('price',updatedProduct.price!)
        data.append('discount',updatedProduct.discount!)
        data.append('description',updatedProduct.description!)
        data.append('product_image',updatedProduct.image_url!)
        data.append('developer',updatedProduct.developer!)
        data.append('category',updatedProduct.category!)

        const requestOptions = {
            method : "PUT",
            body : data
        }

        const responce = await fetch(`/api/product/${id}`,requestOptions);

        const result = await responce.json();

        return result;
    }
    deleteProductById = async (id : string) : Promise<IProduct> => {

        const requestOptions = {
            method : "DELETE"
        }

        const responce = await fetch(`/api/product/${id}`,requestOptions);

        const result = await responce.json();

        return result;
    }

    addNewCode = async (id : string,code : string) => {
        const codes = [code];

        const requestOptions = {
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "codes" : codes
            })
        }

        const responce = await fetch(`/api/product/codes/${id}`,requestOptions);

        const result = await responce.json();

        return result;
    }
}
