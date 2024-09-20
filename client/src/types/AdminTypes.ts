

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


