import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { user24 } from "../../../images";
import { RootState } from "../../../store/types";

class UserBar extends React.Component<UserBarComponentProps>{

    constructor(props : UserBarComponentProps){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                {this.props.token && this.props.role === "user" ? <React.Fragment>
                  {/* <li>
                    <Link className="nav-link text-secondary" to="/profile"><img src={user24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Profile</Link>
                  </li> */}
                </React.Fragment> : null}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state : RootState) => {
    return state.auth;
}

const connector = connect(mapStateToProps);

type UserBarComponentProps = ConnectedProps<typeof connector>;

export default connector(UserBar);