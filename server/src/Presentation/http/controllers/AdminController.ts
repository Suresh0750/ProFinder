
import { Request,Response,NextFunction } from "express"
import {AdminVerifyUseCases} from '../../../app/useCases/admin/AdminVerify'
import Jwt from 'jsonwebtoken'
// * useCases
import {uploadImage} from '../../../app/useCases/utils/uploadImage'
import {AddCategoryUseCases} from "../../../app/useCases/admin/AddCategory"

// * types
import {IMulterFile} from '../../../domain/entities/Admin'
import { StatusCode } from "../../../domain/entities/commonTypes"


export const addCategoryController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`req reached addCategory controller`) 
        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file)    // * call uploadImage usecases
  
        // console.log(`image url and data\n`)
        // console.log(imageUrl)
        // console.log(req.body)

        req.body.categoryImage = imageUrl
        const categoryDetails = AddCategoryUseCases(req.body)  // * call usecases
        res.status(200).json({success:true})
          
    } catch (error) {
        console.log(`Error from addCategoryController\n${error}`)
        next(error)
    }
}


export const AdminVerify = (req:Request,res:Response,next:NextFunction)=>{
    try{

        if(AdminVerifyUseCases( req.body)){
            const refreshToken =  Jwt.sign({adminEmail: req.body.adminEmail},String(process.env.ACCESS_TOKEN_SECRET),{expiresIn:'7d'})
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

        res.status(StatusCode.Unauthorized).json({success:false,message:'Invalid credentials'})

    }catch(error){
        console.log(`Error from addCategoryController\n${error}`)
        next(error)
    }
}