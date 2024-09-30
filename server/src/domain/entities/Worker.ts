// * worker Project details

export interface ProjectDetails {
    _id? : string,
    projectName : string,
    ProjectDescription : string,
    ProjectImage : string
}


export interface PersonalInformation{
    _id ? : string,
    FirstName : string,
    LastName : string,
    PhoneNumber : number,
    EmailAddress : string,
    Password : string,
    Profile : String,
    isVerified? : Boolean,
    latitude?: number,
    longitude?: number,
}

export interface ProfessionInformation{ 
    Category : String,
    Country : String,
    StreetAddress : String,
    State : String,
    City : String,
    Apt : String,
    Identity : String,
    PostalCode : Number,
    WorkerImage? : string[],
    reviews? : string[],
    isVerified? : Boolean,
    isWorker ? : Boolean
}


export type WorkerInformation = PersonalInformation & ProfessionInformation & {
    _id?: string; 
    role?: string;
    isBlock? : boolean;
};

export type getProjectData = {
    WorkerImage :[{
        projectName:string,
        ProjectDescription : string,
        ProjectImage : string,
        _id : string
    }]
}