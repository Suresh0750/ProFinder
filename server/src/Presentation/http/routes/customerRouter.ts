
import { Router } from "express";
import { CustomerOtpController,ResentOTP,ForgetPassWordController ,GoogleLogin,CustomerLogoutController,customerLogIn, WorkerGoogleLoginWithRegistrastion} from "../controllers/CutomerOTPController";
import {authorizeRoles} from '../middlewares/authorizeRoles'
import upload from '../../../infrastructure/service/multer'

const customerRouter = Router()

customerRouter.post('/verifyOTP',CustomerOtpController)
customerRouter.post('/resentOTP',ResentOTP)

customerRouter.post('/setForgotPassword',ForgetPassWordController)
customerRouter.post('/CustomerGoogleLogin',upload.single('identity'),authorizeRoles('customer'),GoogleLogin)

customerRouter.post("/cutomerLogout",authorizeRoles('customer'),CustomerLogoutController)
customerRouter.post("/customerLogIn",customerLogIn) 
customerRouter.post("/customerGoogleVerification:email",authorizeRoles('customer'),WorkerGoogleLoginWithRegistrastion)   // * worker login with google
// customerRouter.get('/getALLVerifiedWorker')

export default customerRouter





