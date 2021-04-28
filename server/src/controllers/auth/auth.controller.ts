import { FastifyReply } from "fastify";
import { IAuthController } from "../../types/interfaces/auth-controller";
import { IAuthService } from "../../types/interfaces/auth-service";
import { AuthLogInRequest,AuthLogOutRequest } from "../../types/requests/auth";
import { authService } from "../../services/auth/auth.service";

class AuthController implements IAuthController {
    private _authService : IAuthService;
    
    constructor(authService : IAuthService) {
        this._authService = authService;
    }

    logIn = async (request : AuthLogInRequest,reply : FastifyReply) => {
        return await this._authService.logIn({email : request.body.email,password : request.body.password},reply);
    }

    logOut = async (request : AuthLogOutRequest,reply : FastifyReply) => {
        return await this._authService.logOut({authId : request.body.authId},reply);
    }
}

const authController = new AuthController(authService);

export {
    authController,
    AuthController
};