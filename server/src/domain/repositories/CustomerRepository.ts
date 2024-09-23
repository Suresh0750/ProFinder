


import { User } from "../entities/User";
import { WorkerInformation } from "../entities/Worker";


export interface CustomerRepository {
    UserGoogleLogin(user:User): Promise<any>;
    UserWorkerLogin(workerData:WorkerInformation): Promise<any>;
    WorkerGoogleLoginVerification(EmailAddress:string) : Promise<WorkerInformation | undefined | null>
    getVerifiedWorker() : Promise<WorkerInformation[]> 
}