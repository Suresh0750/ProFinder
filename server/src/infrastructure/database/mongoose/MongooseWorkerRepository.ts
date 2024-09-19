
import {WorkerRepository} from '../../../domain/repositories/WorkerRepository'
import {PersonalInformation} from '../../../domain/entities/Worker'
import { WorkerModel } from './models/workerModel'


export const getWorkerRepository = ():WorkerRepository =>({
    createWorker: async(workerData:PersonalInformation)=>{
        try {
            console.log(`Req reached createworker`)
            console.log(workerData)
            const workerDetails = await WorkerModel.updateOne({EmailAddress:workerData.EmailAddress},{$set:{workerData}},{upsert:true})
            
           
            return await WorkerModel.findOne({EmailAddress:workerData.EmailAddress})
            
        } catch (error) {
            console.log(`Erro from infrastructure->database->MongooseWorkerRepository\n`,error)
            throw error
        }
    },
    findWorker : async (workerEmail:string)=>{
        try {
            console.log(`req reached findworker`)
            console.log(workerEmail)
            return await WorkerModel.findOne({EmailAddress:workerEmail})
            
        } catch (error) {
            console.log(`Error infrastructure->database->MongooseWorkerRepository\n${error}`)
            throw error
        }
    },
    ischeckEmail : async(userEmail : string)=>{
        try {
            const isCheckEmail = await WorkerModel.findOne({EmailAddress:userEmail})
            return isCheckEmail  ? isCheckEmail._id : undefined;
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->ischeckEmail\n`,error)
            throw error
        }
    },
    setNewPassWord : async(customerId:string , newPass : string)=>{
        try{
            await WorkerModel.findByIdAndUpdate({_id:customerId},{$set:{Password:newPass}})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error
        }
    },
    loginVerifyQuery : async(workerEmail:string)=>{
        try { 
            console.log(`req reached workerLoginVerify`)
            console.log(workerEmail)      
            const workerFetchDetails =  await WorkerModel.findOne({EmailAddress:workerEmail})
            console.log(workerFetchDetails)
          return workerFetchDetails
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error
        } 
    },
    getWorkerData : async(workerId:string)=>{
        try {
            return await WorkerModel.findById({_id:workerId})
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error
        }
    }
})