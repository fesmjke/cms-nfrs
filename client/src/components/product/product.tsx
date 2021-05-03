import React from "react";
import ProductItem from "../product-item";
import { RouteComponentProps } from "react-router-dom";

interface ProductProps extends RouteComponentProps<{
    category? : string;
    id? : string;
}>{}

export default class Products extends React.Component<ProductProps>{
    constructor(props : ProductProps){
        super(props);
    }
    
    render(){

        return(
            <div>Products {this.props.match.params.category + '' +this.props.match.params.id}
                <div>
                    <ProductItem/>
                </div>
            </div>
        )
    }
}

