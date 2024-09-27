

import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'


export const getALLWorkerUseCases = ()=>{
    try {
        return AdminMongoose().getAllWorkerList()
    } catch (error) {
        console.log(`Error from useCases->admin->getALLWorkerUseCases\n`,error)
        throw error
    }
}