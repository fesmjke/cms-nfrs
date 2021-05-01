import { Schema,model } from "mongoose";
import { IProductDoc, IProductModel } from "../docs/product.doc";



const ProductSchema = new Schema<IProductDoc,IProductModel>({
    title : {type : String,required : true, unique: [true,'That product title is already exists.']},
    price : {type : String,required : true},
    discount : {type : String,required : true},
    description : {type : String,required : true},
    image_url : {type : String,required : true},
    developer : {type : String,required : true},
    category : {type : Schema.Types.ObjectId , ref : 'Category',required : true},
    reviewies : [{
        rating : {type : Number,required : false},
        user_id : {type : Schema.Types.ObjectId, ref : 'User',required : true},
        message : {type : String,required : true}
    }],
    activation_code : [{type : String,required : true}]
},{
    versionKey : false
});

export const Product = model<IProductDoc>("Product",ProductSchema);