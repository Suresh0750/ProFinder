import mongoose,{Document,Schema} from "mongoose";
import { User } from "../../../../domain/entities/User";

const userSchema = new Schema({
    username :{type:String, required:true},
    PhoneNumber : {type:Number,required:true},
    EmailAddress : {type:String, required:true,unique:true},
    Address :{type : String,required :true},
    Password:{type : String,required:true},
    isVerified : {type:Boolean, default:false},
    isBlock : {type:Boolean,default:false}
},{ timestamps: true })

const UserModel = mongoose.model<User & Document>('UserDatas',userSchema)
// UserModel

export {UserModel}