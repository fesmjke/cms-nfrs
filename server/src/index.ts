import HttpServer from "./server";
import ApplicationService from "./app/app";
import UserRouter from "./router/user/user.router";
import AuthRouter from "./router/auth/auth.router";
import CategoryRouter from "./router/category/category.router";
import ServerConfigLoader from "./config/server-config.loader";
import DataBase from "./model/db/db";
import dotenv from "dotenv";

dotenv.config();

const app = new ApplicationService();

DataBase.database_instance.connect()

const serverConfig = new ServerConfigLoader('.config-server.json').loadSync();

app.setRouter(UserRouter.getRouters());
app.setRouter(AuthRouter.getRouters());
app.setRouter(CategoryRouter.getRouters());

const httpServer = new HttpServer(app.getApp(),serverConfig);

async function start() {
    await httpServer.startServerAsync();
}

start();