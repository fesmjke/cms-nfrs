import React, { Dispatch } from "react";
import { connect,ConnectedProps } from "react-redux";
import SignInService from "../../services/sign-in.service";
import { ISignIn } from "../../types/interfaces/services";
import { AuthActions,AuthActionTypes, IAuthAnswer, IAuthAnswerError } from "../../store/reducers/auth/types";
import { RootState } from "../../store/types";

class SignIn extends React.Component<SignInComponentProps,any>{
    private _signInService : ISignIn;
    
    constructor(props : SignInComponentProps){
        super(props)
        this._signInService = new SignInService();
    }

    onClick = async () => {
        
        const auth = this.props;

        this._signInService.logIn();

        //console.log(auth.logIn())

        //console.log(auth.dispatch({type : "AUTH_LOG_IN"}));

        //console.log(auth.logInSuccess({id : "1",token : "asdzxcqwe123"}))
        
        console.log(auth);

        // console.log(auth.logInFail({code : "401",status : "false",message : "fail"}))    
    
        //console.log(auth.dispatch({type : "AUTH_LOG_IN_FAIL",authAnswer : {code : '401',status : 'true',message : 'User already loggined.'}}))
    }
    
    render(){
        console.log(this.props)
        return(
            <div>
                {this.props.status}
                <h2>Sign In</h2>
                <form>
                    <input type="email"/>
                    <span> </span>
                    <input type="password"/>
                    <button type="button" onClick={this.onClick}>Enter</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<AuthActions>) => {
    return {
        logIn : () => dispatch({type : AuthActionTypes.AUTH_LOG_IN}),
        logInSuccess : (authAnswer : IAuthAnswer) => dispatch({type : AuthActionTypes.AUTH_LOG_IN_SUCCESS,authAnswer : authAnswer}),
        logInFail : (authAnswerError : IAuthAnswerError) => dispatch({type : AuthActionTypes.AUTH_LOG_IN_FAIL,authAnswer : authAnswerError})
    }
}

const mapStateToProps = (state : RootState) => {
    return state.auth;
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type SignInComponentProps = ConnectedProps<typeof connector>;

export default connector(SignIn);