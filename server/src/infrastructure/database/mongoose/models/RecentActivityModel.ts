
import {Schema,model} from 'mongoose'


const ResentActivitySchema = new Schema({
    requestId : String,
    isCompleted: Boolean,
    paymentId : String,
   
},{ timestamps: true })

export const ResentActivityModal = model("ResentActivitySchema",ResentActivitySchema)