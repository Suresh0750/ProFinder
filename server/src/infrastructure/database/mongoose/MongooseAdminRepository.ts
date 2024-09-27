
// * Object types
import { AddCategory,addCategoryData } from "../../../domain/entities/Admin"

// * Repository types
import {IAdminRepository} from "../../../domain/repositories/AdminRepository"

// * Model
import {CategoryModel} from "./models/AdminModel"
import {WorkerModel} from "./models/workerModel"


export const AdminMongoose = () : IAdminRepository =>({
    AddCategoryQuery: async (categoryDetails:AddCategory)=>{
        try {
            console.log(`req reched adminMongoose`)
            const categoryDetail =  new CategoryModel(categoryDetails)
            return await categoryDetail.save()
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
    },
    getAllCategoryQuery : async()=>{
        try {
            return await CategoryModel.find({})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getAllCategoryQuery->\n`,error)
            throw error
        }
    },
    IsListedQuery: async(_id:string,isListed:Boolean)=>{
        try {
            await CategoryModel.updateOne({_id},{$set:{isListed}})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getAllCategoryQuery->\n`,error)
            throw error
        }
    },
    deleteProductQuery : async(_id:string)=>{
        try{
            console.log(`Request reached deleteProduct query ${_id}`)
            await CategoryModel.findByIdAndDelete({_id})
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->deleteProductQuery->\n`,error)
            throw error
        }
    },
    EditeCategoryQuery : async(categoryData:AddCategory)=>{
        try {
            console.log(`Req entered EditeCategory query`)
            console.log(categoryData)
            await CategoryModel.findByIdAndUpdate({_id:categoryData._id},{$set:{categoryName:categoryData.categoryName,categoryDescription:categoryData.categoryDescription,categoryImage:categoryData.categoryImage}})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->EditeCategoryQuery->\n`,error)
            throw error
        }
    },
    getAllWorkerList : async()=>{
        try {
          return  await WorkerModel.find({})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->EditeCategoryQuery->\n`,error)
            throw error
        }
    }
})