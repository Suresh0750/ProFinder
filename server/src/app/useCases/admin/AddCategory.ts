
// * types
import {AddCategory,addCategoryData} from '../../../domain/entities/Admin'

// * Mongoose Query
import {AdminMongoose} from "../../../infrastructure/database/mongoose/MongooseAdminRepository"


export const AddCategoryUseCases = async(categoryDetails:addCategoryData)=>{
    try {
        // * call mongoose query
        console.log(`req reached AddCategory Usecases`)
        console.log(categoryDetails)
        const categoryData = {
            categoryName : categoryDetails.CategoryName,
            categoryDescription : categoryDetails.Description,
            categoryImage : categoryDetails.categoryImage,
        }
        const {AddCategoryQuery}  = AdminMongoose()  
        // const categoryExist = await CheckExistCategory(categoryDetails.CategoryName) 

        // if(categoryExist) return false  // * check whether category is there are not

        return await AddCategoryQuery(categoryData)
        
    } catch (error) {
        console.log(`Error from useCases->admin->AddCategory\n`,error)
        throw error
    }
}


export const CheckExistCategory =  async(categoryName:string)=>{
    try{
        const {CheckExistCategory}  = AdminMongoose()
        return await CheckExistCategory(categoryName)  // * call to verify the product is there are not

    }catch(error){
        console.log(`Error from useCases->admin->CheckExistCategory\n`,error)
        throw error
    }
    
}