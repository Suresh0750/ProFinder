
import { json } from 'body-parser'
import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'
import {getWorkerData} from '../../../infrastructure/service/topWorkelist'


export const reviewUsecases = async()=>{
    try {
        return await AdminMongoose().getRecentReview()
    } catch (error) {
        console.log(`Error from useCases->admin->adminWorkerUsecause\n`,error)
        throw error
    }
}

export const workerUsecases = async()=>{
    try {
        const [getComplete,getTopWorker] = await Promise.all([
            AdminMongoose().getCompletedWorkerCount(),
            AdminMongoose().getTopWorker()
        ])
        return await getWorkerData(getComplete,getTopWorker)
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