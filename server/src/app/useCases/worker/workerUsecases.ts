
import {PersonalInformation,WorkerInformation} from '../../../domain/entities/Worker'
import {getWorkerRepository} from "../../../infrastructure/database/mongoose/MongooseWorkerRepository"
import {getUserRepository} from "../../../infrastructure/database/mongoose/MongooseUserRepository"
import {OtpService} from '../../services/OtpService'
import {OtpStoreData} from '../utils/OtpStoreData'
import {verifyRefreshToken} from "../../../infrastructure/service/JwtService"


export const workerExist = async (workerData:PersonalInformation) =>{
    try {
        console.log(workerData,"workerData")
        const {findWorker} = getWorkerRepository()
        // const {findUserByEmail} = getUserRepository()
        return await findWorker(workerData.EmailAddress) // * check the worker already exite or not  

    } catch (error) {
            console.log(`Error from workerExist`,error)
            throw error
    }
}

export const WorkerUsecase= async(workerData:PersonalInformation)=>{
    try {
        console.log(`Request reached WorkrUsecase`)

        const {createWorker} = getWorkerRepository()
        const workerDetails = await createWorker(workerData)
        console.log(`worker Details`,workerDetails)
        
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
        console.log(verifyRefreshToken(token))
        const {customerId} :any = verifyRefreshToken(token) 
        const {getWorkerData} = getWorkerRepository()
        return getWorkerData(customerId)
        // getWorkerData
    } catch (error) {
        console.log(`Error from usecases -> getWorkerData`,error)
        throw error
    }
}