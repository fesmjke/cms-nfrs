import HttpServer from "./server";
import ApplicationService from "./app/app";
import UserRouter from "./router/user/user.router";

const app = new ApplicationService();

app.setRouter(UserRouter);

const httpServer = new HttpServer(app.getApp(),{port : 3000});

async function start() {
    await httpServer.startServerAsync();
}

start();