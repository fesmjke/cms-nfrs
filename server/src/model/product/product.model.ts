import { ObjectId } from "mongoose";
import { IProduct, IReview } from "../../types/interfaces/product";
import { Product } from "../db/schema/product.schema"

class ProductModel {
    create = async (product : IProduct) : Promise<IProduct> => {
        return await Product.create(product);
    }

    addReview = async (id : string | number | ObjectId,review : IReview) : Promise<IProduct | null> => {
        const product = await this.getById(id);

        if(product){
            console.log(review);
            product.reviewies.push(review);

            const result = await this.updateById(id,product);
            return result
        }else{
            return product // null
        }
    }

    getActivationsCodes = async (products : string[]) : Promise<string[]> => {
        const codes : string[] = [];

        for (const product of products) {
            const code = await this.removeAndReturnCodeFromProduct(product);
            console.log("async for each",code);
            if(code) codes.push(code)
        }

        return codes;
    }

    addActivationCodes = async (id : string | number | ObjectId,codes : string[]) : Promise<IProduct | null> => {
        const product = await this.getById(id);
        if(product){
            codes.forEach(code => {
                product.activation_code.push(code);
            });
            const result = await this.updateById(id,product);
            return result
        }else{
            return product // null
        }
    }

    removeAndReturnCodeFromProduct = async (id : string) => {
        const product = await this.getById(id);

        if(product){
            if(product.activation_code.length === 0){
                return null
            }
            const productCode = product.activation_code.pop();
            await this.updateById(id,product);
            return productCode
        }

        return null
    }

    getByCategoryId = async (id : string | ObjectId) : Promise<IProduct[]> => {
        return await Product.find({category : id})
    }

    getAll = async () : Promise<IProduct[]> => {
        return await Product.find();
    }

    getById = async (id : string | number | ObjectId) : Promise<IProduct | null> => {
        return await Product.findById({_id : id});
    }

    updateById = async (id : string | number | ObjectId,updatedProduct : IProduct) : Promise<IProduct | null> => {
        return await Product.findByIdAndUpdate(id,updatedProduct,{new : true,omitUndefined : true});
    }

    deleteById = async (id : string | number | ObjectId) : Promise<IProduct | null> => {
        return await Product.findByIdAndDelete({_id : id});
    }
}

const productModel = new ProductModel();

export {
    productModel,
    ProductModel
};