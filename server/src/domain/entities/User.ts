

// * using for mention the type 


  
export interface User{
    _id? : string,
    username : string,
    PhoneNumber : number,
    EmailAddress : string,
    Address : string,
    Password : string,
    isVerified ? : boolean
    ConfirmPass? : number,
    createAt? :Date,
    updatedAt? : Date
}


export interface loginDetails{
    EmailAddress : string,
    Password : string
}


export interface editprofileTypes{
    username : string,
    PhoneNumber:string,
    EmailAddress : string,
    profile?: string
}

export interface profileTypes{
    username : string,
    phone:string,
    email : string,
    profile? : string,
    isImage : boolean
    newImageData ?: string
}