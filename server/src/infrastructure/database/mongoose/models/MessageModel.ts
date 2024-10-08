

import {Schema,model} from 'mongoose'


const MessageSchema = new Schema({
    conversation:{
        type:Schema.Types.ObjectId,
        required:true
    },
    sender:{type:String,required:true},
    message:{type:String,required:true},
    isRead: {type:Boolean,required:true,default:false}
},{timestamps:true})


export const MessageModel = model("messagecollection",MessageSchema)