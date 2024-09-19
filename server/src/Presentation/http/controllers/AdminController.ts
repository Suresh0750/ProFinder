
import { Request,Response,NextFunction } from "express"
import {AdminVerifyUseCases} from '../../../app/useCases/admin/AdminVerify'
import Jwt from 'jsonwebtoken'
// * useCases
import {uploadImage} from '../../../app/useCases/utils/uploadImage'
import {AddCategoryUseCases,CheckExistCategory,getAllCategoryUseCases, isListedProductUsecases} from "../../../app/useCases/admin/Category"

// * types
import {IMulterFile} from '../../../domain/entities/Admin'
import { StatusCode } from "../../../domain/entities/commonTypes"


export const addCategoryController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`req reached addCategory controller`) 

        const ExistCategory = await CheckExistCategory(req?.body?.CategoryName)

        console.log(ExistCategory)
        if(ExistCategory) return res.status(StatusCode.Conflict).json({success:false,message:'Producet already exist'})

        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file)    // * call uploadImage usecases
        req.body.categoryImage = imageUrl
        await AddCategoryUseCases(req.body)  // * call usecases
        return res.status(200).json({success:true,message:'Product has been added'})
          
    } catch (error) {
        console.log(`Error from addCategoryController\n${error}`)
        next(error)
    }
}


export const AdminVerify = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log('req entered AdminVerify controller')
        console.log(AdminVerifyUseCases(req.body))
        if(AdminVerifyUseCases(req.body)){
            const refreshToken =  Jwt.sign({adminEmail: req.body.adminEmail},String(process.env.REFRESH_TOKEN_SECRET),{expiresIn:'7d'})
            const accessToken = Jwt.sign({adminEmail:req.body.adminEmail},String(process.env.ACCESS_TOKEN_SECRET), { expiresIn:'15m' }); 
            res.cookie('adminToken',refreshToken,{
                httpOnly:true,
                secure :true,
                sameSite:'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.cookie('accessToken',accessToken,{
                maxAge: 2 * 60 * 1000
            })
            res.status(StatusCode.Success).json({success:true,message:'login verify successful'})
        }
        console.log('admin verify')
        res.status(StatusCode.Unauthorized).json({success:false,message:'Invalid credentials'})

    }catch(error){
        console.log(`Error from addCategoryController\n${error}`)
        next(error)
    }
}

export const getAllCategory =async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const totalCategory = await getAllCategoryUseCases()
        console.log(JSON.stringify(totalCategory))
        res.status(StatusCode.Success).json({success:true,message:'Successfully data fetched',totalCategory})
    } catch (error) {
        console.log(`Error from getAllCategory\n${error}`)
        next(error)
    }
}


export const editCategory = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body)
        console.log(req.file)
        if(req.body.newImage){
            const file: IMulterFile |any = req.file
            const imageUrl = await uploadImage(file)  
            req.body.categoryImage = imageUrl
        }

      

    }catch(error){
        console.log(`Error from EditCategory\n${error}`)
        next(error)
    }

}

export const verifyListController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body)

        isListedProductUsecases(req.body._id,req.body.isListed)
        return res.status(StatusCode.Success).json({success:true,message:'List has been updated'})
        
    } catch (error) {
        console.log(`Error from verifyListController\n${error}`)
        next(error)
    }
}