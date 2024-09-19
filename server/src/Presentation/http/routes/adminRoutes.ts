
import {NextFunction,Request,Response, Router} from 'express'
import {addCategoryController,AdminVerify,getAllCategory,editCategory,verifyListController} from "../controllers/AdminController"
import {verify} from '../middlewares/JWTVerify/adminVerify'
import upload from '../../../infrastructure/service/multer'

const adminRoutes = Router()


adminRoutes.post("/addCategory",upload.single('CategoryImage'),addCategoryController)
adminRoutes.post("/adminVerify",AdminVerify)

adminRoutes.get('/fetchCategoryData',verify,getAllCategory)
adminRoutes.post('/editCategory',upload.single('categoryImage'),verify,editCategory)
adminRoutes.post('/isListVerify',verify,verifyListController)

export default adminRoutes


