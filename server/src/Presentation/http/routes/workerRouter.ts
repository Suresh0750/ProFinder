import {Router} from "express"
import { PersonalInformationControll,ProfessionalInfoControll,isCheckEmail,getWorkerDataController,LoginWorkerController,AddProjectDetails, getProjectDetails, getSingleWorkerDetails, getAllRequestController, isAcceptWorkController} from "../controllers/WorkerController"
import upload from '../../../infrastructure/service/multer'
import {authorizeRoles} from '../middlewares/authorizeRoles'
import { customeVerify } from "../middlewares/JWTVerify/customerVerify"


const workerRouter = Router()


// * request details or woker

workerRouter.get("/getRequestData:workerId",authorizeRoles('worker'),getAllRequestController)
workerRouter.put("/isAcceptWork/:update",isAcceptWorkController)

// * get single worker Details
workerRouter.get('/singleWorkerDetails:workerid/:userId',getSingleWorkerDetails) 

// * Worker in worker Project upload 
workerRouter.post("/uploadWorkerProject",upload.single('image'),AddProjectDetails)
workerRouter.get('/getWorkerProject:id',authorizeRoles('worker'),getProjectDetails)

workerRouter.post("/personalinfo",upload.single('profileImage'),PersonalInformationControll)
workerRouter.post("/ProfessionalInfo",upload.single('Identity'),ProfessionalInfoControll)
workerRouter.post("/checkEmailForgetPass",isCheckEmail)
workerRouter.get("/getWorkerData",authorizeRoles('worker'),getWorkerDataController)
workerRouter.post('/loginverify',LoginWorkerController)



export default workerRouter