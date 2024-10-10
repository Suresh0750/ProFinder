

import {io} from '../../../server'
import {messageType} from '../../../domain/entities/commonTypes'

export const sendMessage =async (message:messageType)=>{
    try {
       await io.to(String(message?.conversationId)).emit("message",message)
    } catch (error) {
        console.log(`Error from app->useCause->utils->chatUtils`)
        console.log(error)
        throw error
    }
}