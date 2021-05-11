import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import ProductService from "../../../services/product.service";
import { IProductAnswerSuccess, ProductActions, ProductActionTypes } from "../../../store/reducers/product/types";
import { RootState } from "../../../store/types";
import { IProduct } from "../../../types/interfaces/product";
import ProductItem from "../../product-item";

interface ProductsState {
    products : IProduct[]
}

class Products extends React.Component<ProductsComponentProps,ProductsState>{
    private _productService : ProductService;

    async componentDidMount(){
        const products : IProduct[] = await this._productService.loadProducts();
        
        this.props.loadProducts();

        this.props.loadProductsSuccess({products : products})

        this.setState({products : products})
    }

    constructor(props : ProductsComponentProps){
        super(props);
        this._productService = new ProductService();
        this.state = {
            products : []
        }
    }

    createProducts = () => {
        return this.state.products.map((product : IProduct) => {
            return <ProductItem discount={product.discount} title={product.title} image={product.image_url} price={product.price} id={product._id}/>
        })
    }

    render(){
        const products = this.createProducts();

        return(
            <div className="album py-5">
                {products}
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