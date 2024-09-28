
import {    Router} from 'express'
import {addCategoryController,AdminVerify,getAllCategory,editCategory,verifyListController,deleteProductController, adminLogoutController,getALLWorkerListController, getAllUserList, isBlockUserController, getAllUnApprovalWorkerlist} from "../controllers/AdminController"
import {verify} from '../middlewares/JWTVerify/adminVerify'
import {authorizeRoles} from '../middlewares/authorizeRoles'
import upload from '../../../infrastructure/service/multer'

const adminRoutes = Router()



// * admin / User side
adminRoutes.get('/getAllUserList',verify,authorizeRoles('admin'),getAllUserList)
adminRoutes.post('/isBlockUser',verify,authorizeRoles('admin'),isBlockUserController)

// * admin / Worker Approval side
adminRoutes.get('/getAllUnApprovalWorkerlist',verify,authorizeRoles('admin'),getAllUnApprovalWorkerlist)


// * admin/ worker side
adminRoutes.get("/getWorkerList",verify,authorizeRoles('admin'),getALLWorkerListController)


// * admin catagory router
adminRoutes.post("/addCategory",verify,authorizeRoles('admin'),upload.single('CategoryImage'),addCategoryController)
adminRoutes.get('/fetchCategoryData',verify,authorizeRoles('admin'),getAllCategory)
adminRoutes.post('/editCategory',verify,authorizeRoles('admin'),upload.single('newImageData'),editCategory)
adminRoutes.post('/isListVerify',verify,authorizeRoles('admin'),verifyListController)
adminRoutes.delete('/deleteProduct:id',verify,authorizeRoles('admin'),deleteProductController)


// * admin authendication 
adminRoutes.post('/adminLogout',verify,authorizeRoles('admin'),adminLogoutController)
adminRoutes.post("/adminVerify",AdminVerify)

export default adminRoutes


