
import {
    PersonalInformation,
    ProjectDetails,
    WorkerInformation,
    getProjectData,
    workerRequest,
    messageTypes
} from '../entities/Worker'
import {conversationTypes,messageType} from '../entities/commonTypes'
import {Types} from 'mongoose'

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
    getProjectDetailsQuery(_id:string): Promise<getProjectData | null>
    getSingleWorkerDetailsQuery(_id:string) : Promise<WorkerInformation | null>
    getAllRequestQuery(workerId:string) : Promise<workerRequest[]> // fetch request of worker data
    isAcceptWorkQuery(_id:string,isPayment:number):Promise<void>
    isRejectWorkQuery(_id:string) : Promise<void>
    IsActivityQuery(requestId:string,paymentId:string) : Promise<void>
    getChatsNameQuery(workerId:string) : Promise<conversationTypes[]>
    messageQuery(data:messageTypes) : Promise<messageTypes>
    updatemessage({_id,lastMessage}:{_id:Types.ObjectId,lastMessage:string}) : Promise<void>
    fetchMessage(conversationId:string):Promise<messageType[] | null>
    getSingleMsg(message:string):Promise<messageType |null>
}