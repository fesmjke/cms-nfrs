import { Router } from "express";

export interface ICoreRouter {
    addRouter(label : string,router : Router) : void;
}