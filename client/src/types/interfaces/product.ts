export interface IProduct {
    _id : string;
    title : string;
    price : string;
    discount : string;
    description : string;
    developer : string;
    category : string;
    reviewies : [{
        user_id : string;
        message : string;
    }]
    image_url: string;
}