
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
    __v ? : number
  }


//   {
//     "isWorker": false,
//     "_id": "66f0f0df7234b819b529ccaf",
//     "FirstName": "Akil",
//     "LastName": "kanna",
//     "PhoneNumber": 3456789993,
//     "EmailAddress": "Akill@gmail.com",
//     "Password": "$2b$10$Gq3XlZF9KX3ucpMc.gD4EOTnUtSKHAgTWtVmxalRvosAagjg2zFqi",
//     "Profile": "https://profinder.s3.eu-north-1.amazonaws.com/uploads/1727066287947_Anbu_Mech.webp",
//     "Category": "Mechanic",
//     "Country": "India",
//     "StreetAddress": "742 west street, Tenkasi at Tamil Nadu",
//     "State": "TN",
//     "City": "Kollankodu",
//     "Apt": "rsmantion",
//     "Identity": "https://profinder.s3.eu-north-1.amazonaws.com/uploads/1727066334153_Akill_Mech.webp",
//     "PostalCode": "62780",
//     "WorkerImage": [],
//     "reviews": [],
//     "isVerified": true,
//     "createdAt": "2024-09-23T04:38:55.304Z",
//     "updatedAt": "2024-09-23T04:39:43.570Z",
//     "__v": 0
// },
