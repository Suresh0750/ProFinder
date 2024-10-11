
"use client"
import React, { useState,useEffect } from 'react'
import { Search, Send } from 'lucide-react'
import {
  useConversationMutation,
  useGetAllconversationQuery,
  useGetAllMessageQuery,
} from '../../lib/features/api/userApiSlice'
import {conversationData} from '@/types/userTypes'
import {readMsgType,newMessage} from '@/types/utilsTypes'
import {io,Socket} from 'socket.io-client'

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}


interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
}


export default function Chats() {


  const [inputMessage, setInputMessage] = useState("")
  const [conversation] = useConversationMutation()
  const [conversationsData,setConversations] = useState([])
  const [conversationID,setConversationID] = useState('')
  const [stopFetch,setStopFetch] = useState<boolean>(true)
  const [messages,setMessages] = useState<readMsgType[]>([])
  const {_id} = JSON.parse(localStorage.getItem('customerData') || '{}')
  const customerData = JSON.parse(localStorage.getItem('customerData') || '{}')
  const [messageBox,setMessageBox] = useState({})
  const [socket,setSocket] = useState<Socket|null>(null)
 
  // * Fetch all conversation
  const {data} = useGetAllconversationQuery(_id)
  const {data:allMessage} = useGetAllMessageQuery(conversationID,{skip:stopFetch})

  // * connect the socket
  useEffect(()=>{
    const socketInstance = io('http://localhost:3001')
 
    setSocket(socketInstance)

    socketInstance.on("connect",()=>{
      console.log("Socket connected:", socketInstance.id);
    })
    return ()=>{
      socketInstance.disconnect();
    }
  },[])

  useEffect(()=>{
    if (socket && conversationID) {
      socket.emit("joinRoom", conversationID);
    }
  },[socket,conversationID])

  // useEffect(()=>{
  //   if (socket) {
  //     socket.on("message", (newMessage: newMessage) => {
  //       // alert(JSON.stringify(newMessage))
  //       setMessages((prevMessage:any)=>[...prevMessage,newMessage])
  //     });

  //     return () => {
  //       socket.off("message");
  //     };
  //   }
  // },[socket])

  useEffect(()=>{
    if (socket) {
      socket.on("message", (newMessage: newMessage) => {
        setMessages((prevMessage:any)=>[...prevMessage,newMessage])
        setConversations((prevConv:any)=>{
          const result = prevConv?.map((conv)=>{
            alert(JSON.stringify(conv))
            if(conv._id==newMessage?.conversationId){
              return {...conv,lastMessage:newMessage?.message}
            }
            return conv
          })
          return result
        })
      });

      return () => {
        socket.off("message");
      };
    }
  },[socket])

  
  useEffect(()=>{    // * stop to working the RTK query tool get method
    setStopFetch(false)
  },[conversationID])


  useEffect(()=>{
    setMessages(allMessage?.result)
    console.log(JSON.stringify(allMessage?.result))
  },[allMessage])
  
  useEffect(()=>{
    setConversations(data?.result)
  },[data])

  const handleShowMsg = (data: conversationData) => {
    if (!data || !data._id) {
        console.warn("Invalid data or missing ID:", data);
        return; // Early exit if data is invalid
    }

    console.log("Showing message for conversation ID:", data._id);

    setConversationID(data._id);
    setMessageBox(data);

    setConversations((prevConv:any) => {
       
        const result = prevConv?.map((conv) => {
            if (conv._id === data?._id) {
                console.log("Updating unread count for:", conv);
                return { ...conv, userUnread: 0 }; // Update unread count
            }
            return conv; // Return original conversation
        });

        return result;
    });
};
  const handleSendMessage =async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() !== "") {
      // Here you would typically send the message to your backend
      console.log("Sending message:", inputMessage)
   
      setInputMessage("")
      if((inputMessage).trim()=='') return
  
      const result = await conversation({lastMessage:inputMessage,userId:_id,workerId:messageBox?.workerId?._id,conversationId:conversationID})
    }
  }

  return (
    <div className="flex h-[82vh]  mt-2 gap-2 bg-gray-100">
      {/* Left sidebar */} 
      <div className="w-1/3 m-2 bg-white rounded border-r">
        <div className="p-4 text-1xl font-bold flex justify-between">
        <h2 className='text-center py-2'>Message</h2>
          <button className=" bg-indigo-100 text-indigo-600 py-2 px-4 rounded font-medium">
            + Compose
          </button>
        </div>
        <div className="px-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(80vh-120px)]">
          {conversationsData?.length>0 && conversationsData.map((conv) => (
            <div key={conv?._id} onClick={()=>handleShowMsg(conv)} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <img src={conv?.workerId?.Profile} alt={conv?.workerId?.FirstName} className="w-10 h-10 rounded-full" />
                {false && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{conv?.workerId?.FirstName}</h3>
                  <div>
                  <span className="text-xs text-gray-500">{(conv?.updatedAt)?.split('T')[1]?.split('.')[0]}</span>
                  <div className=" bottom-0 right-0 text-center bg-green-400 rounded-full border-2 border-white">
                    {
                      conv?.userUnread>0 && <span className='w-3 h-3'>{conv?.userUnread}</span> 
                    }
                    
                  </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate">{conv?.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right chat area */}
      <div className="flex-1 m-2 flex rounded border-r flex-col">
        {/* Chat header */}
        <div className="bg-white p-4 border-b flex items-center">
        <img src={messageBox?.workerId?.Profile} alt={messageBox?.workerId?.FirstName} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <h2 className="font-semibold">{messageBox?.workerId?.FirstName}</h2>
            {/* <p className="text-sm text-green-500">Active Now</p> */}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages && messages.map((message) => (
              <div key={message?._id} className={`flex ${message?.sender ==customerData?._id ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs ${message?.sender ==customerData?._id ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-lg p-3`}>
                  <p className="text-sm">{message?.message}</p>
                  <p className="text-xs text-right mt-1 opacity-70">{message?.createdAt}</p>
                </div>
              </div>  
            ))}
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="bg-white p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 border rounded-full py-2 px-4 mr-2"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="bg-indigo-600 text-white rounded-full p-2">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}