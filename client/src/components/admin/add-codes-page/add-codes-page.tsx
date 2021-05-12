import React from "react";
import ProductService from "../../../services/product.service";
import { IProduct } from "../../../types/interfaces/product";

interface AddCodesPageState {
    products : IProduct[],
    current_product : IProduct,
    currentProductSelected : boolean;
    onAddStatus : {
        message : string;
        status : boolean;
    },
    code : string;
}

export default class AddCodesPage extends React.Component<{},AddCodesPageState>{
    private _productService : ProductService;
    
    constructor(props : any){
        super(props);

        this._productService = new ProductService();

        this.state = {
            products : [],
            currentProductSelected : false,
            current_product : {
                _id : '',
                title : '',
                category : '',
                description : '',
                activation_code : [''],
                developer : '',
                discount : '',
                image_url : '',
                price : '',
                reviewies : [{message : '',user_id : ''}],
            },
            onAddStatus : {
                message : '',
                status : false
            },
            code : ''
        }
    }

    async componentDidMount(){
        const loadedProducts = await this._productService.loadProducts();

        this.setState({products : loadedProducts})
    }
    
    clearInput = () => {
        this.setState({code : ''})
    }

    onAdd = () => {
        const regexp = /^([A-Za-z0-9]{5}-){4}[A-Za-z0-9]{5}$/;

        if(!this.state.currentProductSelected){
            this.setState({onAddStatus : {message : "Product is not selected!",status : true}})
            return
        }

        if(regexp.test(this.state.code)){
            this._productService.addNewCode(this.state.current_product._id,this.state.code)
            this.clearInput();
            this.setState({onAddStatus : {message : "Code is successfully added!",status : false}})
        }else{
            this.setState({onAddStatus : {message : "Code is not assigned to pattern: #####-#####-#####-#####-#####",status : true}})
        }
    }

    handleCode = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({code : e.target.value})
    }

    selectProduct = (id : string) => {
        const product = this.state.products.filter((product) => {return product._id === id})[0];
        
        this.setState({current_product : product,currentProductSelected : true});
    }

    createTableOfCodes = () => {
        return this.state.current_product.activation_code.map((code,index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <th>{code}</th>
                </tr>
            )
        })
    }

    createProductList = () => {
        return this.state.products.map((product) => {
            return (
                <li className={"list-group-item ".concat(this.state.current_product._id === product._id ? 'active' : '')}
                    onClick={() => this.selectProduct(product._id)}>
                    {product.title}
                </li>
            )
        })
    }

    render(){
        const productList = this.createProductList();
        const createTableOfCodes = this.createTableOfCodes();

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h5 className="mt-3">Add codes page</h5>
                        <ul className="list-group">
                            {productList}
                        </ul>
                    </div>
                    <div className="col-lg-6 mt-3">
                        <div className="row g-3">
                            <div className="col-sm">
                                <label htmlFor="title" className="form-label">Code</label>
                                <input type="text" className="form-control" onChange={this.handleCode} value={this.state.code}/>
                                {this.state.onAddStatus.status ? <p className="text-danger mt-3">{this.state.onAddStatus.message}</p> : <p className="text-success mt-3">{this.state.onAddStatus.message}</p>}
                            </div>
                            <div className="d-flex justify-content-between">
                                
                                <button className="w-100 btn btn-primary btn m-1" onClick={this.onAdd}>Add</button>
                                {/* <button className="w-100 btn btn-primary btn m-1" >Update</button>
                                <button className="w-100 btn btn-primary btn m-1" >Delete</button> */}
                            </div>
                        </div>
                    </div>
                    {this.state.currentProductSelected ? <div className="col-lg-3 mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        #
                                    </th>
                                    <th scope="col">
                                        Code
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {createTableOfCodes}
                            </tbody>
                        </table>
                    </div> : null}
                </div>
            </div>
        )
    }
}