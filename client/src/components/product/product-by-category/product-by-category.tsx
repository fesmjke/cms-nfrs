import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import ProductService from "../../../services/product.service";
import { IProductAnswerSuccess, ProductActions, ProductActionTypes } from "../../../store/reducers/product/types";
import { RootState } from "../../../store/types";
import { IProduct } from "../../../types/interfaces/product";
import ProductItem from "../../product-item";

interface ProductsByCategoryState {
    products : IProduct[]
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

        this.setState({products : products})
    }

    constructor(props : ProductsByCategoryComponentProps & ProductsByCategoryProps){
        super(props);
        this._productService = new ProductService();
        this.state = {
            products : []
        }
    }

    createProducts = () => {
        return this.state.products.map((product : IProduct) => {
            return <ProductItem title={product.title} image={product.image_url} price={product.price} id={product._id}/>
        })
    }

    render(){
        const products = this.createProducts();

        return(
            <div className="album py-5">
                {products.length ? products : <h2>Currently no availiable products in this category...</h2>}
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