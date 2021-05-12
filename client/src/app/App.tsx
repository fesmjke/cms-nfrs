import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter as Router,
  Link,
  Switch,
  Route, 
  Redirect} from "react-router-dom";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import Categories from "../components/categories";
import AuthBar from "../components/auth-bar";
import UserBar from "../components/user/user-bar"
import UserProfile from "../components/user/profile";
import Products from "../components/product";
import LeftSide from "../components/left-side";
import Home from "../components/home";
import { AuthActions, AuthActionTypes, IAuthAnswer, IAuthAnswerError } from "../store/reducers/auth/types";
import { RootState } from "../store/types";

import { cart24, categories24,home24,info24,products24,user24,logo24 } from "../images";
import Cart from "../components/cart";
import AdminBar from "../components/admin/admin-bar";
import CreateCategoryPage from "../components/admin/create-category-page";
import AddCodesPage from "../components/admin/add-codes-page";
import CreateProductPage from "../components/admin/create-product-page";
import ProductOrders from "../components/admin/product-orders";

class App extends React.Component<AppComponentProps,{}>{
  constructor(props : AppComponentProps){
    super(props);
  }
  
  render(){
    return (
      <Router>
        <header className="px-3 py-2 bg-dark text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"><img src={logo24} alt=""/></a>
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <Link className="nav-link text-secondary" to="/"><img src={home24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Home</Link>
                </li>
                <li>
                  <Link className="nav-link text-secondary" to="/about"><img src={info24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>About</Link>
                </li>
                <li>
                  <Link className="nav-link text-secondary" to="/categories"><img src={categories24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Categories</Link>
                </li>
                <li>
                  <Link className="nav-link text-secondary" to="/products"><img src={products24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Products</Link>
                </li>
                <li>
                  <Link className="nav-link text-secondary" to="/cart"><img src={cart24} className="bi d-block mx-auto mb-1" style={{width : "24px",height : "24px"}}/>Cart</Link>
                </li>
                <UserBar/>
                <AuthBar/>
              </ul>
            </div>
          </div>
          {this.props.role === 'admin' ? <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"></a>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <AdminBar/>
            </ul></div>
          </div> : null}
        </header>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/about">
              <h3> About </h3>
            </Route>
            <Route path="/categories"> 
              <Categories/>
            </Route>
            <Route path="/products/category/:category" render={(props) => <Products {...props}/>}> 
            </Route>
            <Route path="/product/:id" render={(props) => <Products {...props}/>}> 
            </Route>
            <Route path="/products" render={(props) => <Products {...props}/>}> 
            </Route>
            <Route path="/cart">
              <Cart/>
            </Route>
            {
              this.props.status === "GUEST" ? 
              <React.Fragment>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/signup">
                  <SignUp/>
                </Route>
                <Route path="/logout">
                  <Redirect to="/"/>
                 </Route>
                 <Route path="/profile">
                   <Redirect to="/"></Redirect>
                 </Route>
              </React.Fragment>
               : this.props.token && this.props.role === "admin" ? <React.Fragment>
                    <Route path="/category-create">
                     <CreateCategoryPage/>
                   </Route>
                   <Route path="/product-create">
                    <CreateProductPage/>
                    </Route>
                    <Route path="/product-add-codes">
                    <AddCodesPage/>
                    </Route>
                    <Route path="/product-orders">
                    <ProductOrders/>
                    </Route>
             </React.Fragment> : this.props.token && this.props.role === "user" ? <React.Fragment>
                 <Route path="/profile" >
                   <UserProfile />
                 </Route>
                 <Route path="/signin">
                    <Redirect to="/"/>
                  </Route>
                  <Route path="/signup">
                    <Redirect to="/"/>
                  </Route>
                  <Route path="/logout">
                    <Redirect to="/"/>
                  </Route>
               </React.Fragment> : 
               <React.Fragment>
                <Redirect to="/"></Redirect>
               </React.Fragment>
            }
          </Switch>
        </div>
      </Router>
    );
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

type AppComponentProps = ConnectedProps<typeof connector>;

export default connector(App);