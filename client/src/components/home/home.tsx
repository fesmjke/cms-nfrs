import React from "react";
import { logo256 } from "../../images";

export default class Home extends React.Component{
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
                    <div className="d-grid d-sm-flex justify-content-centre">
                        <button className="w-50 btn btn-primary">Learn more about us...</button>
                        <span className="m-3"></span>
                        <button className="w-50 btn btn-primary">Start browse software now!</button>
                    </div>
                </div>
            </div>
        )
    }
}