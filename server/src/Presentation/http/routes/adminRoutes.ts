
import {Router} from 'express'
import {addCategoryController,AdminVerify} from "../controllers/AdminController"
import upload from '../../../infrastructure/service/multer'

const adminRoutes = Router()


adminRoutes.post("/addCategory",upload.single('CategoryImage'),addCategoryController)
adminRoutes.post("/adminVerify",AdminVerify)

export default adminRoutes


