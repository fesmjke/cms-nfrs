import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { remove24 } from "../../images";
import OrderService from "../../services/order.service";
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
    },
    payment : {
        full_name : string;
        credit_card_number : string;
        card_expiration : string;
        cvv : string;
    },
    paid : {
        message : string;
        status : boolean;
    },
    error : {
        message : string;
        status : boolean;
    };
}

class Cart extends React.Component<CartComponentProps,CartState>{
    private _orderService : OrderService;
    
    constructor(props : CartComponentProps){
        super(props);
        this._orderService = new OrderService();
        this.state = {
            cart : [],
            customerDetails : {
                email : '',
                last_name : '',
                name : '',
                phone_number : '',
                user_name : ''
            },payment : {
                card_expiration : '',credit_card_number : '',cvv : '',full_name : ''
            },
            paid : {
                message : '',
                status : false
            },
            error : {
                message : '',
                status : false
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

    countTotalDiscount = () => {
        const priceList = this.props.cart.cart.map((product) => {
            return +product.discount
       })
       return this.props.cart.cart.length ? priceList.reduce((acc,value) => {return acc + value}) : null;
    }

    clearCart = () => {
        for (const product of this.state.cart) {
            this.props.removeFromCart({id : product.id})
        }

        this.setState({cart : []});
    }

    clearPayment = () => {
        this.setState({
            payment : {
                full_name : '',
                card_expiration : '',
                credit_card_number : '',
                cvv : ''
            }
        })
    }

    removeProductFromCart = (id : string) => {
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
                    <span className="text-muted align-self-center">{product.discount ? +product.price - ((+product.price) * (+product.discount/100)) : product.price} ₴</span>
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

    private handleNameOnCardChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({payment : {...this.state.payment,full_name : e.target.value}})
    }

    private handleCardNumberChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({payment : {...this.state.payment,credit_card_number : e.target.value}})
    }

    private handleCardExpChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({payment : {...this.state.payment,card_expiration : e.target.value}})
    }

    private handleCardCVVChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({payment : {...this.state.payment,cvv : e.target.value}})
    }

    checkCardFields = () => {
        if(this.state.payment.full_name.length <= 1){
            this.setState({error : {message : "Full name on card should be fully filled!",status : true}});
            return true
        }
        if(this.state.payment.credit_card_number.length != 16){
            this.setState({error : {message : "Card number should be fully filled!",status : true}});
            return true
        }
        if(this.state.payment.card_expiration.length != 5){
            this.setState({error : {message : "Expiration date on card should be fully filled! Example : 00/00",status : true}});
            return true
        }
        if(this.state.payment.cvv.length != 3){
            this.setState({error : {message : "CVV field should be fully filled!",status : true}});
            return true
        }
        return false
    }

    onOrderClick = async () => {
        const totalPrice = this.countTotalPrice();
        const totalDiscount = this.countTotalDiscount();

        const price = totalPrice ? totalDiscount ? totalPrice - (totalPrice * totalDiscount/100) : totalPrice : 0;
        const productsInCart = this.state.cart.map((product) => {return product.id});

        const error = this.checkCardFields();

        if(!error){
            if(this.props.auth.profile.id){
                const answer = await this._orderService.createOrder({email : this.state.customerDetails.email,name : this.state.customerDetails.name,last_name : this.state.customerDetails.last_name,
                    total_price : price.toString(),products : productsInCart,status : "paid",user_id : this.props.auth.profile.id})
                if(answer.status === "paid") {
                    this.clearCart(); 
                    this.clearPayment();
                    this.setState({error : {message : "",status : false}});
                    this.setState({paid : {message : "Order are successfully paid. Please check your email! Have a good day!",status : true}})
                }else{
                    this.setState({paid : {message : "Something is going wrong!",status : false}})
                }
            }else{
                const answer = await this._orderService.createOrder({email : this.state.customerDetails.email,name : this.state.customerDetails.name,last_name : this.state.customerDetails.last_name,
                    total_price : price.toString(),products : productsInCart,status : "paid"})
                if(answer.status === "paid") {
                    this.clearCart();
                    this.clearPayment();
                    this.setState({error : {message : "",status : false}});
                    this.setState({paid : {message : "Order are successfully paid. Please check your email! Have a good day!",status : true}})
                }else{
                    this.setState({paid : {message : "Something is going wrong!",status : false}})
                }
            }
        }
    }

    render(){
        const listOfProducts = this.createListOfProduct();
        const totalPrice = this.countTotalPrice();
        const totalDiscount = this.countTotalDiscount();

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
                                <strong>{totalPrice ? totalDiscount ? totalPrice - (totalPrice * totalDiscount/100) : totalPrice : 0} ₴</strong>
                            </li>
                        </ul>
                        {this.state.error.status ? <h4 className="text-danger">{this.state.error.message}</h4> : <h4 className="text-success">{this.state.paid.message}</h4>}
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
                            </div>
                        </form>
                        <hr/>
                        <h4 className="mb-3">Payment</h4>
                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label className="form-label">Name on card</label>
                                <input type="text" className="form-control" onChange={this.handleNameOnCardChange}/>
                                <small className="text-muted">Full name as displayed on card</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Credit card number</label>
                                <input type="text" className="form-control" onChange={this.handleCardNumberChange}/>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Expiration</label>
                                <input type="text" className="form-control" onChange={this.handleCardExpChange}/>
                                <small className="text-muted">Example: 00/00</small>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">CVV</label>
                                <input type="password" className="form-control" onChange={this.handleCardCVVChange}/>
                                <small className="text-muted">Your CVV code on card</small>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-center">
                            <button className="w-75 btn btn-primary btn" disabled={this.state.cart.length ? false : true} onClick={this.onOrderClick}>Checkout</button>
                        </div>
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