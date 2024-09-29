
import {PersonalInformation,ProjectDetails,WorkerInformation} from '../entities/Worker'

export interface WorkerRepository{
    createWorker (workerData:PersonalInformation) : Promise<PersonalInformation | null>
    findWorker(workerEmail:string) : Promise<PersonalInformation | null>
    ischeckEmail(userEmail:string): Promise<string | undefined>
    setNewPassWord(customerId:string,newPass:string) :Promise<void>
    loginVerifyQuery(userEmail:string):Promise<WorkerInformation | null>
    getWorkerData(workerId:string):Promise<WorkerInformation | null>
    insertWorker (customerData:WorkerInformation) : Promise<WorkerInformation | null>
    chagneExitWorkerCategoryName(existName:string,newName:string) :Promise<void>   // * here the worker category will update if Admin change their category
    addWorkerProjectDetails(_id:string,ProjectDetails:ProjectDetails):Promise<void> // * worker add project Details
}