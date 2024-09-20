


import { User } from "../entities/User";
import { WorkerInformation } from "../entities/Worker";


export interface CustomerRepository {
    UserGoogleLogin(user:User): Promise<any>;
    UserWorkerLogin(workerData:WorkerInformation): Promise<any>;
}