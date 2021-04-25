import React from "react";
import SignUpService from "../../services/sign-up.service";
import { ISignUp } from "../../types/interfaces/services";

export default class SignUp extends React.Component<any> {
    private _signUpService : ISignUp;
    
    constructor(props : any){
        super(props);
        this._signUpService = new SignUpService();
    }
    
    private sendRequest = async () => {
        this._signUpService.send();
    }

    render(){
        return(
            <div>
                <h2>Sign Up</h2>
                <form>
                    <input type="email"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="password"/>
                    <span> </span>
                    <button type="button" onClick={this.sendRequest}>Confirm</button>
                </form> 
            </div>
        )
    }
}