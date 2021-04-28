import React from "react";
import { connect } from "react-redux";
import SignUpService from "../../services/sign-up.service";
import { ISignUp } from "../../types/interfaces/services";
import { IStateSignUp } from "../../types/interfaces/sign-up";



export default class SignUp extends React.Component<any,IStateSignUp> {
    private _signUpService : ISignUp;

    constructor(props : any){
        super(props);
        
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
            <div className="container p-5" style={{maxWidth : "700px"}}>
                <h2 >Sign Up</h2>
                    <form>
                        <div className="row">
                            <div className="col">
                                <input name="user_name" className="form-control" placeholder="Enter your user name" type="text" onChange={this.handleUserNameChange}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="name" className="form-control" placeholder="Enter your name" type="text" onChange={this.handleNameChange}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="last_name" className="form-control" placeholder="Enter your last name" type="text" onChange={this.handleLastNameChange}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="phone_number" className="form-control" placeholder="Enter your phone number" type="tel" onChange={this.handlePhoneNumberChange} />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="email" className="form-control" placeholder="Enter your email" type="email" onChange={this.handleEmailChange}/>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <input name="password" className="form-control" placeholder="Enter your password" type="password" onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        <span></span>
                        <button type="button" className="btn btn-primary mt-3 position-centre" onClick={this.sendRequest}>Confirm</button>
                    </form> 
            </div>
        )
    }
}