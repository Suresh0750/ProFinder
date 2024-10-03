
import {Schema,model} from 'mongoose'


const RequestSchema = new Schema({
    service : String,
    worker :String,
    user : String,
    preferredDate : String,
    preferredTime : String,
    servicelocation : String,
    AdditionalNotes : String,
    userId : String,
    workerId : String,
    isAccept : {
        type:String,
        default: "Pending"
    },
    payment :{
        type : Number,
        default : 0
    }
},{ timestamps: true })


export const RequestModal = model("RequestCollection",RequestSchema)