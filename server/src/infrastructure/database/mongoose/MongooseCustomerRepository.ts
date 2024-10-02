
import { RequestData } from "../../../domain/entities/customerTypes";
import { User,loginDetails } from "../../../domain/entities/User";
import { WorkerInformation } from "../../../domain/entities/Worker";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepository";

// * database model
import { CategoryModel } from "./models/AdminModel";
import {UserModel} from './models/UserModel'
import {WorkerModel} from './models/workerModel'
import {RequestModal} from './models/RequestModel'

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
    },
    WorkerGoogleLoginVerification : async(EmailAddress:string)=>{
        try{
            console.log(`Req reached workGoogleLoginVerification`)
            return await WorkerModel.findOne({EmailAddress})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->UserWorkerLogin\n`,error)
            throw error
        }
    },
    getVerifiedWorker : async()=>{
        try {
            return await WorkerModel.find({})  // * replace the query which only fetch verified worker for show the servie page
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->getVerifiedWorker\n`,error)
            throw error
        }
    },
    getCategoryName : async()=>{
        try {
            return await CategoryModel.distinct('categoryName')   // * show all category in worker signup page for select
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->getCategoryName\n`,error)
            throw error  
        }
    },
    getNearByWorkerListQuery : async(categoryName:string)=>{
        try {
            return await WorkerModel.find({Category:categoryName})
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->getNearByWorkerListQuery\n`,error)
            throw error  
        }
    },
    // * userRequest to worker
    userRequestQuery : async(userRequestDetails:RequestData)=>{
        try {
            await RequestModal.create(userRequestDetails)
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->userRequestQuery\n`,error)
            throw error  
        }
    },
    checkExitstRequestQuery : async(userId:string,workerId:string)=>{
        try {
            return RequestModal.findOne({userId,workerId})
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->checkExitstRequestQuery\n`,error)
            throw error  
        }
    }
})