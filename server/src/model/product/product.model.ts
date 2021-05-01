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