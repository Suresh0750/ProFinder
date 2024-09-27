

import {AdminMongoose} from "../../../infrastructure/database/mongoose/MongooseAdminRepository"

export const getAllUserUseCase = async()=>{
    try{
        return await AdminMongoose().getAllUserList()
    }catch(error){
        console.log(`Error from useCases->admin->getAllUserUseCase\n`,error)
        throw error
    }
}