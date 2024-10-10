"use client"
import React, { useState,useEffect } from 'react'
import { Search, Send } from 'lucide-react'

import {
    useGetmessageQuery,
    useUpdateMessageMutation,
    useFetchMessageQuery
} from '../../../lib/features/api/workerApiSlice'

const Message = ()=>{
const [inputMessage, setInputMessage] = useState("")
const [customerDatails,setCustomerDatails] = useState([])
const [conversationID,setConversationID] = useState('')
const [stopFetch,setStopFetch] = useState(true)
const [messages ,setMessages] = useState([])

// * API
const [updateMessage] = useUpdateMessageMutation()
const customerData = JSON.parse((localStorage.getItem("customerData") || '{}'))
const {data,refetch} = useGetmessageQuery(customerData?._id)
const {data:allMessage,refetch:refetchAllMsg} =  useFetchMessageQuery(conversationID,{skip:stopFetch})

useEffect(()=>{
  setStopFetch(false)
},[conversationID])

useEffect(()=>{
  setMessages(allMessage?.result)
  console.log(JSON.stringify(allMessage?.result))
},[allMessage])


const [messageBox,setMessageBox] = useState({
    _id: '67065637907ae6d250f820d9',
    userId: {
      _id: '66ea91c78f03af0b8231af43',
      username: 'Suresh',
      profile: 'https://profinder.s3.eu-north-1.amazonaws.com/uploads/1728278186893_heap 2.png'
    },
    workerId: '66f239b0523daeb45fb10a51',
    lastMessage: '',
    createdAt: '2024-10-09T10:08:55.636Z',
    updatedAt: '2024-10-09T13:29:18.381Z'
  })
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


useEffect(()=>{
    alert(JSON.stringify(data))
    console.log(JSON.stringify(data?.result))
    setCustomerDatails(data?.result)
},[data])

const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() !== "") {
      // Here you would typically send the message to your backend
      console.log("Sending message:", inputMessage)
      alert(inputMessage)
      setInputMessage("")
      const result = updateMessage({conversationId:messageBox?._id,sender:messageBox?.workerId,message:inputMessage})
      refetch()
      refetchAllMsg()
    }
  }

// const messages: Message[] = [
//   { id: 1, sender: "Liston Fermi", content: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊", timestamp: "Today" },
//   { id: 2, sender: "You", content: "Hello, Good Evening", timestamp: "Today" },
//   { id: 3, sender: "You", content: "I'm Zafor", timestamp: "Today" },
//   { id: 4, sender: "You", content: "I only have a small doubt about your lecture, can you give me some time for this?", timestamp: "Today" },
//   { id: 5, sender: "Liston Fermi", content: "Yeah sure, tell me zafor", timestamp: "Today" },
// ]

    return(
        <>
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
          {customerDatails?.length && customerDatails?.map((conv) => (
            <div key={conv?._id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer" onClick={()=>setConversationID(conv?._id)}>
              <div className="relative">
                <img src={conv?.userId?.profile} alt={conv?.userId?.username} className="w-10 h-10 rounded-full" />
                {false && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{conv?.userId?.username}</h3>
                  <span className="text-xs text-gray-500">{(conv?.updatedAt)?.split('T')[1]?.split('.')[0]}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right chat area */}
      <div className="flex-1 m-2 flex rounded border-r flex-col">
        {/* Chat header */}
        <div className="bg-white p-4 border-b flex items-center">
          <img src={messageBox?.userId?.profile} alt={messageBox?.userId?.username} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <h2 className="font-semibold">{messageBox?.userId?.username}</h2>
            <p className="text-sm text-green-500">Active Now</p>
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
        </>
    )
}


export default Message