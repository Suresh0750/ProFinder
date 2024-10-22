
import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'

export const adminOverviewUsecases = async()=>{
    try {
        const [
            jobStatus,
            revenueData,
            workerDistribution
        ] = await Promise.all([
            AdminMongoose().jobStatus(),
            AdminMongoose().paymentData(),
            AdminMongoose().workerDistribution()
        ]);
        return {
            jobStatus,
            revenueData,
            workerDistribution
        }
    } catch (error) {
        console.log(`Error from useCases->admin->adminOverviewUsecases\n`,error)
        throw error
    }
}

export const dashboardUsecases = async()=>{
    try {

        const [
            totalRevenue,
            totalReview,
            totalWorkers,
            avgRating
        ] = await Promise.all([
            AdminMongoose().totalRevenue(),
            AdminMongoose().totalReview(),
            AdminMongoose().totalWorkers(),
            AdminMongoose().avgRating()
        ])
        return {
            totalRevenue,
            totalReview,
            totalWorkers,
            avgRating,
        }
    } catch (error) {
        console.log(`Error from useCases->admin->dashboardUsecases\n`,error)
        throw error
    }
}