import { Request,Response,NextFunction, json } from "express";
import { createUser } from "../../../app/useCases/user/createUser";
import {JwtService} from '../../../infrastructure/service/JwtService'
import {LoginVerify} from "../../../app/useCases/user/loginVerifyUser"
import {isCheckUserEmail} from '../../../app/useCases/user/forgetPass'
 
import { StatusCode } from "../../../domain/entities/commonTypes";

export const userSignupController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user:string = await createUser(req.body);
        res.status(StatusCode.Success).json({user,success:true})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const LoginUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const loginUsecase = await LoginVerify(req.body?.EmailAddress,req.body?.Password)

        console.log(loginUsecase)        
        if(!loginUsecase){
            res.status(StatusCode.Unauthorized)
            throw new Error('check email and password')
        } 
        else if(loginUsecase && loginUsecase?._id){
    
            const  {refreshToken,accessToken} = JwtService((loginUsecase._id).toString(),loginUsecase.username,loginUsecase.EmailAddress,(req.body.role || "user"))   // * mongose Id converted as a string
        
            // * JWT referesh token setUp
            console.log('user login')
            console.log(refreshToken,accessToken)
            res.cookie('userToken',refreshToken,{
                httpOnly:true,
                secure :true,
                sameSite:'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.cookie('accessToken',accessToken,{
                maxAge: 2 * 60 * 1000
            })
            const customerData = {
                _id:loginUsecase._id,
                customerName : loginUsecase.username,
                customerEmail : loginUsecase.EmailAddress,
                role : 'user'
            }
            res.status(StatusCode.Success).json({success:true,message:'Login successful',customerData}) 
        }   
    }catch(error){
        console.log(`Error from Presntation->controllers ${error}`)
        next(error)
    }
}


// * check email is there or not for forget password page

export const isCheckEmail = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        console.log(req.body)
        const userEmailValidation = await isCheckUserEmail(req.body.email)
        console.log("isCheckEmail",JSON.stringify(userEmailValidation.toString()))
        if(userEmailValidation){
            res.status(200).json({success:true,message:'verified success',userEmailValidation})
        }else {
            res.status(404).json({
                success: false,
                message: 'This email is not registered. Please check your email address.',
              });}
    } catch (error) {
        console.log(`Error from Presntation->controllers->isCheckEmail \n${error}`)
        next(error)
    }
}