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
            password : '',
            error : {message : '',status : false},
            success : ''
        }
        this._signUpService = new SignUpService();
    }
    
    private createUser = async () => {
        if(this.state.name.length <=4 ){
            this.setState({error : {message : "Name should have at least 4 letters",status : true}});
        }
        if(this.state.user_name.length <= 3){
            this.setState({error : {message : "User name should have at least 3 letters",status : true}});
        }
        if(this.state.last_name.length <= 2){
            this.setState({error : {message : "Last name should have at least 2 letters",status : true}});
        }
        if(this.state.password.length <= 4){
            this.setState({error : {message : "Password should have at least 4 letters",status : true}});
        }
        const answer = await this._signUpService.createUser({user_name : this.state.user_name,
                                        last_name : this.state.last_name,
                                        name : this.state.name,
                                        email : this.state.email,
                                        password : this.state.password,
                                        phone_number : this.state.phone_number})
        
        if(answer.error){
            this.setState({error : {message : answer.error.message,status : true}})
        }

        this.setState({success : "You are been successfully registrated!"})
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
            <div className="container p-1 mt-4" style={{maxWidth : "700px"}}>
                <h2 >Sign Up {this.props.status}</h2>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input name="user_name" className={"form-control ".concat(this.state.user_name.length <= 3 ? "text-danger" : "")} placeholder="Enter your user name" type="text" onChange={this.handleUserNameChange}/>
                                <div className="form-text pt-1">User name should have at least 4 letters.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="name" className={"form-control ".concat(this.state.name.length <= 4 ? "text-danger" : "")} placeholder="Enter your name" type="text" onChange={this.handleNameChange}/>
                                <div className="form-text pt-1">Your real name.</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="last_name" className={"form-control ".concat(this.state.last_name.length <= 2 ? "text-danger" : "")}  placeholder="Enter your last name" type="text" onChange={this.handleLastNameChange}/>
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
                                <input name="password" className={"form-control ".concat(this.state.password.length <= 4 ? "text-danger" : "")}  placeholder="Enter your password" type="password" onChange={this.handlePasswordChange}/>
                                <div className="form-text pt-1">Password should have at least 4 letters.</div>
                            </div>
                        </div>
                        <span></span>
                        <button type="button" className="btn btn-primary mt-3 position-centre" onClick={this.createUser}>Confirm</button>

                        {this.state.error.status ? (<div className="text-danger">{this.state.error.message}</div>) : (<div className="text-success">{this.state.success}</div>)}
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