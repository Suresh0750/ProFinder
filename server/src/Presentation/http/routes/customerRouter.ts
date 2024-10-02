
import { Router } from "express";
import { CustomerOtpController,ResentOTP,ForgetPassWordController ,GoogleLogin,CustomerLogoutController,customerLogIn, WorkerGoogleLoginWithRegistrastion, getCategoryName,getVerifiedWorkerController, getNearByWorkerDetailsController, userRequestWorkerController, paymetnAPIController} from "../controllers/customerController";
import {authorizeRoles} from '../middlewares/authorizeRoles'
import {customeVerify} from '../middlewares/JWTVerify/customerVerify'
import upload from '../../../infrastructure/service/multer'

const customerRouter = Router()

// * payment gatway

customerRouter.post("/paymetAPI", paymetnAPIController)

// * router for Request 

customerRouter.post('/userRequestWorker',authorizeRoles('customer'),userRequestWorkerController)


customerRouter.post('/verifyOTP',CustomerOtpController)
customerRouter.post('/resentOTP',ResentOTP)

customerRouter.post('/setForgotPassword',ForgetPassWordController)
customerRouter.post('/CustomerGoogleLogin',upload.single('identity'),authorizeRoles('customer'),GoogleLogin)

customerRouter.post("/cutomerLogout",authorizeRoles('customer'),CustomerLogoutController)
customerRouter.post("/customerLogIn",customerLogIn) 
customerRouter.post("/customerGoogleVerification:email",authorizeRoles('customer'),WorkerGoogleLoginWithRegistrastion)   // * worker login with google

customerRouter.get('/getALLVerifiedWorker',authorizeRoles('customer'),getVerifiedWorkerController)

customerRouter.get('/getCategoryName',authorizeRoles('customer'),getCategoryName)
customerRouter.post('/getNearByWorkerDetails:categoryName',authorizeRoles('customer'),getNearByWorkerDetailsController)

export default customerRouter





