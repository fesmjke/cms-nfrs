import React from "react";
import { Redirect } from "react-router-dom";

interface ICategoryItemProps {
    id : string;
    title : string;
    description : string;
    image_path : string;
} 

interface ICategoryItemState {
    redirect : boolean;
}

export default class CategoryItem extends React.Component<ICategoryItemProps,ICategoryItemState>{
    constructor(props : ICategoryItemProps){
        super(props);
        this.state = {
            redirect : false
        }
    }

    setRedirect = () => {
        this.setState({redirect : true})
    }
    
    render(){
        const categoryItem = (
        <div className="col d-flex align-items-start p-3 m-2 shadow" key={this.props.id}>
            <img src={`/api/static/${this.props.image_path}`} alt="" />
            <div onClick={() => { return <Redirect to={`/products/category/${this.props.id}`}/> }}>
                <h4 className="fw-bold m-2">
                    {this.props.title}
                </h4>
                <p className="mt-2">
                    {this.props.description}
                </p>        
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.setRedirect}>Learn more...
                            {this.state.redirect ? <Redirect to={`products/category/${this.props.id}`}/> : null}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
        return categoryItem;
    }
}