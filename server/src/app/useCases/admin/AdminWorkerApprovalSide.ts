

import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'



export const AdminWorkerApprovalUseCases = async ()=>{
    try {
        return await AdminMongoose().getUnApprovalWorker()
    } catch (error) {
        console.log(`Error from AdminWorkerApprovalUseCses \n ${error}`)
        throw error
    }
}