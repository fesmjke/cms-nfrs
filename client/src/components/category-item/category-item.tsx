import React from "react";

interface ICategoryItemProps {
    id : string;
    title : string;
    description : string;
    image_path : string;
} 

export default class CategoryItem extends React.Component<ICategoryItemProps,{}>{
    render(){
        const categoryItem = (
        <div className="col d-flex align-items-start p-3">
            <img src={`/api/static/${this.props.image_path}`} alt="" />
            <div key={this.props.id} onClick={() => { console.log("clicked category",this.props.id) }}>
                <h4 className="fw-bold m-2">
                    {this.props.title}
                </h4>
                <p className="mt-2">
                    {this.props.description}
                </p>        
            </div>
        </div>)
        return categoryItem;
    }
}