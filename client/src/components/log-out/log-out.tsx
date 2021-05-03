import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { logout24 } from "../../images";
import LogOutService from "../../services/log-out.service";
import { AuthActions, AuthActionTypes, IAuthAnswer, IAuthAnswerError, IAuthLogOutAnswer, IAuthLogOutAnswerFail } from "../../store/reducers/auth/types";
import { RootState } from "../../store/types";

class LogOut extends React.Component<LogOutComponentProps>{
    private _logOutService : LogOutService;

    constructor(props : LogOutComponentProps){
        super(props);
        this._logOutService = new LogOutService();
    }
    
    private onClickLogOut = async (id : string) => {
        this.props.logOut();
        this.props.logOutSuccess({id : "1",message : ""});
    }

    render(){
        return(
            <React.Fragment>
                <li>
                    <Link className="nav-link text-secondary" to="/logout" onClick={() => {this.onClickLogOut(this.props.profile.id)}}><img src={logout24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Log Out</Link>
                </li>
            </React.Fragment>
        )
    }
}


const mapDispatchToProps = (dispatch : Dispatch<AuthActions>) => {
    return {
        logOut : () => dispatch({type : AuthActionTypes.AUTH_LOG_OUT}),
        logOutSuccess : (authAnswer : IAuthLogOutAnswer) => dispatch({type : AuthActionTypes.AUTH_LOG_OUT_SUCCESS,authAnswer : authAnswer}),
        logOutFail : (authAnswer : IAuthLogOutAnswerFail) => dispatch({type : AuthActionTypes.AUTH_LOG_OUT_FAIL,authAnswer : authAnswer})
    }
}

const mapStateToProps = (state : RootState) => {
    return state.auth;
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type LogOutComponentProps = ConnectedProps<typeof connector>;

export default connector(LogOut);