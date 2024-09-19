
import { User,loginDetails } from "../../../domain/entities/User";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";
import {UserModel} from './models/UserModel'

export const CustomerQueryRepository = ():CustomerRepository=>({
    UserGoogleLogin : async (user:User) =>{
        try {
            const userDoc  = UserModel.updateOne({EmailAddress:user.EmailAddress},{user},{upsert:true});
            return userDoc
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->createUser\n`,error)
            throw error  
        }
    }
})