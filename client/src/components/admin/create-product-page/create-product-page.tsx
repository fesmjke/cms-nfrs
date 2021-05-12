import React from "react";
import CategoryService from "../../../services/category.service";
import ProductService from "../../../services/product.service";
import { ICategory } from "../../../types/interfaces/category";
import { IProduct } from "../../../types/interfaces/product";

interface CreateProductPageState {
    products : IProduct[];
    categories : ICategory[];
    current_category : ICategory;
    current_product : IProduct;
    categorySelected : boolean;
    categorySelectedTitle : string;
    newProduct : boolean;
    uploadedFile : File | null;
    fileUploaded : boolean;
}


export default class CreateProductPage extends React.Component<{},CreateProductPageState>{
    private _productService : ProductService;
    private _categoryService : CategoryService;
    
    async componentDidMount(){
        const loadedCategories = await this._categoryService.loadCategories();
        const loadedProducts = await this._productService.loadProducts();

        this.setState({categories : loadedCategories});
        this.setState({products : loadedProducts});
    }

    constructor(props : any){
        super(props);
        this._categoryService = new CategoryService();
        this._productService = new ProductService();
        this.state = {
            products : [],
            categories : [],
            current_category : {
                _id : '',
                description : '',
                image_path : '',
                title : ''
            },
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
            categorySelected : false,
            newProduct : false,
            fileUploaded : false,
            uploadedFile : null,
            categorySelectedTitle : ''
        }
    }
    
    onAddProduct = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const category = this.state.categories.filter((category) => {return category.title === this.state.categorySelectedTitle})[0];
        if(this.state.current_product.title && this.state.current_product.description && this.state.current_product.developer
             && this.state.current_product.discount && this.state.current_product.price && this.state.categorySelectedTitle && this.state.uploadedFile){
                this._productService.createNewProduct({...this.state.current_product,image_url : this.state.uploadedFile,category : category._id})
        }else{
            this._productService.createNewProduct({...this.state.current_product,image_url : undefined,category : category._id})
        }
    }

    onUpdateProduct = () => {
        const category = this.state.categories.filter((category) => {return category.title === this.state.categorySelectedTitle})[0];
        if(this.state.current_product.title && this.state.current_product.description && this.state.current_product.developer
            && this.state.current_product.discount && this.state.current_product.price && this.state.categorySelectedTitle && this.state.uploadedFile){
                this._productService.updateProductById(this.state.current_product._id,{...this.state.current_product,image_url : this.state.uploadedFile,category : category._id})
        }else{
            this._productService.updateProductById(this.state.current_product._id,{...this.state.current_product,image_url : undefined,category : category._id})
        }
    }

    onDeleteProduct = () => {
        if(this.state.current_product._id)
            this._productService.deleteProductById(this.state.current_product._id)
    }

    onNewProduct = () => {
        if (!this.state.newProduct) this.setState({newProduct : true,current_product : {_id : '',activation_code : [''],category : '',description : '',developer : '',discount : '',image_url : '',price : '',reviewies : [{user_id : '',message : ''}],title : ''}})
        else this.setState({newProduct : false})
    }

    createProductImage = () => {
        return (<img src={`/api/static/${this.state.current_product.image_url}`} alt="" className="mb-2"></img>)
    }

    selectProduct = (id : string) => {
        const product = this.state.products.filter((product) => {return product._id === id})[0];
        const category = this.state.categories.filter((category) => {return category._id === product.category})[0];
        this.setState({current_product : product,current_category : category,categorySelected : true,categorySelectedTitle : category.title});
    }

    createOptionList = () => {
        return this.state.categories.map((category) => {
            return (<option value={category.title}>{category.title}</option>)
        })
    }

    createProductList = () => {
        return this.state.products.map((product) => {
            return (
                <li className={"list-group-item ".concat(this.state.newProduct ? "text-decoration-line-through" : "")}
                    onClick={() => !this.state.newProduct ? this.selectProduct(product._id) : null}
                    aria-disabled={this.state.newProduct}>
                    {product.title}
                </li>
            )
        })
    }
    
    handleCategorySelected = (e : React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({categorySelectedTitle : e.target.value})
    }

    handleFileInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ uploadedFile: e.target.files[0],fileUploaded : true});
          }
    }

    handleTitleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({current_product : {...this.state.current_product,title : e.target.value} })
    }

    handlePriceInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({current_product : {...this.state.current_product,price : e.target.value} })
    }

    handleDevInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({current_product : {...this.state.current_product,developer : e.target.value} })
    }

    handleDescInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({current_product : {...this.state.current_product,description : e.target.value} })
    }

    handleDiscountInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({current_product : {...this.state.current_product,discount : e.target.value} })
    }


    render(){
        const productList = this.createProductList();
        const createProductImage = this.createProductImage();
        const createOptionList = this.createOptionList();

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h3 className="mt-3"> Create Product Page</h3>
                        <ul className="list-group">
                            {productList}
                        </ul>
                    </div>
                    <div className="col-lg-6">
                    <h4 className="mb-3 mt-3">Product information</h4>
                        {createProductImage}
                        <form>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={this.state.current_product.title} onChange={this.handleTitleInput}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" className="form-control" value={this.state.current_product.price} onChange={this.handlePriceInput}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="developer" className="form-label" >Developer</label>
                                    <input type="text" className="form-control" value={this.state.current_product.developer} onChange={this.handleDevInput}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="discount" className="form-label" >Discount</label>
                                    <input type="text" className="form-control" value={this.state.current_product.discount} onChange={this.handleDiscountInput}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Description</label>
                                    <div className="input-group">
                                        <textarea className="form-control" value={this.state.current_product.description} onChange={this.handleDescInput}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Category</label>
                                    <select className="form-control" onChange={this.handleCategorySelected} value={this.state.categorySelectedTitle}>
                                        {createOptionList}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Image</label>
                                    <input type="file" className="form-control" onChange={this.handleFileInput}></input>
                                </div>
                                <div className="form-check form-switch m-2 mt-4">
                                    <input className="form-check-input" type="checkbox" onClick={this.onNewProduct} defaultChecked={this.state.newProduct}/>
                                    <label className="form-check-label">New product</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="w-100 btn btn-primary btn m-1" disabled={!this.state.newProduct} onClick={this.onAddProduct}>Add</button>
                                    <button className="w-100 btn btn-primary btn m-1" disabled={this.state.newProduct} onClick={this.onUpdateProduct}>Update</button>
                                    <button className="w-100 btn btn-primary btn m-1" disabled={this.state.newProduct} onClick={this.onDeleteProduct}>Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.state.newProduct ? <div className="col-lg-3">
                        <div>
                        <div className="card mb-4 box-shadow">
                            <img src={this.state.fileUploaded ? URL.createObjectURL(this.state.uploadedFile) : ""} style={{height : "225px", width: "100%", display: "block"}} alt=""/>
                            <div className="card-body">
                                <h5 className="card-title mb-3">{this.state.current_product.title}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Learn more...</button>
                                    </div>
                                    <p className="card-text"><b>Price: <span className="text-primary">{this.state.current_product.discount ? +this.state.current_product.price - ((+this.state.current_product.price) * (+this.state.current_product.discount/100)) : this.state.current_product.price}</span> ₴</b> <span className="text-decoration-line-through text-danger">{+this.state.current_product.discount ? this.state.current_product.price : null} ₴</span></p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}