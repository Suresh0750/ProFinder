

import { Request,Response,NextFunction } from "express"
import {OtpVerifyUseCases} from "../../../app/useCases/utils/OtpStoreData"
import {getVerifyOTP} from '../../../domain/entities/CustomerOTP'
import {JwtService} from '../../../infrastructure/service/JwtService'
import {Cookie,StatusCode} from '../../../domain/entities/commonTypes'
import {userVerification,workerVerification,ForgetPassWordUseCase,customerResentOTP,GoogleLoginUseCases} from '../../../app/useCases/utils/customerVerification'


export const CustomerOtpController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(`req reach customerotp controller`)

        const {otpValue,userId}:getVerifyOTP = req.body
        const isVerifyOTP = await OtpVerifyUseCases(otpValue,userId)
        if(isVerifyOTP ){
            
            if(req.body.role == 'user'){
                const userData =  await  userVerification(req.body.userId,(req.body.role || "user"))   // * call to verify the customer or update the verify status in database
              

                const  {refreshToken,accessToken} = JwtService((req.body.userId).toString(),(userData?.username || ''),(userData?.EmailAddress || ''),(req.body.role || "user"))   // * mongose Id converted as a string
                // * JWT referesh token setUp
                res.cookie(Cookie.User,refreshToken,{
                    httpOnly:true,
                    secure :true,
                    sameSite:'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })

                res.cookie('accessToken',accessToken,{
                    maxAge: 15 * 60 * 1000
                })   
                const customerData = {
                    _id:userData?._id,
                    customerName : userData?.username,
                    customerEmail : userData?.EmailAddress,
                    role : 'user'
                } 
                
                res.status(StatusCode.Success).json({success:true,message:'OTP valid and user verified',customerData})
            
            }else{

                const workerData =  await  workerVerification(req.body.userId) 

                const  {refreshToken,accessToken} = JwtService((req.body.userId).toString(),(workerData?.FirstName || ''),(workerData?.EmailAddress || ''),(req.body.role || "worker"))   // * mongose Id converted as a string
                // * JWT referesh token setUp
        
                res.cookie(Cookie.Worker,refreshToken,{
                    httpOnly:true,
                    secure :true,
                    sameSite:'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                res.cookie('accessToken',accessToken,{
                    maxAge: 15 * 60 * 1000
                })

                const customerData = {
                    _id : workerData?._id,
                    customerName : workerData?.FirstName,
                    customerEmail : workerData?.EmailAddress,
                    role : 'worker'
                }

                res.status(StatusCode.Success).json({success:true,message:'OTP valid and worker verified',customerData})
            }

        }else res.status(401).json({success:false,message:'Invalid message'})
    }catch(err){
        console.log(`Error from CustomerOtpController\n ${err}`)
        next(err)
    }

}


export const ResentOTP = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body)
        const resendOtp = await customerResentOTP(req.body)
        if(resendOtp) res.status(200).json({user:req.body.customerID,success:true,message:'OTP resent successfully'})
        else res.status(500).json({user:req.body.customerID,success:false,message:'Failed to resend OTP. Please try again.'})
    } catch (error) {
        console.log(`Error from Customer Resend OTP controller\n ${error}`)
        next(error)
    }
}


// * Worker and User ForgetPassword set Controller

export const ForgetPassWordController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`Req reached ForgetPassWordController`)
       const setNewPass =  await ForgetPassWordUseCase(req.body)

       if(setNewPass){
        res.status(200).json({success:true,message:"Your password has been successfully updated!"})
       }

       res.status(500).json({ message: "Server error. Please try again later" });
        
    } catch (error) {
        console.log(`Error from ForgetPassWordController\n${error}`)
        next(error)
    }
}

export const GoogleLogin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body)
        
        if(req.body.role == "user"){
            const customerData = await GoogleLoginUseCases(req.body)
            if(customerData?._id){

                const  {refreshToken,accessToken} = JwtService((customerData?._id).toString(),'','',(req.body.role || "worker"))  
                // * JWT referesh token setUp
                res.cookie(Cookie.Worker,refreshToken,{
                    httpOnly:true,
                    secure :true,
                    sameSite:'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                res.cookie('accessToken',accessToken,{
                    // maxAge: 15 * 60 * 1000
                    maxAge: 2 * 60 * 1000
                })
                
                console.log("Google login controller",customerData)
                res.status(StatusCode.Success).json({success:true,message:"successfully login"})
            }
        }
        res.status(StatusCode.InternalServerError).json({success:false,message:'Server error'})
        
    } catch (error) {
        console.log(`Erron from GoogleLogin`,error)
        next(error)
    }
}


export const CustomerLogoutController =async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`Req reached CustomerLogoutController`)
       
        res.clearCookie(Cookie.Worker, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path : '/'
        });
      
        res.status(200).json({success:true, message: 'Logged out successfully' });
    } catch (error) {
        console.log(`Error from CustomerLogoutController\n${error}`)
        next(error)
    }
}

export const customerLogIn = async (req:Request,res:Response,next:NextFunction)=>{
    try {

        console.log(req.cookies)
        
    } catch (error) {
        console.log(`Error from customerLogIn\n${error}`)
        next(error)
    }
}