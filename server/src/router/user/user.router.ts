import Route from "../core/route";
import { IController } from "../../types/interfaces/controller";
import { userController } from "../../controllers/user/user.controller";

class UserRoute extends Route {
    constructor(rootLabel : string,userController : IController) {
        super(rootLabel,userController);
    }
}

const userRoute = new UserRoute("user",userController);

export default userRoute.compose();