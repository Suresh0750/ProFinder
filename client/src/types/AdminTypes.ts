

export interface addCategoryType {
    CategoryName :string,
    Description : string,    
    CategoryImage : any
}

export interface EditCategoryType {
    categoryName :string,
    categoryDescription : string,    
    categoryImage : any,
    newImageData : any,
    _id : string,
    newImage : boolean
}


export interface AdminCredentials {
    adminEmail : string,
    adminPass : string
}

export interface showCategory {
    _id : string,
    categoryName : string,
    categoryDescription : string,
    categoryImage : string,
    isListed : string,
    createdAt : string,
    updatedAt :string,
    __v : string
}


export interface salesReport{
    _id : string,
    service : string,
    worker : string,
    user : string,
    preferredDate : string,
    isAccept : string,
    payment : number
}