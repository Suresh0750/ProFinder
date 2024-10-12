
import {CustomerQueryRepository} from '../../../infrastructure/database/mongoose/MongooseCustomerRepository'


// * types 
import { RequestData } from '../../../domain/entities/customerTypes'
import { CustomError,ReviewTypes } from '../../../domain/entities/commonTypes';








// * Review useCases 
export const getReviewUsecases = async(workerId:string)=>{
    try {
        return await CustomerQueryRepository().getReview(workerId)
    } catch (error) {
        console.log(`Error from useCases->utils-> getReviewUsecases \n${error}`)
        throw error 
    }
}
export const ReviewUsecases = async(data:ReviewTypes)=>{
    try {
        return CustomerQueryRepository().createReview(data)
    } catch (error) {
        console.log(`Error from useCases->utils-> ReviewUsecases \n${error}`)
        throw error 
    }
}

// * getUser Request 

export const getUserRequestDataUsecasuse = async(userId:string,workerId:string)=>{
    try {
      
        return CustomerQueryRepository().checkExitstRequestQuery(userId,workerId);
    } catch (error) {
        console.log(`Error from useCases->utils-> getUserRequestDataUsecasuse \n${error}`)
        throw error  
    }
}

// * userRequest usecses

export const userRequestUsecases = async (userRequestDetails:RequestData)=>{
    try {
        const result = await CustomerQueryRepository().checkExitstRequestQuery(userRequestDetails?.userId,userRequestDetails?.workerId);
        console.log(`Request from userRequestUseCases`)
        console.log(result)
        if(result){
           const error:CustomError =  new Error('Request already exist'); // * if the request already exist means
            error.statusCode = 409
            throw error
        }

        const AdditionalNotes = userRequestDetails.additionalNotes // * change the name convention
        delete userRequestDetails.additionalNotes 
        console.log(userRequestDetails)
        return await CustomerQueryRepository().userRequestQuery({...userRequestDetails,AdditionalNotes})

    } catch (error) {
        console.log(`Error from useCases->utils-> userRequestUsecases \n${error}`)
        throw error  
    }
}

// * get workerdetails for emergency details

export const getNearByWorkerListUtils = async(categoryName:string)=>{
    try {
        return await CustomerQueryRepository().getNearByWorkerListQuery(categoryName)
    } catch (error) {
        console.log(`Error from useCases->utils-> getNearByWorkerListUtils \n${error}`)
        throw error
    }
}

// * get category name utils
export const getCategoryNameUtils = async()=>{
    try{
        return await CustomerQueryRepository().getCategoryName()
    }catch(error){
        console.log(`Error from useCases->utils-> getCategoryNameUtil \n${error}`)
        throw error
    }
}


export const getVerifiedWorkerUtils = async()=>{
    try {
     
        return await CustomerQueryRepository().getVerifiedWorker()
    } catch (error) {
        console.log(`Error from useCases->utils-> getCategoryNameUtil \n${error}`)
        throw error
    }
}