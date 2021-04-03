export interface Entity {
    id : string | number; //| ObjectId;
}

export interface UserEntity extends Entity {
    name : string;
    lastName : string;
    password : string;
    email : string;
}