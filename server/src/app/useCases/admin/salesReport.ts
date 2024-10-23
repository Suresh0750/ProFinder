
// usernameFilter=null&workerNameFilter=null&categoryFilter=null&dateFilter=null
import {AdminMongoose} from '../../../infrastructure/database/mongoose/MongooseAdminRepository'

// * ADMIN SALES REPORT * //

export const salesUsecases = async(data:any)=>{
    try {
        console.log('sales side')
        console.log(data)
        let query:{[key:string]:string} ={}
        if(data?.username){
            query.user = data?.username
        }
        if(data?.workerNameFilter){
            query.worker = data?.worker
        }
        if(data?.categoryFilter){
            query.service = data?.categoryFilter
        }
        if(data?.dateFilter){
            query.preferredDate = data?.dateFilter
        }
        console.log(query)
        const [
            salesDatas,
            count 
        ] = await Promise.all([
            AdminMongoose().getSalesDatas(query),
            AdminMongoose().getSalesDatasCount(query)
        ])
        return {
            salesDatas,
            count
        } 
        
    } catch (error) {
        console.log(`Error from useCases->admin->salesUsecases\n`,error)
        throw error
    }
}

export const getCategory = async()=> await AdminMongoose().getAllCategory()