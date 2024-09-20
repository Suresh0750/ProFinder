
import { Request,Response,NextFunction } from "express"
import {AdminVerifyUseCases} from '../../../app/useCases/admin/AdminVerify'
import Jwt from 'jsonwebtoken'
// * useCases
import {uploadImage} from '../../../app/useCases/utils/uploadImage'
import {AddCategoryUseCases,CheckExistCategory,getAllCategoryUseCases, isListedProductUsecases,deleteProductUsecases,EditCategoryUseCases} from "../../../app/useCases/admin/Category"

// * types
import {IMulterFile} from '../../../domain/entities/Admin'
import { StatusCode } from "../../../domain/entities/commonTypes"


export const addCategoryController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`req reached addCategory controller`) 

        const ExistCategory = await CheckExistCategory(req?.body?.CategoryName)

        console.log(ExistCategory)
        if(ExistCategory){ return res.status(StatusCode.Conflict).json({success:false,message:'Producet already exist'})}

        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file)    // * call uploadImage usecases
        req.body.categoryImage = imageUrl
        await AddCategoryUseCases(req.body)  // * call usecases
        return res.status(StatusCode.Success).json({success:true,message:'Product has been added'})
          
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
        console.log(req.body.categoryImage)
        if(req.body.newImage){
            const file: IMulterFile |any = req.file
            const imageUrl = await uploadImage(file)  
            console.log(imageUrl)
            req.body.categoryImage = imageUrl
        }
        console.log(req.body.categoryImage)
        await EditCategoryUseCases(req.body)
        return res.status(StatusCode.Success).json({success: true,message:'Product has been successfully edit'})
    }catch(error){
        console.log(`Error from EditCategory\n${error}`)
        next(error)
    }

}

export const verifyListController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await isListedProductUsecases(req.body._id,req.body.isListed)
        return res.status(StatusCode.Success).json({success:true,message:'List has been updated'})
        
    } catch (error) {
        console.log(`Error from verifyListController\n${error}`)
        next(error)
    }
}

export const deleteProductController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`Req reached deleteProductController`)
       
        await deleteProductUsecases(req?.params?.id)
        return res.status(StatusCode.Success).json({success:true,message:'Product has been deleted'})
    } catch (error) {
        console.log(`Error from deleteProductController\n${error}`)
        next(error)
    }
}


export const adminLogoutController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`req reached adminLogout`)
        console.log(req.cookies)
        res.clearCookie('accessToken'); // * Clear the accessToken
         
        res.clearCookie('adminToken', {  // * Clear the refresh token cookie
            httpOnly: true,
            secure: true, 
            sameSite: 'strict'
        });
        req.session.destroy((err)=>{
            if(err){
                console.log('Error destroying session:', err);
                return res.status(StatusCode.InternalServerError).json({sucess:true,message: 'Logout failed' });
            }
             // * Successfully logged out
             return res.status(StatusCode.Success).json({success:true, message: 'Logged out successfully' });
        })
       
    } catch (error) {
        console.log(`Error from adminLogout\n${error}`)
        next(error)
    }
}