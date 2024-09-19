import { Router } from "express";
import {validateUserSignUp,isEmailValidate} from '../middlewares/validationMiddleware'
import { userSignupController,LoginUser,isCheckEmail } from "../controllers/UserController";

const userRouter = Router()


userRouter.post('/userSignup',validateUserSignUp,userSignupController)
userRouter.post('/loginverify',LoginUser)
userRouter.post('/checkEmailForgetPass',isEmailValidate,isCheckEmail)   // * check the email for forget Password page



export default userRouter