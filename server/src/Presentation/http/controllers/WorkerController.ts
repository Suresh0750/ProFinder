import {Response,Request, NextFunction } from "express";
import {WorkerUsecase,workerExist,getWorkerData,workerProjectUsecases} from "../../../app/useCases/worker/workerUsecases"
import {LoginVerify} from "../../../app/useCases/worker/loginVerifyWorker"
import {isCheckWorkerEmail} from "../../../app/useCases/worker/forgetPass"
import {IMulterFile} from "../../../domain/entities/s3entities"
import {uploadImage} from '../../../app/useCases/utils/uploadImage'
import {PersonalInformation,WorkerInformation} from '../../../domain/entities/Worker'
import {Cookie,StatusCode} from '../../../domain/entities/commonTypes'
import {hashPassword} from '../../../shared/utils/encrptionUtils'
import {JwtService} from '../../../infrastructure/service/JwtService'




// * Worker in Project side
export const AddProjectDetails = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      
        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file) 
        req.body.ProjectImage = imageUrl
        const result = await workerProjectUsecases(req.body)
        return res.status(StatusCode.Success).json({success:true,message:'Project details has been successfully update'})
    } catch (error) {
        console.log(`Error from presentation layer-> http->AddProjectDetails\n ${error}`)
        next(error)
    }
}

export const PersonalInformationControll = async (req:Request,res:Response, next : NextFunction)=>{
    try{
        console.log(`Request reached PersonlInformation`)
        console.log(req.body)
        const checkWorker = await workerExist(req.body) // * check weather the worker exist or not
        console.log(checkWorker,'WorkerInformation | undefined')
        if(checkWorker && checkWorker.isVerified) throw new Error('Email already exist')

        console.log(`step 1`)
        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file)    // * call uploadImage usecases
        console.log(`step 2`)
        req.body.Profile = imageUrl
        const bcyptPass = await hashPassword(req.body.Password)   // * hash the password
        console.log(`step 3`)
        const workerDetails = req.body
        workerDetails.Password = bcyptPass    // * asign the bcrypt pass
        console.log(`step 4`)
        console.log(workerDetails)
        return res.status(StatusCode.Success).json({success:true,workerDetails})
    }catch(error){
        console.log(`Error from presentation layer-> http->PersonalInformation\n ${error}`)
        next(error)
    }
}

export const ProfessionalInfoControll = async (req:Request,res:Response,next:NextFunction)=>{
    try {
       
        const file: IMulterFile |any = req.file
        const imageUrl = await uploadImage(file)    // * call uploadImage usecases
        req.body.Identity = imageUrl
        console.log(req.body)
        const workerId = await WorkerUsecase(req.body)
        console.log(workerId)
        res.status(200).json({success:true,message:'Worker Details has been register',worker : workerId})
    } catch (error) {
        console.log(`Error from presentation layer-> http->ProfessionalInfoControll\n ${error}`)
        next(error) 
    }
}


export const isCheckEmail = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body)
        const userEmailValidation = await isCheckWorkerEmail(req.body.email)
        console.log("isCheckEmail",JSON.stringify(userEmailValidation.toString()))
        if(userEmailValidation){
            res.status(200).json({success:true,message:'verified success',userEmailValidation})
        }else {
            res.status(404).json({
                success: false,
                message: 'This email is not registered. Please check your email address.',
              });}
    } catch (error) {
        console.log(`Error from presentation layer-> http->isCheckEmail\n ${error}`)
        next(error) 
    }
}


export const getWorkerDataController = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(`Req reached getWorkerDataController`)
        const {workerToken} = req.cookies
        if(!workerToken) res.status(StatusCode.Forbidden).json({ message: "Unauthenticated" });
        // console.log(req)
        const workerData = await getWorkerData(workerToken)
       
        res.status(StatusCode.Success).json({success:true,message:'success',workerData})

    } catch (error) {
        console.log(`Error from presentation layer-> http->getWorkerDataController\n ${error}`)
        next(error) 
    }
}

export const LoginWorkerController = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.body)
        const loginUsecase : WorkerInformation | boolean = await LoginVerify(req.body?.EmailAddress,req.body?.Password)
        if(!loginUsecase) throw new Error('check email and password')
        else if(loginUsecase._id && loginUsecase.isVerified){
            console.log("loginUsecase",loginUsecase)
        const  {refreshToken,accessToken} = JwtService((loginUsecase?._id).toString(),loginUsecase.FirstName,loginUsecase.EmailAddress,(req.body.role || "worker"))  
        
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
        const customerData  = {
            _id: loginUsecase._id,
            customerName : loginUsecase.FirstName,
            customerEmail : loginUsecase.EmailAddress,
            role : 'worker'
        }
        res.status(StatusCode.Success).json({success:true,message:'Login successful',customerData}) 
        }  
    }catch(error){
        console.log(`Error from Presntation->controllers ${error}`)
        next(error)
    }
}

