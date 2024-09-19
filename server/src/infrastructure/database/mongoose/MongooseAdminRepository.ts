
// * Object types
import { AddCategory } from "../../../domain/entities/Admin"

// * Repository types
import {IAdminRepository} from "../../../domain/repositories/AdminRepository"

// * Model
import {CategoryModel} from "./models/AdminModel"

export const AdminMongoose = () : IAdminRepository =>({
    AddCategoryQuery: async (categoryDetails:AddCategory)=>{
        try {
            console.log(`req reched adminMongoose`)
            const categoryDetail = new CategoryModel(categoryDetails)
            return categoryDetail.save()
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error
        }
    },
    CheckExistCategory : async(categoryName:string)=>{
        try{
            const checkProduct = await CategoryModel.findOne({categoryName})
            return checkProduct
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error
        }
    }
})