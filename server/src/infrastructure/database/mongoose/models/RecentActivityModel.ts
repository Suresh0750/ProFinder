
import {Schema,model,Types} from 'mongoose'


const ResentActivitySchema = new Schema({
    requestId : {type:Types.ObjectId,ref:'RequestCollection',required:true},
    workerId : {type:String,required:true},
    isCompleted: {type:Boolean,default:false},
    paymentId : {type:String},
    payment : {type:Number}
},{ timestamps: true })

export const ResentActivityModel = model("ResentActivitycollection",ResentActivitySchema)