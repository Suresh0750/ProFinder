import {Router} from "express"
import { PersonalInformationControll,ProfessionalInfoControll,isCheckEmail,getWorkerDataController,LoginWorkerController} from "../controllers/WorkerController"
import upload from '../../../infrastructure/service/multer'
import {authorizeRoles} from '../middlewares/authorizeRoles'


const workerRouter = Router()


workerRouter.post("/personalinfo",upload.single('profileImage'),PersonalInformationControll)
workerRouter.post("/ProfessionalInfo",upload.single('Identity'),ProfessionalInfoControll)
workerRouter.post("/checkEmailForgetPass",isCheckEmail)
workerRouter.get("/getWorkerData",authorizeRoles('worker'),getWorkerDataController)
workerRouter.post('/loginverify',LoginWorkerController)



export default workerRouter