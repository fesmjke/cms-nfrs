import React from "react";
import { Redirect } from "react-router-dom";

interface ProductProps{
    id : string;
    title : string;
    price : string;
    stock : number;
    discount : string;
    image : string;
}

interface ProductState{
    redirect : boolean;
}

export default class ProductItem extends React.Component<ProductProps,ProductState>{
    
    constructor(props : ProductProps){
        super(props);
        this.state = {
            redirect : false
        }
    }


    redirectHandle = () => {
        this.setState({redirect : true})
    }
    
    render(){
        return(
            <div className="col-3">
                <div className="card mb-4 box-shadow">
                            <img src={`/api/static/${this.props.image}`} style={{height : "225px", width: "100%", display: "block"}} alt=""/>
                            <div className="card-body">
                                <h5 className="card-title mb-3">{ this.props.title }</h5>
                                {console.log(this.props.stock)}
                                {this.props.stock == 0 ? <h6 className="card-title mb-3 text-danger">Out of stock</h6> : null}
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.redirectHandle}>{this.state.redirect ? <Redirect to={`/product/${this.props.id}`}/> : "Learn more..."}</button>
                                    </div>
                                    <p className="card-text"><b>Price: <span className="text-primary">{this.props.discount ? +this.props.price - ((+this.props.price) * (+this.props.discount/100)) : this.props.price}</span> ₴</b> <span className="text-decoration-line-through text-danger">{+this.props.discount ? this.props.price : null} ₴</span></p>
                                </div>
                            </div>
                </div>
            </div>
        )
    }
}