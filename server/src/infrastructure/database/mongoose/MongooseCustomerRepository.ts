
import { User,loginDetails } from "../../../domain/entities/User";
import { WorkerInformation } from "../../../domain/entities/Worker";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";
import {UserModel} from './models/UserModel'
import {WorkerModel} from './models/workerModel'

export const CustomerQueryRepository = ():CustomerRepository=>({
    UserGoogleLogin : async (user:User) =>{
        try {
            const userDoc  = await UserModel.updateOne({EmailAddress:user.EmailAddress},{$set:{user}},{upsert:true});
            return userDoc
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->createUser\n`,error)
            throw error  
        }
    },
    UserWorkerLogin : async(workerData:WorkerInformation)=>{
        try{
            console.log(`Request reached workerLogin`)
            return await WorkerModel.updateOne({EmailAddress:workerData.EmailAddress},{$set:{workerData}},{upsert:true})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->UserWorkerLogin\n`,error)
            throw error
        }
    }
})