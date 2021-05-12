import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import ProductService from "../../../services/product.service";
import { IProductAnswerSuccess, ProductActions, ProductActionTypes } from "../../../store/reducers/product/types";
import { RootState } from "../../../store/types";
import { IProduct } from "../../../types/interfaces/product";
import ProductItem from "../../product-item";
import Loader from "../../loader";

interface ProductsByCategoryState {
    products : IProduct[],
    loading : boolean;
}

interface ProductsByCategoryProps {
    categoryId : string;
}

class ProductsByCategory extends React.Component<ProductsByCategoryComponentProps & ProductsByCategoryProps,ProductsByCategoryState>{
    private _productService : ProductService;

    async componentDidMount(){
        const products : IProduct[] = await this._productService.loadProductByCategory(this.props.categoryId);
        
        this.props.loadProducts();

        this.props.loadProductsSuccess({products : products})

        setTimeout(() => {
            this.setState({products : products,loading : false})
        },2000)
    }

    constructor(props : ProductsByCategoryComponentProps & ProductsByCategoryProps){
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
                
                <div className="container">
                <h3>Products</h3>
                <hr/>
                <div className="row">

                    {this.state.loading ? <Loader/> : products.length ? products : <h2>Currently no availiable products in this category...</h2>}

                </div>
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

type ProductsByCategoryComponentProps = ConnectedProps<typeof connector>;

export default connector(ProductsByCategory);   