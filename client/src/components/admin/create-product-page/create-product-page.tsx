import React from "react";

export default class CreateProductPage extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h3 className="mt-3"> Create Product Page</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Product #1
                            </li>
                            <li className="list-group-item">
                                Product #2
                            </li>
                            <li className="list-group-item">
                                Product #3
                            </li>
                            <li className="list-group-item">
                                Product #4
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                    <h4 className="mb-3">Product information</h4>
                        <img src="https://via.placeholder.com/200x200" alt="" className="mb-2"/>
                        <form>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="name" className="form-label">Title</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastname" className="form-label">Price</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Description</label>
                                    <div className="input-group">
                                        <textarea className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Category</label>
                                    <select className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Image</label>
                                    <input type="file" className="form-control"></input>
                                </div>
                                <button className="w-100 btn btn-primary btn-lg">Checkout</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3">
                        <div>
                            Preview
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}