import { Router } from "express";
import {validateUserSignUp,isEmailValidate} from '../middlewares/validationMiddleware'
import { userSignupController,LoginUser,isCheckEmail,profile,editprofile} from "../controllers/UserController";
import {customeVerify} from '../middlewares/JWTVerify/customerVerify'
import upload from '../../../infrastructure/service/multer'

const userRouter = Router()



// * authendication 
userRouter.post('/userSignup',validateUserSignUp,userSignupController)
userRouter.post('/loginverify',LoginUser)
userRouter.post('/checkEmailForgetPass',isEmailValidate,isCheckEmail)   // * check the email for forget Password page


// * user dashboard
userRouter.get('/profile:id',customeVerify,profile)
// userRouter.put('/updateprofile',customeVerify,upload.single('newImageData'),editprofile)
userRouter.put('/updateprofile',upload.single('newImageData'),customeVerify,editprofile)



export default userRouter