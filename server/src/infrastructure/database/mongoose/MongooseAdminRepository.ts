
// * Object types
import { AddCategory } from "../../../domain/entities/Admin"

// * Repository types
import {IAdminRepository} from "../../../domain/repositories/AdminRepository"

// * Model
import {CategoryModel} from "./models/AdminModel"

export const adminMongoose = () : IAdminRepository =>({
    AddCategoryQuery: async (categoryDetails:AddCategory)=>{
        try {
            const categoryDetail = new CategoryModel(categoryDetails)
            return categoryDetail.save()
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error
        }
    }
})