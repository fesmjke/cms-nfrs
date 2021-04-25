import React from "react";

export default class SignIn extends React.Component{
    render(){
        return(
            <div>
                <h2>Sign In</h2>
                <form>
                    <input type="email"/>
                    <span> </span>
                    <input type="password"/>
                </form>
            </div>
        )
    }
}