
import {CustomerQueryRepository} from '../../../infrastructure/database/mongoose/MongooseCustomerRepository'


export const getCategoryNameUtils = async()=>{
    try{
        return await CustomerQueryRepository().getCategoryName()
    }catch(error){
        console.log(`Error from useCases->utils-> getCategoryNameUtil`)
        throw error
    }
}