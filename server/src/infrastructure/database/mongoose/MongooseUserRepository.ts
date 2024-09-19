

import { User,loginDetails } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import {UserModel} from './models/UserModel'


export const getUserRepository = () : IUserRepository =>({
    createUser : async (user:User) =>{
        try {
            const userDoc  = new UserModel(user);
            return  await userDoc.save();
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->createUser\n`,error)
            throw error  
        }
    },
    findUserByEmail : async (EmailAddress :string) =>{
        try{
            console.log(EmailAddress)
            const userData =  await UserModel.findOne({EmailAddress})
            return userData
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->findUserByEmail\n`,error)
            throw error
        } 
    },
    insertUserDetails : async(user:User)=>{
        try{
            await UserModel.updateOne({EmailAddress:user.EmailAddress},{$set:user},{upsert:true})
            return 
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->insertUserDetails\n`,error)
            throw error
        }
    },
    loginVerifyQuery : async(userEmail:string)=>{
        try { 
            console.log(`req reached loginVerifyQuery`)
            console.log(userEmail)      
            const userFetchDetails =  await UserModel.findOne({EmailAddress:userEmail})
            console.log(userFetchDetails)
          return userFetchDetails
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error
        } 
    },
    ischeckEmail : async(userEmail : string)=>{
        try {
            const isCheckEmail = await UserModel.findOne({EmailAddress:userEmail})
            return isCheckEmail  ? isCheckEmail._id : undefined;
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->ischeckEmail\n`,error)
            throw error
        }
    },
    setNewPassWord : async(customerId:string , newPass : string)=>{
        try{
            await UserModel.findByIdAndUpdate({_id:customerId},{$set:{Password:newPass}})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error
        }
    },
    getDataFindById : async(userId:string)=>{
        try{
            return await UserModel.findById({_id:userId})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error
        }
    }
})