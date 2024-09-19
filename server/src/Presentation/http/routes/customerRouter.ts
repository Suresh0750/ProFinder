
import { Router } from "express";
import { CustomerOtpController,ResentOTP,ForgetPassWordController ,GoogleLogin,CustomerLogoutController,customerLogIn} from "../controllers/CutomerOTPController";

const verifyOTPRouter = Router()

verifyOTPRouter.post('/verifyOTP',CustomerOtpController)

verifyOTPRouter.post('/resentOTP',ResentOTP)

verifyOTPRouter.post('/setForgotPassword',ForgetPassWordController)
verifyOTPRouter.post('/CustomerGoogleLogin',GoogleLogin)

verifyOTPRouter.post("/cutomerLogout",CustomerLogoutController)
verifyOTPRouter.post("/customerLogIn",customerLogIn)

export default verifyOTPRouter





