import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import CategoryService from "../../services/category.service";
import { CategoriesActions, CategoriesActionTypes, ICategoryAnswerLoadSuccess } from "../../store/reducers/categories/types";
import { RootState } from "../../store/types";
import { ICategory } from "../../types/interfaces/category";
import CategoryItem from "../category-item/category-item";
import Loader from "../loader";

interface CategoryState {
    categories : ICategory[],
    loading : boolean;
}

class Categories extends React.Component<CategoriesComponentProps,CategoryState>{
    private _categoryService : CategoryService;
    
    async componentDidMount(){
        const categories : ICategory[] = await this._categoryService.loadCategories();
        
        this.props.loadCategories();

        this.props.loadCategoriesSuccess({categories : categories})

        setTimeout(() => {
            this.setState({categories : categories,loading : false})
        },1000);
    }

    constructor(props : CategoriesComponentProps){
        super(props);
        this._categoryService = new CategoryService();
        this.state = {
            categories : [],
            loading : true
        }
    }

    createCategories = () => {
        return this.state.categories.map((category : ICategory) => {
            return <CategoryItem id={category._id} title={category.title} description={category.description} image_path={category.image_path}/>
        })
    }

    render(){
        const categories = this.createCategories();
         
        return(
            <div className="container py-5">
                <h3 className="pb-2 border-bottom">Categories</h3>
                <div className="row row-cols-3 justify-content-center">
                    {this.state.loading ? <Loader/> : categories}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch : Dispatch<CategoriesActions>) => {
    return {
        loadCategories : () => dispatch({type : CategoriesActionTypes.CATEGORY_LOAD}),
        loadCategoriesSuccess : (categoriesAnswerSuccess : ICategoryAnswerLoadSuccess) => dispatch({type : CategoriesActionTypes.CATEGORY_LOAD_SUCCESS,categories : categoriesAnswerSuccess})
        
    }
}

const mapStateToProps = (state : RootState) => {
    return state.category;
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type CategoriesComponentProps = ConnectedProps<typeof connector>;

export default connector(Categories);