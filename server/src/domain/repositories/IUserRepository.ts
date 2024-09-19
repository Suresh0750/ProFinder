


import { User } from "../entities/User";


// * Repositories types
export interface IUserRepository{
    createUser(user:User):Promise<User>;
    findUserByEmail(email:string): Promise<User |null>;   
    insertUserDetails(user:User):Promise<void>;
    loginVerifyQuery(userEmail:string):Promise<User | null> ;
    ischeckEmail(userEmail:string): Promise<string | undefined> ;
    setNewPassWord(customerId:string,newPass:string) :Promise<void> ;
    getDataFindById(userId:string) : Promise<User | null>
}