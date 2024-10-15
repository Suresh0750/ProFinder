
import {PersonalInformation,WorkerInformation,ProjectDetails,messageTypes,ProfessionalInfoData} from '../../../domain/entities/Worker'
import {getWorkerRepository} from "../../../infrastructure/database/mongoose/MongooseWorkerRepository"
import {OtpService} from '../../services/OtpService'
import {OtpStoreData} from '../utils/OtpStoreData'
import {verifyRefreshToken} from "../../../infrastructure/service/JwtService"
import {GeoCoding} from "../../../infrastructure/service/geoCode"
import { sendMessage } from '../utils/chatUtils'
import { messageType } from '../../../domain/entities/commonTypes'
import {Types} from 'mongoose'
export const {ObjectId} = Types


export const dashboardUsescases = async(workerId:string)=>{
    try {
        const ResentActivity :any = await getWorkerRepository().countResentWorkQuery(workerId)
        console.log('dashboard')
        console.log(ResentActivity)
        return {ResentActivity}
    } catch (error) {
        console.log(`Error from useCases->worker->dashboardUsescases\n`,error)
        throw error  
    }
}



// * get chats usecause 
export const fetchMessageUsecases = async(conversationId:string)=>{
    try{
        await getWorkerRepository().updateIsReadQuery(conversationId)
        return await getWorkerRepository().fetchMessage(conversationId)
    }catch(error){
        console.log(`Error from useCases->worker->fetchMessageUsecases\n`,error)
        throw error  
    }
}

export const messageUsecases = async(data:messageType)=>{
    try {       
        const {message,conversationId} = data
        await getWorkerRepository().messageQuery(data)
        const result = await getWorkerRepository().getSingleMsg(message)
        if(result) await sendMessage(result)   // * here call the socket
        await getWorkerRepository().updatemessage({_id:new ObjectId(conversationId),lastMessage:message})
        return 
    } catch (error) {
        console.log(`Error from useCases->worker->messageUsecases\n`,error)
        throw error
    }
}
export const getChatsNameUsecases = async(_id:string)=>{
    try{
        
        const result = await getWorkerRepository().getChatsNameQuery(_id)
        console.log(JSON.stringify(result))
        return result
    }catch(error){
        console.log(`Error from useCases->worker->getChatsNameUsecases\n`,error)
        throw error
    }
}



// * getAll Request data  of worker

export const getRequestUsecases = async (workerId:string)=>{
    try {
        return await getWorkerRepository().getAllRequestQuery(workerId)
    } catch (error) {
        console.log(`Error from useCases->worker->getAllWorkerUseCases\n`,error)
        throw error
    }
}

export const isAcceptUseCasess = async(data:any,workerId:string)=>{
    try {
        const {_id,isPayment} = JSON.parse(data)
        
         await getWorkerRepository().isAcceptWorkQuery(_id,Number(isPayment))
         return  await getWorkerRepository().isResendActivityQuery(_id,Number(isPayment),workerId)
    } catch (error) {
        console.log(`Error from useCases->worker->isAcceptUseCasess\n`,error)
        throw error
    }
}

export const isRejectUsecases = async (_id:string)=>{
    try {
        return await getWorkerRepository().isRejectWorkQuery(_id)
    } catch (error) {
        console.log(`Error from useCases->worker->isRejectUsecases\n`,error)
        throw error
    }
}



// * get Single worker Details

export const getSingleWorkerDetailsUsecases= async (_id:string)=>{
    try {
   
        return await getWorkerRepository().getSingleWorkerDetailsQuery(_id)
    } catch (error) {
        console.log(`Error from useCases->worker->getSingleWorkerDetailsUsecases\n`,error)
        throw error
    }
}



// * worker upload project details usecses
export const workerProjectUsecases = async (workerProjectDetails:ProjectDetails)=>{
    try {
        const {_id,projectName,ProjectDescription,ProjectImage} = workerProjectDetails
        const ProjectDetails = {
            projectName,
            ProjectDescription,
            ProjectImage 
        }

        if(_id) await getWorkerRepository().addWorkerProjectDetails(_id,ProjectDetails)
        return
    } catch (error) {
        console.log(`Error from useCases->worker->workerProjectUsecases\n`,error)
        throw error
    }
}
export const getWorkerProjectData = async(_id:string)=>{
    try {
        return await getWorkerRepository().getProjectDetailsQuery(_id)
    } catch (error) {
        console.log(`Error from useCases->worker->getWorkerProjectData\n`,error)
        throw error
    }
}



export const workerExist = async (workerData:PersonalInformation) =>{
    try {
        console.log(workerData,"workerData")
        const {findWorker} = getWorkerRepository()
        return await findWorker(workerData.EmailAddress) // * check the worker already exite or not  

    } catch (error) {
            console.log(`Error from workerExist`,error)
            throw error
    }
}

export const WorkerUsecase= async(workerData:ProfessionalInfoData)=>{
    try {
        console.log(`Request reached WorkrUsecase`)
        console.log(workerData)
        let {FirstName,LastName,PhoneNumber,EmailAddress,PostalCode,Password,lat,lon,Profile,Identity,Category,Country,State,City,StreetAddress,Apt,coord,mapAddress} = workerData

        console.log(lat)
        console.log(lon)
    
        let data = {
            FirstName,
            LastName,
            PhoneNumber,
            EmailAddress,
            Password,
            Profile,
            Identity,
            Apt ,
            Category,
            Country,
            State,
            City,
            PostalCode,
            StreetAddress,
            latitude : Number(lat),
            longtitude : Number(lon)
        }

        console.log(JSON.stringify(data))

        mapAddress = JSON.parse(mapAddress)
        console.log(mapAddress)
        if(mapAddress?.Country) data.Country = mapAddress?.Country
        if(mapAddress?.postcode) data.PostalCode = mapAddress?.postcode
        if(mapAddress?.state) data.State = mapAddress?.state

        const {createWorker} = getWorkerRepository()
        console.log(data)
        
        const workerDetails = await createWorker(data)

        const {customerOTP,customerId} = await OtpService((workerDetails?._id)?.toString(),(workerDetails?.EmailAddress || ''))
        await OtpStoreData(customerId,customerOTP)
        return customerId
    } catch (error) {
        console.log(`Error from usecases -> workerUsecase`,error)
        throw error
    }
}

export const getWorkerData = async(token:string)=>{
    try {
        console.log(`req reached WorkrUsecase getWorkerData`)
   
        const {customerId} :any = verifyRefreshToken(token) 
        const {getWorkerData} = getWorkerRepository()
        return getWorkerData(customerId)
        // getWorkerData
    } catch (error) {
        console.log(`Error from usecases -> getWorkerData`,error)
        throw error
    }
}