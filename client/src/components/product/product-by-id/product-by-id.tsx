import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import CategoryService from "../../../services/category.service";
import ProductService from "../../../services/product.service";
import { IProductAnswerSuccess, ProductActions, ProductActionTypes } from "../../../store/reducers/product/types";
import { RootState } from "../../../store/types";
import { IProduct } from "../../../types/interfaces/product";
import UserService from "../../../services/user.service";
import { CartActions, CartActionTypes, IProductInCart, IProductRemove } from "../../../store/reducers/cart/types";
import Loader from "../../loader";

interface ProductsByIdState {
    product : IProduct,
    categoryDetails : {
        id : string;
        title : string;
    },
    reviewies : {
        user_name : string;
        message : string;
    }[],
    user_review : string;
    send_review : boolean;
    redirectToCategory : boolean;
    isProductInCart : boolean;
    loading : boolean;
}

interface ProductsByIdProps {
    productId : string;
}

class ProductsById extends React.Component<ProductsByIdComponentProps & ProductsByIdProps,ProductsByIdState>{
    private _productService : ProductService;
    private _categoryService : CategoryService;
    private _userService : UserService;

    async componentDidMount(){
        const product : IProduct = await this._productService.loadProductById(this.props.productId);
        
        console.log(product.reviewies)

        const category = await this._categoryService.loadCategoryById(product.category);
        
        this.props.loadProducts();

        this.props.loadProductsSuccess({products : [product]})

        this.setState({product : product})

        const reviewies =  await this.loadReviews();

        this.setState({reviewies : reviewies})

        this.setState({categoryDetails : {title : category.title,id : category._id},loading : false})

        this.isProductInCart();
    }

    constructor(props : ProductsByIdComponentProps & ProductsByIdProps){
        super(props);
        this._productService = new ProductService();
        this._categoryService = new CategoryService();
        this._userService = new UserService();
        this.state = {
            product : {
                _id : '',
                category : '',
                description : '',
                activation_code : [''],
                developer : '',
                discount : '',
                image_url : '',
                price : '',
                title : '',
                reviewies : [{
                    message : '',
                    user_id : ''
                }]
            },
            reviewies : [{
                message : '',
                user_name : ''
            }],
            categoryDetails : {
                id : '',
                title : ''
            },
            send_review : false,
            user_review : "",
            redirectToCategory : false,
            isProductInCart : false,
            loading : true
        }
    }

    loadReviews = async () => {
        return  Promise.all(this.state.product.reviewies.map(async (review) => {

            const user = await this._userService.loadUserById(review.user_id);
            
            return {user_name : user.body?.user_name,message : review.message}
        }))
    }

    sendReview = async () => {
        await this.setState({send_review : true});
        console.log(this.state.send_review)
        await this._productService.addNewReview(this.state.product._id,this.props.auth.profile.id,this.state.user_review);
        await this.setState({send_review : false});
        window.location.reload();
    }

    createReaviews = () => {
        return this.state.reviewies.map((review) => {
            return (
                <div className="card-body">
                    <p>
                        {review.message}
                    </p>
                    <small className="text-muted">Posted by {review.user_name}</small>
                    <hr />
                </div>
            )
        } )
    }

    handleRedirectToCategory = () => {
        this.setState({redirectToCategory : true})
    }

    handleUserReview = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({user_review : e.target.value})
    }

    handleRemoveFromCart = () => {
        this.props.removeFromCart({id : this.state.product._id});
        this.setState({isProductInCart : false})
    }

    handleAddToCart = () => {
        this.props.addToCart({id : this.state.product._id,discount : this.state.product.discount,
                            price : this.state.product.price,title : this.state.product.title})
        this.setState({isProductInCart : true});
    }

    isProductInCart = () => {
        if(this.props.cart.cart.filter((product) => product.id === this.state.product._id).length){
            this.setState({isProductInCart : true})
        }
    }

    render(){
        const reviewies = this.createReaviews();

        return(
            <div className="container">
                {!this.state.loading ? <div className="row">
                    <div className="col-lg-3 mt-4">
                        <img src={`/api/static/${this.state.product.image_url}`} className="card-img-top img-fluid" alt=""/>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-outline-secondary" onClick={this.handleRedirectToCategory}>Back to <span className="text-primary">{this.state.categoryDetails.title} {this.state.redirectToCategory ? <Redirect to={`/products/category/${this.state.categoryDetails.id}`}/> : null}</span></button>
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-9 bg-light">
                        <div className="card mt-4">
                            <div className="card-body">
                                <h3 className="card-title mb-4">{this.state.product.title}</h3>
                                <hr></hr>
                                {this.state.product.activation_code.length ? null : <h5 className="card-text text-warning mb-4">Out of stock</h5>}
                                <h4 className="card-text"><span className="text-">Price</span>: {this.state.product.discount ? +this.state.product.price - ((+this.state.product.price) * (+this.state.product.discount/100)) : this.state.product.price}₴ {+this.state.product.discount ? <span className="text-decoration-line-through text-danger">{+this.state.product.discount ? this.state.product.price : null} ₴</span> : null}</h4>
                                <p className="card-text mt-4">
                                    {this.state.product.description}
                                </p>
                                {/* <span className="text-warning">{this.state.product.}</span> */}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div className="btn-group">
                                        {this.state.isProductInCart ? <button type="button" className="btn btn-outline-success" onClick={this.handleRemoveFromCart}>Remove from cart</button> : <button type="button" className="btn btn-outline-success" onClick={this.handleAddToCart} disabled={this.state.product.activation_code.length ? false : true}>Add to cart</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">Reviews</div>
                                {reviewies.length ? reviewies : (<div className="card-body">{"At current time,this product don't have any review"}</div>)}
                                <div className="form-group m-2">
                                    <textarea className="form-control" placeholder="Leave your review here :)" onChange={this.handleUserReview}></textarea>
                                </div>
                            <button type="button" className="mt-4 btn btn-success" disabled={this.props.auth.profile.user_name.length > 0 ? false : true} onClick={this.sendReview}>Leave review</button>
                        </div>
                    </div>
                </div> : <Loader/>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<ProductActions | CartActions>) => {
    return {
        loadProducts : () => dispatch({type : ProductActionTypes.PRODUCT_LOAD}),
        loadProductsSuccess : (productAnswerSuccess : IProductAnswerSuccess) => dispatch({type : ProductActionTypes.PRODUCT_LOAD_SUCCESS,products : productAnswerSuccess}), 
        addToCart : (productToCart : IProductInCart) => dispatch({type : CartActionTypes.ADD_TO_CART,product : productToCart}),
        removeFromCart : (productRemoveFrom : IProductRemove) => dispatch({type : CartActionTypes.REMOVE_FROM_CART,product : productRemoveFrom})
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        product : state.product,
        auth : state.auth,
        cart : state.cart
    };
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type ProductsByIdComponentProps = ConnectedProps<typeof connector>;

export default connector(ProductsById);   