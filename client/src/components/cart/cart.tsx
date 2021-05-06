import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { remove24 } from "../../images";
import { CartActions, CartActionTypes, IProductInCart, IProductRemove } from "../../store/reducers/cart/types";
import { RootState } from "../../store/types";

interface CartState {
    cart : IProductInCart[],
    customerDetails : {
        name : string;
        last_name : string;
        user_name : string;
        email : string;
        phone_number : string;
    }
}

class Cart extends React.Component<CartComponentProps,CartState>{
    constructor(props : CartComponentProps){
        super(props);
        this.state = {
            cart : [],
            customerDetails : {
                email : '',
                last_name : '',
                name : '',
                phone_number : '',
                user_name : ''
            }
        }
    }

    componentDidMount(){
        this.setState({
            cart : this.props.cart.cart,
            customerDetails : {
                name : this.props.auth.profile.name,
                email : this.props.auth.profile.email,
                last_name : this.props.auth.profile.last_name,
                user_name : this.props.auth.profile.user_name,
                phone_number : this.props.auth.profile.phone_number
            }
        })
    }

    countTotalPrice = () => {
        const priceList = this.props.cart.cart.map((product) => {
             return +product.price
        })
        return this.props.cart.cart.length ? priceList.reduce((acc,value) => {return acc + value}) : null;
        //return priceList.reduce((acc,current) => acc += current)
    }

    removeProductFromCart = (id : string) => {
        console.log("CLICKED")
        this.props.removeFromCart({id : id})
        
        const pos = this.state.cart.map((product) => {return product.id}).indexOf(id);
            
        const newArr = [...this.state.cart.slice(0,pos),...this.state.cart.slice(pos+1,this.state.cart.length)];

        console.log(newArr)

        this.setState({cart : newArr})
    }

    createListOfProduct = () => {
        return this.state.cart.map((product) => {
            return (
                <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div className="align-self-center">
                            <h6>{product.title}</h6>
                        </div>
                    <span className="text-muted align-self-center">{product.price} ₴</span>
                    <button className="btn btn-sm" onClick={() => this.removeProductFromCart(product.id)}><img src={remove24} alt="" /></button>
                </li>
            )
        })
    }

    private handleUserNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            customerDetails : {
                ...this.state.customerDetails,
                user_name : e.target.value,
            }
        })
    }

    private handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            customerDetails : {
                ...this.state.customerDetails,
                name : e.target.value,
            }
        })
    }
    
    private handleLastNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            customerDetails : {
                ...this.state.customerDetails,
                last_name : e.target.value,
            }
        })
    }
    
    private handlePhoneNumberChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            customerDetails : {
                ...this.state.customerDetails,
                phone_number : e.target.value,
            }
        })
    }

    private handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            customerDetails : {
                ...this.state.customerDetails,
                email : e.target.value,
            }
        })
    }

    render(){
        const listOfProducts = this.createListOfProduct();
        const totalPrice = this.countTotalPrice();

        return(
            <div className="container mt-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Product</span>
                                <span></span>
                                <button className="invisible" disabled><img src={remove24} alt="" /></button>
                            </li>
                            {listOfProducts.length ? listOfProducts : <div className="list-group-item d-flex justify-content-center lh-sm"><div className="align-self-center"><h6>There are no products in your cart</h6></div></div>}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>{totalPrice ? totalPrice : 0} ₴</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Customer information</h4>
                        <form>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="name" className="form-label">First name</label>
                                    <input type="text" className="form-control" value={this.state.customerDetails.name} disabled={this.props.auth.token.length ? true : false} onChange={this.handleNameChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastname" className="form-label">Last name</label>
                                    <input type="text" className="form-control" value={this.state.customerDetails.last_name} disabled={this.props.auth.token.length ? true : false} onChange={this.handleLastNameChange}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">User name</label>
                                    <div className="input-group">
                                        <span className="input-group-text">@</span>
                                        <input type="text" className="form-control" placeholder="Username" value={this.state.customerDetails.user_name} disabled={this.props.auth.token.length ? true : false} onChange={this.handleUserNameChange}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="you@example.com" value={this.state.customerDetails.email} disabled={this.props.auth.token.length ? true : false} onChange={this.handleEmailChange}></input>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Phone number</label>
                                    <input type="email" className="form-control" value={this.state.customerDetails.phone_number} disabled={this.props.auth.token.length ? true : false} onChange={this.handlePhoneNumberChange}></input>
                                </div>
                                <button className="w-100 btn btn-primary btn-lg">Checkout</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<CartActions>) => {
    return {
        removeFromCart : (productRemoveFrom : IProductRemove) => dispatch({type : CartActionTypes.REMOVE_FROM_CART,product : productRemoveFrom})
    }
}

const mapStateToProps = (state : RootState) => {
    return {cart : state.cart,auth : state.auth};
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type CartComponentProps = ConnectedProps<typeof connector>;

export default connector(Cart);