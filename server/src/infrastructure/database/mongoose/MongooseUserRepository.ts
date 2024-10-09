import {Types} from 'mongoose'
const { ObjectId } = Types; 

import { User,loginDetails,editprofileTypes,conversationTypes,messageTypes } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

// * Model
import {UserModel} from './models/UserModel'
import {ConversationModel} from './models/ConversationModel'
import { MessageModel } from './models/MessageModel';


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
            const userFetchDetails =  await UserModel.findOne({EmailAddress:userEmail})
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
    },
    Profile : async(_id:string)=>{
        try{
            return await UserModel.findById({_id},{isVerified:0,createdAt:0,updatedAt:0,__v:0,isBlock:0})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error
        }
    },
    updateprofile : async({EmailAddress,username,profile,PhoneNumber}:editprofileTypes)=>{
        try {
            if(profile){
                await UserModel.updateOne({EmailAddress},{username,PhoneNumber,profile})
            }else{
                await UserModel.updateOne({EmailAddress},{username,PhoneNumber})
            }
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->updateprofile\n`,error)
            throw error
        }
    },
    conversationQuery : async(data:conversationTypes)=>{
        try {
            console.log(data)
            await new ConversationModel(data).save()
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->conversationQuery\n`,error)
            throw error
        }
    },
    fetchConversation: async(userId:string)=>{
        try {
            const res = await ConversationModel.find({ userId }, { __v: 0 })
            .populate('workerId', 'FirstName Profile PhoneNumber') 
            .lean();  // * Convert Mongoose documents to plain JavaScript objects
          
            return res
            // db.conversationcollections.find({participants:{$in:['66ea91c78f03af0b8231af43']}})
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->fetcheConversation\n`,error)
            throw error
        }
    },
    checkConversation:async(userId:string)=>{
        try {
            console.log(`check conversation`)
            console.log(userId)

            return await ConversationModel.findOne({userId:new ObjectId(userId)}) // * for find the document kept ObjectId
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->checkConversation\n`,error)
            throw error
        }
    },
    updateConversation:async(data:conversationTypes)=>{
        try{
            await ConversationModel.updateOne({userId:new ObjectId(data.userId)},{$set:{lastMessage:data?.lastMessage}})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->updateConversation\n`,error)
            throw error
        }
    },
    findconversationId:async(userId:string)=>{
        try{
            console.log(await ConversationModel.findOne({userId:new ObjectId(userId)},{_id:1}))
            return await ConversationModel.findOne({userId:new ObjectId(userId)},{_id:1})
        }catch(error){
            console.log(`Error from infrastructure->mongoseUser->findconversationId\n`,error)
            throw error
        }
    },
    createMessage : async(data:messageTypes)=>{
        try {
            await MessageModel.create(data)
        } catch (error) {
            console.log(`Error from infrastructure->mongoseUser->createMessage\n`,error)
            throw error
        }
    }

})