import React from "react";
import { Link, Redirect } from "react-router-dom";
import { logo256 } from "../../images";

interface HomeState {
    redirect : boolean;
}

export default class Home extends React.Component<{},HomeState>{
    
    constructor(props : any){
        super(props);
        this.state = {
            redirect : false   
        }
    }

    redirect = () => {
        this.setState({redirect : true})
    }

    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to="/categories"></Redirect>
        }
    }
    
    render(){
        return(
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={logo256} alt="" width="72" height="72"></img>
                <h1 className="display-5 fw-bold">Any Software</h1>
                <div className="col-lg-6 mx-auto">
                    <h5 className="mb-4 mt-4">
                        Quick purchase any software
                    </h5>
                    <h5 className="mb-4">
                        Always sale
                    </h5>
                    <h5 className="mb-4">
                        Best prices
                    </h5>
                    <h5 className="mb-4">
                        Wide choice
                    </h5>
                    <div className="d-grid d-sm-flex justify-content-center">
                        <span className="m-3"></span>
                        <button className="w-50 btn btn-primary" onClick={this.redirect}>{this.renderRedirect()}Start browse software now!</button>
                    </div> 
                </div>
            </div>
        )
    }
}