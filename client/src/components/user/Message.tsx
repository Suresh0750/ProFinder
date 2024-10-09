
"use client"
import React, { useState,useEffect } from 'react'
import { Search, Send } from 'lucide-react'
import {useConversationMutation,useGetAllconversationQuery} from '../../lib/features/api/userApiSlice'

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

const conversations: Conversation[] = [
  { id: 1, name: "Liston Fermi", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Yeah sure, tell me zafor", timestamp: "just now", isOnline: true },
  { id: 2, name: "Kiran Kannan", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Thank you so much, sir", timestamp: "2 d", isOnline: false },
  // Add more conversations here...
]

const messages: Message[] = [
  { id: 1, sender: "Liston Fermi", content: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊", timestamp: "Today" },
  { id: 2, sender: "You", content: "Hello, Good Evening", timestamp: "Today" },
  { id: 3, sender: "You", content: "I'm Zafor", timestamp: "Today" },
  { id: 4, sender: "You", content: "I only have a small doubt about your lecture, can you give me some time for this?", timestamp: "Today" },
  { id: 5, sender: "Liston Fermi", content: "Yeah sure, tell me zafor", timestamp: "Today" },
]

export default function Chats() {


  const [inputMessage, setInputMessage] = useState("")
  const [conversation] = useConversationMutation()
  const [conversationsData,setConversations] = useState([])

  const {_id} = JSON.parse(localStorage.getItem('customerData') || '{}')

  // * Fetch all conversation
  const {data} = useGetAllconversationQuery(_id)
  useEffect(()=>{
    setConversations(data?.result)
  },[data])

  const handleSendMessage =async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() !== "") {
      // Here you would typically send the message to your backend
      console.log("Sending message:", inputMessage)
   
      setInputMessage("")
      if((inputMessage).trim()=='') return
      
      const result = await conversation({lastMessage:inputMessage,userId:_id,workerId:'66f05d64219621d790f6a4fb'})
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
            <div key={conv._id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <img src={conv?.workerId?.Profile} alt={conv?.workerId?.FirstName} className="w-10 h-10 rounded-full" />
                {false && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{conv?.workerId?.FirstName}</h3>
                  <span className="text-xs text-gray-500">{(conv?.updatedAt)?.split('T')[1]?.split('.')[0]}</span>
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
          <img src="/placeholder.svg?height=40&width=40" alt="Liston Fermi" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <h2 className="font-semibold">Liston Fermi</h2>
            <p className="text-sm text-green-500">Active Now</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs ${message.sender === "You" ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-lg p-3`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
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