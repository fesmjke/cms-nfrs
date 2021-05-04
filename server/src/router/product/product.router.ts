import { RouteOptions } from "fastify";
import { IProductController } from "../../types/interfaces/controller";
import multer from 'fastify-multer';
import Route from "../core/route";
import { productController } from "../../controllers/product/product.controller";

class ProductRoute extends Route {
    /**
     Class private fields
    */
     private getProductsRoute : RouteOptions;
     private getProductRoute : RouteOptions;
     private getByCategoryId : RouteOptions;
     private postProductRoute : RouteOptions;
     private putProductRoute : RouteOptions;
     private deleteProductRoute : RouteOptions;
     private addReview : RouteOptions;
     private addActivationCodes : RouteOptions;

     constructor(rootLabel : string,productController : IProductController) {
        super(rootLabel,productController);

        const storage = multer.diskStorage({
            destination : function (req, file, cb) {
                cb(null,'dist/public')
            },
            filename : function (req,file,cb) {
                const fileExtension = file.mimetype.split('/');

                cb(null,Date.now() + `.${fileExtension[1]}`);
            }
        })

        const upload = multer({storage});

        
        // later need to refactor
        this.getProductsRoute = { method : "GET",url : `/api/${this._rootLabel}`,handler : this._controller.getAll }
        this.getProductRoute = { method : "GET",url : `/api/${this._rootLabel}/:id`,handler : this._controller.getById }
        this.getByCategoryId = {method : "GET",url : `/api/${this._rootLabel}/category/:id`,handler : productController.getProductsByCategory}
        this.postProductRoute = { method : "POST", 
            url : `/api/${this._rootLabel}`,
            preHandler: upload.single('product_image'), 
            handler : this._controller.create}
        this.putProductRoute = { method : "PUT", url : `/api/${this._rootLabel}/:id`,preHandler : upload.single('product_image'), handler : this._controller.updateById }
        this.deleteProductRoute = { method : "DELETE", url : `/api/${this._rootLabel}/:id`, handler : this._controller.deleteById }
        this.addReview = {method : "POST",url : `/api/${this._rootLabel}/review/:id`, handler : productController.addReview }
        this.addActivationCodes = {method : "POST",url : `/api/${this._rootLabel}/codes/:id`, handler : productController.addActivationCodes }
    }

    public getRouters() : RouteOptions[] {
        return [this.getProductsRoute,this.getProductRoute,this.getByCategoryId,this.postProductRoute,this.putProductRoute,this.deleteProductRoute,this.addReview,this.addActivationCodes]
    }
}

const productRoute = new ProductRoute("product",productController);

export default productRoute;