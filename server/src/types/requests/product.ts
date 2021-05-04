import { FastifyRequest } from "fastify";
import { ObjectId } from "mongoose";
import { IProduct, IReview } from "../interfaces/product";

interface MulterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string;
    size: number;
}

declare module 'fastify' {
    interface FastifyRequest {
      file: MulterFile
    }
}

export type PostProductRequest = FastifyRequest<{
    Body : IProduct;
}>

export type GetProductIdRequest = FastifyRequest<{
    Params : ProductRequestURL
}>

export type DeleteProductIdRequest = FastifyRequest<{
    Params : ProductRequestURL
}>

export type PostProductAddReviewRequest = FastifyRequest<{
    Params : ProductRequestURL,
    Body : IReview
}>

export type PostProductAddCodes = FastifyRequest<{
    Params : ProductRequestURL,
    Body : {
        codes : [string]
    }
}>

export type GetProductsByCategory = FastifyRequest<{
    Params : {
        id : string | ObjectId;
    }
}>

export type UpdateProductRequest = FastifyRequest<{
    Body : IProductUpdate,
    Params : ProductRequestURL
}>

interface IProductUpdate {
    title? : string;
    price? : string;
    discount? : string;
    category? : string | ObjectId;
    description? : string;
    image_url? : string;
    developer? : string;
}

interface ProductRequestURL {
    id : string | number | ObjectId;
}