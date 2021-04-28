import { AuthModel,authModel } from "../../model/auth/auth.model";
import { ILogIn, ILogOut } from "../../types/interfaces/auth";
import { IAuthService } from "../../types/interfaces/auth-service";
import { userModel,UserModel } from "../../model/user/user.model";
import { IUserDoc } from "../../model/db/docs/user.doc";
import { IAuth } from "../../types/interfaces/auth";
import { FastifyReply, FastifyRequest } from "fastify";
import { isValidObjectId, ObjectId } from "mongoose";

class AuthService implements IAuthService{
    private _authModel : AuthModel;
    private _userModel : UserModel;

    constructor(authModel : AuthModel) {
        this._authModel = authModel;
        this._userModel = userModel;
    }

    private checkAuthToken =  async (auth : string[]) : Promise<boolean> => {
        return isValidObjectId(auth[0]) && isValidObjectId(auth[1]);
    } 

    private authExistence = async (auth : string | ObjectId) : Promise<IAuth | null>=> {
        return await this._authModel.getAuthById(auth);
    }

    private userExistence = async (email : string) : Promise<IUserDoc | null> => {
        return await this._userModel.getByEmail(email);
    }

    private userVerifyPass = async (user : IUserDoc,password : string) : Promise<boolean> => {
        return await user.verifyPassword(password);
    }

    public authCheck = async (request : FastifyRequest,reply : FastifyReply) => {
        if(request.headers.authorization){
            const auth = request.headers.authorization.split('.');
            
            if(!await this.checkAuthToken(auth)){
                reply.code(403).send({message : "permission denied",reason : "auth header is not valid"}) 
            }

            const authValidResult = await this.authExistence(auth[0]);
            const authUserValidResult = await this._authModel.getById(auth[1]);
            const user = await this._userModel.getById(auth[1]);

            if ((authValidResult && authUserValidResult) && (authValidResult?.id === authUserValidResult?.id)){
                if((auth[2] === user?.roles.join('')) && auth[2] === "admin"){
                    return
                }else{
                    reply.code(403).send({message : "permission denied"})
                }
            }else if(request.url === "auth/login" || request.url === "auth/logout"){
                return
            }else{
                reply.code(403).send({message : "permission denied",reason : "auth and user is not same,or not valid"})
            }
        }else{
            reply.code(401).send({message : "permission denied",reason : "Unauthorized"})
        }
    }

    logIn = async (logIn : ILogIn,reply : FastifyReply) : Promise<IAuth | null | object> => {
        const {email,password} = logIn;
        const user : IUserDoc | null = await this.userExistence(email);
        
        if(user){ 
            const result = await this.userVerifyPass(user,password);
            if(result){
                const authAnswer = await this._authModel.getById(user.id);
                if(authAnswer){
                    await this._authModel.logOut(authAnswer.id);
                    return reply.code(401).send({error : "true",code : "401","message" : "User already loggined."})
                }else{
                    return await this._authModel.create(user.id);
                }
            }else{
                return reply.code(401).send({error : "true",code : "401","message" : "That email and password combination is incorrect."})
            }
        }else{
            return reply.code(401).send({error : "true",code : "401","message" : "That email and password combination is incorrect."})
        }
    }
    
    // check later
    logOut = async (logOut : ILogOut,reply : FastifyReply) : Promise<IAuth | null> => {
        const logOutResult = await this._authModel.logOut(logOut.authId);
        if(logOutResult) return reply.code(200).send({error : "false",result : logOutResult,message : "Logouted!"})
        else return reply.code(401).send({error : "true",code : "401","message" : "User already logouted"})
    }
}

const authService = new AuthService(authModel)

export {
    authService,
    AuthService
}