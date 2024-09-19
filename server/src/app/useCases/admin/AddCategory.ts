
// * types
import {AddCategory} from '../../../domain/entities/Admin'
import {IAdminRepository} from "../../../domain/repositories/AdminRepository"

// * Mongoose Query
import {adminMongoose} from "../../../infrastructure/database/mongoose/MongooseAdminRepository"


export const AddCategoryUseCases = async(categoryDetails:AddCategory)=>{
    try {
        // * call mongoose query
        const {AddCategoryQuery} :IAdminRepository = adminMongoose()  
        return await AddCategoryQuery(categoryDetails)
        
    } catch (error) {
        console.log(`Error from useCases->admin->AddCategory\n`,error)
        throw error
    }
}