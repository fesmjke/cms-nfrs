import { FastifyRequest } from "fastify";
import { ObjectId } from "mongoose";
import { ICategory } from "../interfaces/category";

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

export type PostCategoryRequest = FastifyRequest<{
    Body : ICategory;
}>

export type GetCategoryIdRequest = FastifyRequest<{
    Params : CategoryRequestURL
}>

export type DeleteCategoryIdRequest = FastifyRequest<{
    Params : CategoryRequestURL
}>

export type UpdateCategoryRequest = FastifyRequest<{
    Body : ICategoryUpdate,
    Params : CategoryRequestURL
}>

interface ICategoryUpdate {
    title? : string;
    description? : string;
    image_path? : string;
}

interface CategoryRequestURL {
    id : string | number | ObjectId;
}