import React from "react";
import ProductsByCategory from "./product-by-category";
import ProductById from "./product-by-id";
import Products from "./products";
import { RouteComponentProps } from "react-router-dom";

interface ProductProps extends RouteComponentProps<{
    category? : string;
    id? : string;
}>{}

export default class Product extends React.Component<ProductProps>{
    constructor(props : ProductProps){
        super(props);
    }
    
    render(){

        const whatToRender = this.props.match.params.category ? <ProductsByCategory categoryId={this.props.match.params.category}/> : this.props.match.params.id ? <ProductById productId={this.props.match.params.id}/> : <Products/>

        return(
            <div>
                <div>
                    {whatToRender}
                </div>
            </div>
        )
    }
}

