
  export interface FormValues{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: FileList | string;
  };


  export interface WorkerDatails {
    _id?: string,
    FirstName :string,
    LastName : string,
    PhoneNumber : number,
    EmailAddress :string,
    Password : string,
    Profile : string,
    Category : string,
    Country : string,
    StreetAddress : string,
    State : string,
    City : string,
    Apt : string,
    Identity : string,
    PostalCode : string,
    isWorker ?: boolean ,
    WorkerImage? : string[],
    reviews ? : string[],
    isVerified : boolean,
    createdAt? : string,
    updatedAt ? : string,
    isBlock? :boolean,
    __v ? : number
  }


export interface MaterialCarouselProps {
              images: [
                {
                  projectName: string,
                  ProjectDescription:string,
                  ProjectImage: string,
                  _id: string
                }
              ];
            }