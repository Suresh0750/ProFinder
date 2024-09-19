import { OtpRepository } from "../../../domain/repositories/OtpRepository";
import { CustomerOTP } from "../../../domain/entities/CustomerOTP";
import { customerOTPModel } from "./models/OTPModel";
import {UserModel} from './models/UserModel'
import {WorkerModel} from "./models/workerModel"

export const OTPRepository = (): OtpRepository => ({
  createOTP: async (
    customerId: string,
    OtpPIN: number,
    otpExpiration: Date
  ) => {
    try {
      const otpDoc = new customerOTPModel({
        customerId,
        OtpPIN,
        otpExpiration,
      });

      await otpDoc.save();
      return;
    } catch (error) {
      console.log(
        `Error from infrastructure->Otp repository ->createOTP\n`,
        error
      );
      throw error;
    }
  },
  CustomerVerifyOTP: async (otpValue: number, customerId: string) => {
    try {
      // * varifyOTP 

      const CustomerOtpData = await customerOTPModel.findOne({customerId});

      if(CustomerOtpData?.OtpPIN==otpValue) return true
      else throw new Error('OTP mismatch. Please try again.')

    } catch (error) {
      // Error handling logic missing
      console.log(`Error from infrastructure->Otp repository ->MongooseOtpRepository \n ${error}`)
      throw error
    }  
},  
 verifyUser:async(userId:string)=>{
  try{
    console.log(`req entered mongose verifyUser controller, ${userId}`)
    await UserModel.findByIdAndUpdate({_id:userId},{$set:{isVerified:true}}) 
  }catch(err){
    console.log(`Error from infrastruture->database->MongooseOtpRepository \n ${err}`)
    throw err
  }
},
 verifyWorker:async(workerId:string)=>{
  try{
    console.log(`req entered mongose verifyUser controller, ${workerId}`)
    await WorkerModel.findByIdAndUpdate({_id:workerId},{$set:{isVerified:true}}) 
  }catch(err){
    console.log(`Error from infrastruture->database->MongooseOtpRepository \n ${err}`)
    throw err
  }
},
  getUserDataResendOTP:async(customerId:string)=>{
    try{
      console.log(`req entered mongose getUserDataResendOTP`)
      const userData = await UserModel.findById({_id:customerId});
      console.log(userData?.EmailAddress)
      return userData?.EmailAddress
    }catch(error){
      console.log( `Error from infrastruture->database->MongooseOtpRepository  \n ${error}`)
      throw error
    }
  },
  getWorkerDataResendOTP:async(customerId:string)=>{
    try{
      console.log(`req entered mongose getUserDataResendOTP`)
      const workerData = await WorkerModel.findById({_id:customerId});
      console.log(workerData?.EmailAddress)
      return workerData?.EmailAddress
    }catch(error){
      console.log( `Error from infrastruture->database->MongooseOtpRepository  \n ${error}`)
      throw error
    }
  },
  deleteOTP: async (customerId:string) =>{
    try{
      await customerOTPModel.deleteOne({customerId})
    }catch(error){
      console.log(`Error from infrastruture->database->ResendOTPStore  \n ${error}`)
      throw error
    }
  }
});

