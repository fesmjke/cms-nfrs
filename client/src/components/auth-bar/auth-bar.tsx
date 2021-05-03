import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import { AuthActions, AuthActionTypes, IAuthLoadUserFail, IAuthLoadUserSuccess } from "../../store/reducers/auth/types";
import { RootState } from "../../store/types";
import LogOut from "../log-out";

class AuthBar extends React.Component<AuthBarComponentProps>{
    
    constructor(props : AuthBarComponentProps){
        super(props);
    }

    render(){
        return(
            (this.props.status === "GUEST" ? 
            <React.Fragment>
                <li>
                    <Link className="nav-link text-secondary mt-3" to="/signin">Sign In</Link>
                </li>
                <li>
                    <Link className="nav-link text-secondary mt-3" to="/signup">Sign Up</Link>
                </li>
            </React.Fragment> : 
            <React.Fragment>
                <LogOut/>
            </React.Fragment>)
        )
    }
}

// const mapDispatchToProps = (dispatch : Dispatch<AuthActions>) => {
//     return {
//         loadUser : () => dispatch({type : AuthActionTypes.AUTH_LOAD_USER}),
//         loadUserSuccess : (authAnswer : IAuthLoadUserSuccess) => dispatch({type : AuthActionTypes.AUTH_LOAD_USER_SUCCESS,authAnswer : authAnswer}),
//         loadUserFail : (authAnswer : IAuthLoadUserFail) => dispatch({type : AuthActionTypes.AUTH_LOAD_USER_FAIL,authAnswer : authAnswer})    
//     }
// }
  
  const mapStateToProps = (state : RootState) => {
    return state.auth;
  }
  
  const connector = connect(mapStateToProps);
  
  type AuthBarComponentProps = ConnectedProps<typeof connector>;
  
  export default connector(AuthBar);