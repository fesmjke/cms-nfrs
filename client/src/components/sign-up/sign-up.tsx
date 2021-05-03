import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import SignUpService from "../../services/sign-up.service";
import { AuthActions, AuthActionTypes, IAuthAnswer, IAuthAnswerError } from "../../store/reducers/auth/types";
import { RootState } from "../../store/types";
import { ISignUp } from "../../types/interfaces/services";
import { IStateSignUp } from "../../types/interfaces/sign-up";



class SignUp extends React.Component<SignUpComponentProps,IStateSignUp> {
    private _signUpService : ISignUp;

    constructor(props : SignUpComponentProps){
        super(props);
        
        const auth = props;

        this.state = {
            user_name : '',
            name : '',
            last_name : '',
            phone_number : '',
            email : '',
            password : ''
        }
        this._signUpService = new SignUpService();
    }
    
    private sendRequest = async () => {
        console.log(this.state);
        //this._signUpService.send();
    }

    private handleUserNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({user_name : e.target.value})
    }

    private handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name : e.target.value})
    }
    
    private handleLastNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({last_name : e.target.value})
    }
    
    private handlePhoneNumberChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({phone_number : e.target.value})
    }

    private handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email : e.target.value})
    }

    private handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password : e.target.value})
    }


    render(){
        return(
            <div className="container p-1" style={{maxWidth : "700px"}}>
                <h2 >Sign Up {this.props.status}</h2>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input name="user_name" className="form-control" placeholder="Enter your user name" type="text" onChange={this.handleUserNameChange}/>
                                <div className="form-text pt-1">User name should have at least 4 letters.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="name" className="form-control" placeholder="Enter your name" type="text" onChange={this.handleNameChange}/>
                                <div className="form-text pt-1">Your real name.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="last_name" className="form-control" placeholder="Enter your last name" type="text" onChange={this.handleLastNameChange}/>
                                <div className="form-text pt-1">Your real family name.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="phone_number" className="form-control" placeholder="Enter your phone number" type="tel" onChange={this.handlePhoneNumberChange} />
                                <div className="form-text pt-1">Your phone number.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="email" className="form-control" placeholder="Enter your email" type="email" onChange={this.handleEmailChange}/>
                                <div className="form-text pt-1">Your email address.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="password" className="form-control" placeholder="Enter your password" type="password" onChange={this.handlePasswordChange}/>
                                <div className="form-text pt-1">Password should have at least 4 letters.</div>
                            </div>
                        </div>
                        <span></span>
                        <button type="button" className="btn btn-primary mt-3 position-centre" onClick={this.sendRequest}>Confirm</button>
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

type SignUpComponentProps = ConnectedProps<typeof connector>;

export default connector(SignUp);