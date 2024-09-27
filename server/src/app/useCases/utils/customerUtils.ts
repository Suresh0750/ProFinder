
import {CustomerQueryRepository} from '../../../infrastructure/database/mongoose/MongooseCustomerRepository'




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