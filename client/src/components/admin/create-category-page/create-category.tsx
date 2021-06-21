import React from "react";
import CategoryService from "../../../services/category.service";
import { ICategory } from "../../../types/interfaces/category";

interface CreateCategoryPageState {
    categories : ICategory[],
    current_category : ICategory,
    onCreateStatus : boolean;
    uploadedFile: File | null;
    fileUploaded : boolean;
}

export default class CreateCategoryPage extends React.Component<{},CreateCategoryPageState>{
    private _categoryService : CategoryService;
    
    async componentDidMount(){
        const loadedCategories = await this._categoryService.loadCategories();

        this.setState({categories : loadedCategories})
    }

    constructor(props : any){
        super(props);

        this._categoryService = new CategoryService();

        this.state = {
            categories : [{
                _id : '',
                title : '',
                description : '',
                image_path : ''
            }],
            current_category : {
                _id : '',
                description : '',
                image_path : '',
                title : ''
            },
            onCreateStatus : false,
            uploadedFile : null,
            fileUploaded : false
        }
    }
    
    selectCategory = (id : string) => {
        const category = this.state.categories.filter((category) => {return category._id === id})[0];
        this.setState({current_category : category})
    }

    createCategoriesList = () => {
        return this.state.categories.map(category => {
            return (<li aria-disabled={this.state.onCreateStatus} 
                        className={"list-group-item ".concat(this.state.onCreateStatus ? "text-decoration-line-through" : "")} 
                        key={category._id} 
                        onClick={() => !this.state.onCreateStatus ? this.selectCategory(category._id) : null}>
                        {category.title}
                    </li>)
        })
    }

    onCreateStatus = () => {
        if(!this.state.onCreateStatus)
            this.setState({onCreateStatus : true,current_category : {_id : '',description : '',image_path : '',title : ''}});
        else
            this.setState({onCreateStatus : false});
    }

    onClickAdd = async () => {
        if(this.state.uploadedFile && this.state.current_category.title && this.state.current_category.description){
            const result = await this._categoryService.createNewCategory({
                category_image : this.state.uploadedFile,
                description : this.state.current_category.description,
                title : this.state.current_category.title
            });
        }
    }

    onClickDelete = async () => {
        if(this.state.current_category.title && this.state.current_category.description){
            const result = await this._categoryService.deleteCategoryById(this.state.current_category._id);
        }
    }

    onClickUpdate = async () => {
        if(this.state.uploadedFile && this.state.current_category.title && this.state.current_category.description){
            const result = await this._categoryService.updateCategoryById(this.state.current_category._id,{category_image : this.state.uploadedFile,description : this.state.current_category.description,title : this.state.current_category.title});
        }else{
            const result = await this._categoryService.updateCategoryById(this.state.current_category._id,{category_image : undefined,description : this.state.current_category.description,title : this.state.current_category.title});
        }
    }

    createCurrentCategoryImage = () => {
        return (<img src={`/api/static/${this.state.current_category.image_path}`} alt="" className="mb-2"></img>)
    }

    handleTitleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({current_category : {...this.state.current_category,title : e.target.value} })
    }

    handleDescriptionInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({current_category : {...this.state.current_category,description : e.target.value} })
    }

    handleFileInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ uploadedFile: e.target.files[0],fileUploaded : true});
          }
    }
 
    createCurrentCategoryInfo = () => {
        return (
            <div>
                <div className="col-sm-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={this.state.current_category.title} onChange={this.handleTitleInput}/>
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <div className="input-group">
                        <textarea className="form-control" value={this.state.current_category.description} onChange={this.handleDescriptionInput}/>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={this.handleFileInput}></input>
                </div>
            </div>
        )
    }

    render(){
        const categoriesList = this.createCategoriesList();
        const currentCategoryImage = this.createCurrentCategoryImage()
        const currentCategoryInfo = this.createCurrentCategoryInfo();

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h3 className="mt-3"> Create Category Page</h3>
                        <ul className="list-group">
                            {categoriesList}
                        </ul>
                    </div>
                    <div className="col-lg-6">
                    <h4 className="mt-3">Category information</h4>
                        {currentCategoryImage ? currentCategoryImage : null}
                        <form>
                            <div className="row g-3">
                                {currentCategoryInfo ? currentCategoryInfo : null}
                                <div className="form-check form-switch m-2 mt-4">
                                    <input className="form-check-input" type="checkbox" onClick={this.onCreateStatus} defaultChecked={this.state.onCreateStatus}/>
                                    <label className="form-check-label">New category</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="w-100 btn btn-primary btn m-1" disabled={!this.state.onCreateStatus} onClick={this.onClickAdd}>Add</button>
                                    <button className="w-100 btn btn-primary btn m-1" disabled={this.state.onCreateStatus} onClick={this.onClickUpdate}>Update</button>
                                    <button className="w-100 btn btn-primary btn m-1" disabled={this.state.onCreateStatus} onClick={this.onClickDelete}>Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.state.onCreateStatus ? <div className="col-lg-3">
                        <h4 className="mt-3">Category preview</h4>
                        <div className="col d-flex align-items-start p-3 shadow">
                            <img src={this.state.fileUploaded ? URL.createObjectURL(this.state.uploadedFile) : ""} alt="" style={{maxWidth : "70px",maxHeight : "70px",minWidth : "70px",minHeight : "70px"}}/>
                            <div>
                                <h4 className="fw-bold m-2">
                                    {this.state.current_category.title}
                                </h4>
                                <p className="mt-2">
                                    {this.state.current_category.description}
                                </p>        
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary" disabled>Learn more...</button>
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