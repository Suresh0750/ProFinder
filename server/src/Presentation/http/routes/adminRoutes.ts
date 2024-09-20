
import {NextFunction,Request,Response, Router} from 'express'
import {addCategoryController,AdminVerify,getAllCategory,editCategory,verifyListController,deleteProductController, adminLogoutController} from "../controllers/AdminController"
import {verify} from '../middlewares/JWTVerify/adminVerify'
import {authorizeRoles} from '../middlewares/authorizeRoles'
import upload from '../../../infrastructure/service/multer'

const adminRoutes = Router()


adminRoutes.post("/addCategory",verify,authorizeRoles('admin'),upload.single('CategoryImage'),addCategoryController)
adminRoutes.post("/adminVerify",AdminVerify)

adminRoutes.get('/fetchCategoryData',verify,authorizeRoles('admin'),getAllCategory)
adminRoutes.post('/editCategory',verify,authorizeRoles('admin'),upload.single('newImageData'),editCategory)
adminRoutes.post('/isListVerify',verify,authorizeRoles('admin'),verifyListController)
adminRoutes.delete('/deleteProduct:id',verify,authorizeRoles('admin'),deleteProductController)

// * logout 
adminRoutes.post('/adminLogout',verify,authorizeRoles('admin'),adminLogoutController)

export default adminRoutes


