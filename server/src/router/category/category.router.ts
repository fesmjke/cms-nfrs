import { RouteOptions } from "fastify";
import { categoryController } from "../../controllers/category/category.controller";
import { IController } from "../../types/interfaces/controller";
import multer from 'fastify-multer';
import Route from "../core/route";
import { DeleteCategoryResponce, GetCategoriesResponce, GetCategoryResponce, PostCategoryResponce, UpdateCategoryResponce } from "../../types/schema/category";

class CategoryRoute extends Route {
    /**
     Class private fields
    */
     private getCategoriesRoute : RouteOptions;
     private getCategoryRoute : RouteOptions;
     private postCategoryRoute : RouteOptions;
     private putCategoryRoute : RouteOptions;
     private deleteCategoryRoute : RouteOptions;
    constructor(rootLabel : string,categoryController : IController) {
        super(rootLabel,categoryController);

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
        this.getCategoriesRoute = { method : "GET",url : `/api/${this._rootLabel}`,schema : {response : GetCategoriesResponce},handler : this._controller.getAll }
        this.getCategoryRoute = { method : "GET",url : `/api/${this._rootLabel}/:id`,schema : {response : GetCategoryResponce},handler : this._controller.getById }
        this.postCategoryRoute = { method : "POST", 
            url : `/api/${this._rootLabel}`,
            schema : {response : PostCategoryResponce},
            preHandler: upload.single('category_image'), 
            handler : this._controller.create}
        this.putCategoryRoute = { method : "PUT", url : `/api/${this._rootLabel}/:id`,schema : {response : UpdateCategoryResponce},preHandler : upload.single('category_image'), handler : this._controller.updateById }
        this.deleteCategoryRoute = { method : "DELETE", url : `/api/${this._rootLabel}/:id`,schema : {response : DeleteCategoryResponce}, handler : this._controller.deleteById }
    }

    public getRouters() : RouteOptions[] {
        return [this.getCategoriesRoute,this.getCategoryRoute,this.postCategoryRoute,this.putCategoryRoute,this.deleteCategoryRoute]
    }
}

const categoryRoute = new CategoryRoute("category",categoryController);

export default categoryRoute;