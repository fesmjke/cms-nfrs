import React, { Dispatch } from "react";
import { connect,ConnectedProps } from "react-redux";
import SignInService from "../../services/sign-in.service";
import { ISignIn } from "../../types/interfaces/services";
import { AuthActions,AuthActionTypes, IAuthAnswer, IAuthAnswerError, IAuthLoadUserFail, IAuthLoadUserSuccess } from "../../store/reducers/auth/types";
import { RootState } from "../../store/types";
import UserService from "../../services/user.service";

interface SignInState {
    email : string;
    password : string;
}


class SignIn extends React.Component<SignInComponentProps,SignInState>{
    private _signInService : ISignIn;
    private _userService : UserService;

    constructor(props : SignInComponentProps){
        super(props)
        this._signInService = new SignInService();
        this._userService = new UserService();

        this.state = {
            email : "",
            password : "",
        }
    }

    handleEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email : e.target.value})
    }

    handlePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password : e.target.value})
    }

    onClick = async () => {
        const auth = this.props;

        const logInAnswer = await this._signInService.logIn(this.state.email,this.state.password);

        if(logInAnswer.error){
            auth.logInFail({code : logInAnswer.error.code,message : logInAnswer.error.message,status : logInAnswer.error.error})
            this.setState({email : '',password : ''})
            return 
        }
        if(logInAnswer.body){
            auth.logIn();
            const token = logInAnswer.body.token.split('.');
            await auth.logInSuccess({id : token[0],token : logInAnswer.body._id,role : token[1]});         
            
            this.props.loadUser();

            console.log(this.props.profile.id,'.',this.props.token,'.',this.props.role)

            const loadUserAnswer = await this._userService.loadUser(token[0],logInAnswer.body._id,token[1]);

            if(loadUserAnswer.error){
                this.props.loadUserFail({code : loadUserAnswer.error.code,reason : loadUserAnswer.error.message,error : loadUserAnswer.error.error})
                return
            }
            if(loadUserAnswer.body){
                this.props.loadUserSuccess(loadUserAnswer.body)
            }
        }
    }

    // if(!this.state.user_loaded){
    //     const loadUser = await this._userService.loadUser(this.props.profile.id,this.props.token,this.props.role);
    //     console.log(loadUser);
    // }else{
    //     return
    // }   
    
    render(){
        return(
            <div className="container p-5" style={{maxWidth : "700px"}}>
                {this.props.status}
                <h2>Sign In</h2>
                <form>
                    <div className="row p-2">
                        <div className="col">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" 
                                onChange={this.handleEmail}
                                className="form-control"
                                value={this.state.email}/>
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                        <label htmlFor="password" className="form-label">Password</label>
                            <input name="password" 
                            className="form-control" 
                            onChange={this.handlePassword}
                            value={this.state.password}
                            placeholder="Enter your password" 
                            type="password"/>
                        </div>
                    </div>
                    {this.props.error?.status ? <p className="p-2 text-danger">{this.props.error?.message}</p> : null}
                    <button type="button" className="btn btn-primary m-2 mt-2 position-centre" onClick={this.onClick}>Confirm</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<AuthActions>) => {
    return {
        logIn : () => dispatch({type : AuthActionTypes.AUTH_LOG_IN}),
        logInSuccess : (authAnswer : IAuthAnswer) => new Promise<void>((resolve,reject) => {dispatch({type : AuthActionTypes.AUTH_LOG_IN_SUCCESS,authAnswer : authAnswer});resolve()}),
        logInFail : (authAnswerError : IAuthAnswerError) => dispatch({type : AuthActionTypes.AUTH_LOG_IN_FAIL,authAnswer : authAnswerError}),
        loadUser : () => dispatch({type : AuthActionTypes.AUTH_LOAD_USER}),
        loadUserSuccess : (authAnswer : IAuthLoadUserSuccess) => dispatch({type : AuthActionTypes.AUTH_LOAD_USER_SUCCESS,authAnswer : authAnswer}),
        loadUserFail : (authAnswer : IAuthLoadUserFail) => dispatch({type : AuthActionTypes.AUTH_LOAD_USER_FAIL,authAnswer : authAnswer})
    }
}

const mapStateToProps = (state : RootState) => {
    return state.auth;
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type SignInComponentProps = ConnectedProps<typeof connector>;

export default connector(SignIn);