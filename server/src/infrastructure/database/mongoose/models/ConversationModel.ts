import {Schema,model} from 'mongoose'

const ConversationShema = new Schema({
    participants : [String],
    lastMessage : String,
},{timestamps:true})


export const ConversationModel = model("ConversationCollection",ConversationShema)