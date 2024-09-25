
import {WorkerRepository} from '../../../domain/repositories/WorkerRepository'
import {PersonalInformation, WorkerInformation} from '../../../domain/entities/Worker'
import { WorkerModel } from './models/workerModel'


export const getWorkerRepository = ():WorkerRepository =>({
    createWorker: async(workerData:PersonalInformation)=>{
        try {
            console.log(`Req reached createworker`)

            const workerDetails = new WorkerModel(workerData); 
            await workerDetails.save();
           
            return await WorkerModel.findOne({EmailAddress:workerData.EmailAddress})
            
        } catch (error) {
            console.log(`Erro from infrastructure->database->MongooseWorkerRepository\n`,error)
            throw error
        }
    },
    insertWorker:async (customerData:WorkerInformation )=>{
        try {
            const {FirstName,LastName,PhoneNumber,EmailAddress,Password,Profile,Category,Country,StreetAddress,State,City,Apt,Identity,PostalCode} = customerData
            const workerDetails = await WorkerModel.updateOne({EmailAddress:customerData.EmailAddress},{$set:{FirstName,LastName,PhoneNumber,EmailAddress,Password,Profile,Category,Country,StreetAddress,State,City,Apt,Identity,PostalCode,isVerified:true}},{upsert:true})
            return customerData
        } catch (error) {
            console.log(`Erro from infrastructure->database->insertWorker\n`,error)
            throw error
        }
    },
    findWorker : async (workerEmail:string)=>{
        try {
            console.log(`req reached findworker`)

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
     
            const workerFetchDetails =  await WorkerModel.findOne({EmailAddress:workerEmail})

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
    },
    chagneExitWorkerCategoryName : async(existName:string,newName:string)=>{
        try{
            await WorkerModel.updateMany({Category:existName},{$set:{Category:newName}})
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->chagneExitWorkerCategoryName->\n`,error)
            throw error
        }
    }
})