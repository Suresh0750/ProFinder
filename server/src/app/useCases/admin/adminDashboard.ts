
import { json } from 'body-parser'
import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'





export const adminWorkerUsecases = async()=>{
    try {
        const [getComplete,getTopWorker] = await Promise.all([
            AdminMongoose().getCompletedWorkerCount(),
            AdminMongoose().getTopWorker()
        ])
        console.log('getCompleted worker')
        console.log(JSON.stringify(getComplete))
        console.log('get top worker')
        console.log(JSON.stringify(getTopWorker))
        return 
    } catch (error) {
        console.log(`Error from useCases->admin->adminWorkerUsecause\n`,error)
        throw error
    }
}

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