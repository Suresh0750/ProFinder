
import {WorkerRepository} from '../../../domain/repositories/WorkerRepository'
import {PersonalInformation, WorkerInformation,ProjectDetails} from '../../../domain/entities/Worker'

// * model
import { WorkerModel } from './models/workerModel'
import {RequestModal} from './models/RequestModel'
import {ResentActivityModal} from './models/RecentActivityModel'

export const getWorkerRepository = ():WorkerRepository =>({
    createWorker: async(workerData:PersonalInformation)=>{
        try {
            console.log(`Req reached createworker`)
            console.log(workerData)
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
    },
    // * Add worker project details  && worker Project page
    addWorkerProjectDetails : async(_id:string,ProjectDetails:ProjectDetails)=>{
        try {
            await WorkerModel.updateOne({_id},{$push:{WorkerImage:ProjectDetails}})  // * worker add project image
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->addWorkerProjectDetails->\n`,error)
            throw error
        }
    },
    getProjectDetailsQuery : async(_id:string)=>{
        try {
           return await WorkerModel.findById({_id},{WorkerImage:1,_id:0})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getProjectDetailsQuery->\n`,error)
            throw error
        }
    },
    getSingleWorkerDetailsQuery : async(_id:string)=>{
        try {
            return await WorkerModel.findById({_id})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getSingleWorkerDetailsQuery->\n`,error)
            throw error
        }
    },
    // * Request of worker side
    getAllRequestQuery : async(workerId:string)=>{
        try {
            return await RequestModal.find({workerId,isAccept:"Pending"})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getAllRequestQuery->\n`,error)
            throw error
        }
    },
    isAcceptWorkQuery : async(_id:string,isPayment:number)=>{
        try {
            await RequestModal.findByIdAndUpdate({_id},{$set:{isAccept:"Accepted",payment:isPayment}})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->isAcceptWorkQuery->\n`,error)
            throw error
        }
    },
    isRejectWorkQuery : async(_id:string)=>{
        try {
            await RequestModal.findByIdAndUpdate({_id},{$set:{isAccept:"Cancelled"}})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->isRejectWorkQuery->\n`,error)
            throw error
        }
    },
    IsActivityQuery : async(requestId:string,paymentId:string)=>{
        try {
            await ResentActivityModal.updateOne({requestId,paymentId})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->isRejectWorkQuery->\n`,error)
            throw error
        }
    }
})