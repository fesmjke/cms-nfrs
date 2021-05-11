import { IProductService } from "../../types/interfaces/service";
import { ObjectId } from "mongoose";
import { ProductModel,productModel } from "../../model/product/product.model";
import { IProduct, IReview } from "../../types/interfaces/product";


class ProductService implements IProductService{
    private _productModel : ProductModel;

    constructor(productModel : ProductModel) {
        this._productModel = productModel;
    }

    create = async (product : IProduct) : Promise<IProduct> => {
        return await this._productModel.create(product);
    }
    
    addReview = async (id : string | number | ObjectId,review : IReview) : Promise<IProduct | null> => {
        return await this._productModel.addReview(id,review);
    }

    getActivationsCodes = async (products : string[]) : Promise<string[]> => {
        return await this._productModel.getActivationsCodes(products);
    }

    addActivationCodes = async (id : string | number | ObjectId,codes : string[]) : Promise<IProduct | null> => {
        return await this._productModel.addActivationCodes(id,codes);
    }
    
    getByCategoryId = async (id : string | ObjectId) : Promise<IProduct[]> => {
        return await this._productModel.getByCategoryId(id);
    }

    getAll = async () : Promise<IProduct[]> => {
        return await this._productModel.getAll();
    }
    
    getById = async (id : string | number | ObjectId) : Promise<IProduct | null> => {
        return await this._productModel.getById(id);
    }
    
    updateById = async (id : string | number,updatedProduct : IProduct) : Promise<IProduct | null> => {
        return await this._productModel.updateById(id,updatedProduct);
    }

    deleteById = async (id : string | number | ObjectId) : Promise<IProduct | null> => {
        return await this._productModel.deleteById(id);
    }
}

const productService = new ProductService(productModel)

export {
    productService,
    ProductService
}