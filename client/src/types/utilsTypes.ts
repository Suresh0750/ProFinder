


// * params


export type ForgetPasswordPage  = {
    getCustomer : string
}


export type GoogleLoginCredentials = {
    username : string,
    EmailAddress : string,
    role : string,
}

export type GoogleWorkerCredentials = {
    FirstName : string,
    LastName : string,
    PhoneNumber? : number,
    EmailAddress : string,
    Password? : string,
    Profile : string,
    Category ?: string,
    Country? : string,
    StreetAddress? : string,
    State? : string,
    City? : string,
    Apt ?: string,
    Identity ?: string,
    PostalCode?: number
}