import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { createCategory24, createProduct24 } from "../../../images";
import { RootState } from "../../../store/types";

class AdminBar extends React.Component<AdminBarComponentProps>{
    render(){
        return(
            (this.props.role === "admin" ? 
            <React.Fragment>
                <li>
                    <Link className="nav-link text-secondary mt-3" to="/category-create"><img src={createCategory24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Category create</Link>
                </li>
                <li>
                    <Link className="nav-link text-secondary mt-3" to="/product-create"><img src={createProduct24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Product create</Link>
                </li>
            </React.Fragment> : null)
        )
    }
}

const mapStateToProps = (state : RootState) => {
    return state.auth;
  }
  
  const connector = connect(mapStateToProps);
  
  type AdminBarComponentProps = ConnectedProps<typeof connector>;
  
export default connector(AdminBar);