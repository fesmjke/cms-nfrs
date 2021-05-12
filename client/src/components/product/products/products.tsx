import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import ProductService from "../../../services/product.service";
import { IProductAnswerSuccess, ProductActions, ProductActionTypes } from "../../../store/reducers/product/types";
import { RootState } from "../../../store/types";
import { IProduct } from "../../../types/interfaces/product";
import Loader from "../../loader";
import ProductItem from "../../product-item";

interface ProductsState {
    products : IProduct[],
    loading : boolean;
}

class Products extends React.Component<ProductsComponentProps,ProductsState>{
    private _productService : ProductService;

    async componentDidMount(){
        const products : IProduct[] = await this._productService.loadProducts();
        
        this.props.loadProducts();

        this.props.loadProductsSuccess({products : products})

        setTimeout(() => {
            this.setState({products : products,loading : false})
        }, 1000);
    }

    constructor(props : ProductsComponentProps){
        super(props);
        this._productService = new ProductService();
        this.state = {
            products : [],
            loading : true
        }
    }

    createProducts = () => {
        return this.state.products.map((product : IProduct) => {
            return <ProductItem stock={product.activation_code.length} discount={product.discount} title={product.title} image={product.image_url} price={product.price} id={product._id}/>
        })
    }

    render(){
        const products = this.createProducts();

        return(
            <div className="album py-5">
                <div className="row">
                    <h3>Products</h3>
                    <hr />
                    {this.state.loading ? <Loader/> : products}
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<ProductActions>) => {
    return {
        loadProducts : () => dispatch({type : ProductActionTypes.PRODUCT_LOAD}),
        loadProductsSuccess : (productAnswerSuccess : IProductAnswerSuccess) => dispatch({type : ProductActionTypes.PRODUCT_LOAD_SUCCESS,products : productAnswerSuccess}) 
    }
}

const mapStateToProps = (state : RootState) => {
    return state.product;
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type ProductsComponentProps = ConnectedProps<typeof connector>;

export default connector(Products);