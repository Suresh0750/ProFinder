
import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'

export const adminOverviewUsecases = async()=>{
    try {
        const totalRevenue = await AdminMongoose().totalRevenue()
    } catch (error) {
        console.log(`Error from useCases->admin->getALLWorkerUseCases\n`,error)
        throw error
    }
}