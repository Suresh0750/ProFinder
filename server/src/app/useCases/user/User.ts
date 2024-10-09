import { StatusCode } from "../../../domain/entities/commonTypes";
import { User ,profileTypes,conversationTypes} from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { getUserRepository } from "../../../infrastructure/database/mongoose/MongooseUserRepository";
import { hashPassword } from "../../../shared/utils/encrptionUtils";
import { OtpService } from "../../services/OtpService";
import { OtpStoreData } from "../utils/OtpStoreData";


// * user in chat side

export const getConversationUsecases = async(id:string)=>{
  try {
    return await getUserRepository().fetchConversation(id)
  } catch (error) {
    console.log(`error from usecase in getConversationUsecases`, error);
    throw error;
  }
}


export const conversationUsecases = async(data:conversationTypes)=>{
  try {
    const chcekExist :conversationTypes|null = await getUserRepository().checkConversation(String(data?.userId))
    if(chcekExist){
      await  getUserRepository().updateConversation(data)
    }else{
      await getUserRepository().conversationQuery(data)  // * create conversation
    }
    const conversationId = await getUserRepository().findconversationId(String(data?.userId))
    if(data?.lastMessage && conversationId?._id) await getUserRepository().createMessage({conversationId:conversationId?._id,sender:data?.userId,message:data?.lastMessage})
    return 
  } catch (error) {
    console.log(`error from usecase in conversationUsecases`, error);
    throw error;
  }
}

// * profile side
export const EditprofileUsecases = async(data:profileTypes)=>{
  try{
      const {username,email,phone,profile} = data
      const userData = {
        username,
        PhoneNumber:phone,
        EmailAddress : email,
        profile
      }
      return getUserRepository().updateprofile(userData)
  }catch(error){
    console.log(`error from usecase in editprofileUsecases`, error);
    throw error;
  }
}

export const ProfileUsecases = async (_id:string)=>{
  try {
    return getUserRepository().Profile(_id)
  } catch (error) {
    console.log(`error from usecase in ProfileUsecases`, error);
    throw error;
  }
}

export const createUser = async (userData: User) => {
  try {
    
    console.log(`req comes usecase createUser`);
    const {findUserByEmail,insertUserDetails,createUser}: IUserRepository = getUserRepository();
    const isExistUser: User | null = await findUserByEmail(
      userData.EmailAddress
    );
    if (isExistUser && isExistUser?.isVerified) {
      throw new Error("Email is already exist");
    }

    const hashPass = await hashPassword(userData.Password); // * here we used to hash the password
    userData.Password = hashPass;
    let _id: string | undefined;
    if (isExistUser && !isExistUser?.isVerified) {
      
      await insertUserDetails(userData);
      userData = isExistUser;
      _id = isExistUser._id;
    } else {
      userData = await createUser(userData); // * we store the data to the database
      _id = userData._id;
    }

    const { customerOTP, customerId } = await OtpService(_id, userData.EmailAddress); // * call the otpService
    console.log(`${customerOTP} -- ${customerId}==>`);
    await OtpStoreData(customerId, customerOTP);
    return customerId;

  } catch (err) {
    console.log(`error from usecase in createUser`, err);
    throw err;
  }
};
