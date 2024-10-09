


import { User ,editprofileTypes,conversationTypes,messageTypes} from "../entities/User";


// * Repositories types
export interface IUserRepository{
    createUser(user:User):Promise<User>;
    findUserByEmail(email:string): Promise<User |null>;   
    insertUserDetails(user:User):Promise<void>;
    loginVerifyQuery(userEmail:string):Promise<User | null> ;
    ischeckEmail(userEmail:string): Promise<string | undefined> ;
    setNewPassWord(customerId:string,newPass:string) :Promise<void> ;
    getDataFindById(userId:string) : Promise<User | null>
    Profile(_id:string) : Promise<User | null>
    updateprofile({username,PhoneNumber,EmailAddress,profile}:editprofileTypes) : Promise<void>
    conversationQuery(data:conversationTypes):Promise<void>
    fetchConversation(userId: string): Promise<conversationTypes[] | null>
    checkConversation(userId:string):Promise<conversationTypes | null>
    updateConversation(data:conversationTypes) : Promise<void>
    findconversationId(userId:string): Promise<{ _id: string; } | null>
    createMessage(data:messageTypes) : Promise<void>
}