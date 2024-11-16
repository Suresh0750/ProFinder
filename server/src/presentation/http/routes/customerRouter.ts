
import { Router } from "express";
import {verifyTokenAndRole} from '../middlewares/verifyTokenAndRole'
import upload from '../../../infrastructure/service/multer'
import {
    CustomerOtpController,
    ResentOTP,
    ForgetPassWordController ,
    GoogleLogin,
    CustomerLogoutController,
     WorkerGoogleLoginWithRegistrastion, 
    getCategoryName,
    getVerifiedWorkerController,
     getNearByWorkerDetailsController, 
    userRequestWorkerController, 
    paymetnAPIController,
    paymentIdController,
    ReviewController,
    getReviewController,
    paymentDetails
} from "../controllers/customerController";

const customerRouter = Router()



// * Review of worker
customerRouter.get("/review/:id",verifyTokenAndRole('customer'),getReviewController)
customerRouter.post("/review",verifyTokenAndRole('customer'),ReviewController)
// customerRouter.get("/getReview",getReviewUsecases)

// * payment gatway

customerRouter.post("/paymetAPI",paymetnAPIController)
customerRouter.post("/savePaymentId",paymentIdController)
customerRouter.get("/payment-details/:requestId", paymentDetails)

// * router for Request 
customerRouter.post('/userRequestWorker',verifyTokenAndRole('customer'),userRequestWorkerController)


customerRouter.post('/verifyOTP',CustomerOtpController)
customerRouter.post('/resentOTP',ResentOTP)

customerRouter.post('/setForgotPassword',ForgetPassWordController)
customerRouter.post('/CustomerGoogleLogin',upload.single('Identity'),GoogleLogin)

customerRouter.post("/cutomerLogout",verifyTokenAndRole('customer'),CustomerLogoutController)
// customerRouter.post("/customerLogIn",customerLogIn) 
customerRouter.post("/customerGoogleVerification",WorkerGoogleLoginWithRegistrastion)   // * worker login with google

// customerRouter.post

customerRouter.get('/getALLVerifiedWorker/:lat/:lon',getVerifiedWorkerController)

customerRouter.get('/getCategoryName',getCategoryName)
customerRouter.post('/getNearByWorkerDetails/:categoryName',verifyTokenAndRole('customer'),getNearByWorkerDetailsController)

export default customerRouter   