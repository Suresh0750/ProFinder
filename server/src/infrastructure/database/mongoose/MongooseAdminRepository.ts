
// * Object types
import { AddCategory,addCategoryData } from "../../../domain/entities/Admin"

// * Repository types
import {IAdminRepository} from "../../../domain/repositories/AdminRepository"

// * Model
import {CategoryModel} from "./models/AdminModel"
import {WorkerModel} from "./models/workerModel"
import {UserModel} from "./models/UserModel"
import { ResentActivityModel } from "./models/RecentActivityModel"
import { ReviewModel } from "./models/ReviewModel"


export const AdminMongoose = () : IAdminRepository =>({
    // * Admin in category side query's
    CheckExistCategory : async(categoryName:string)=>{
        try{
            const checkProduct = await CategoryModel.findOne({categoryName})
            return checkProduct
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error
        }
    },
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
    getEditCategoryName : async(_id:string)=>{
        try {
            return await CategoryModel.findById({_id},{categoryName:1,_id:0})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getEditCategoryName->\n`,error)
            throw error
        }
    },
    // * Admin in Worker Approval side
    getUnApprovalWorker : async()=>{
        try {
            return await WorkerModel.find({isWorker:false})  //* all un Approval workers
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getInvalidWorker->\n`,error)
            throw error
        }
    },
    isWorkerApproval : async(_id:string)=>{
        try{
            console.log(_id)
            await WorkerModel.findByIdAndUpdate({_id},{$set:{isWorker:true}});
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->isWorkerApproval->\n`,error)
            throw error
        }
    },
    // * Admin in Worker side query's
    getAllWorkerList : async()=>{
        try {
          return  await WorkerModel.find({})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->EditeCategoryQuery->\n`,error)
            throw error
        }
    },
    // * Admin in User Side Query's
    getAllUserList : async()=>{
        try {
            return await UserModel.find({})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->getAllUserList->\n`,error)
            throw error
        }
    },
    isBlockUser : async(userId:string,isBlock:false)=>{
        try {
            await UserModel.findByIdAndUpdate({_id:userId},{$set:{isBlock}})
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->isBlockUser->\n`,error)
            throw error
        }
    },
    totalRevenue :async()=>{
        try{
            return await ResentActivityModel.aggregate([
                {
              $group:{_id:null,payment:{$sum:{$cond:[{$ne:["$paymentId",null]},"$payment",0]}}}
                  }
              ])
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->totalRevenue->\n`,error)
            throw error
        }
    },
    totalReview : async()=>{
        try{
            return await ReviewModel.countDocuments()
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->totalReview->\n`,error)
            throw error
        }
    },
    totalWorkers : async()=>{
        try{
            return await WorkerModel.countDocuments()
        }catch(error){
            console.log(`Error from infrastructure->database->mongoose->totalReview->\n`,error)
            throw error
        }
    },
    avgRating : async()=>{
        try {
            return await ReviewModel.aggregate([
                {
              $group:{_id:null,sum:{$sum:"$rating"}, count: { $sum: 1 }  },
              }
              ])
        } catch (error) {
            console.log(`Error from infrastructure->database->mongoose->avgRating->\n`,error)
            throw error
        }
    }
})