'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGetAllRequestDataQuery, useAcceptWorkAPIMutation, useRejectWorkAPIMutation } from '@/lib/features/api/workerApiSlice'
import { toast, Toaster } from 'sonner'
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"

export default function ServiceRequestPage() {
  const [requestData, setRequestData] = useState([])
  const [isPayment, setIsPayment] = useState<{ [key: string]: number }>({})
  const router = useRouter()

  const [customerData, setCustomerData] = useState<any>({});
  const { data, refetch } = useGetAllRequestDataQuery(customerData?._id,{skip:customerData?._id ? false:true})
  const [acceptWorkAPI] = useAcceptWorkAPIMutation()
  const [rejectWorkAPI, { isLoading: preventRejectRequest }] = useRejectWorkAPIMutation()
  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("customerData");
      if (storedData) {
        try {
          setCustomerData(JSON.parse(storedData));
        } catch (error) {
          console.error("Error parsing customerData from localStorage:", error);
          setCustomerData({});
        }
      }
    }
  }, []);
  useEffect(() => {
    if (data?.result) {
      setRequestData(data.result)
    }
  }, [data])

  const handleCancel = async (_id: string) => {
    try {
      if (preventRejectRequest) return
      const res = await rejectWorkAPI(_id).unwrap()
      if (res?.success) {
        toast.success(res.message)
        refetch()
      }
    } catch (error) {
      toast.error('Failed to cancel request')
    }
  }

  const handleAccept = async (_id: string,userId:string) => {
    try {
      const payment = isPayment[_id]

      if (!payment || payment < 500) {
        return toast.error('Minimum payment amount is 500')
      }
      const res = await acceptWorkAPI({ _id, isPayment: payment,userId}).unwrap()
      if (res?.success) {
        toast.success(res.message)
        refetch()
      }
    } catch (error) {
      toast.error('Failed to accept request')
    }
  }

  return (
   
     <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Your Work Request Details</CardTitle>
        </CardHeader>
        <CardContent>
          {requestData.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {requestData.map((data: any, index: number) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {data?.user}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Service Location</Label>
                          <div className="font-medium">{data?.servicelocation}</div>
                        </div>
                        <div>
                          <Label>Service Date</Label>
                          <div className="font-medium">{new Date(data?.preferredDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <Label>Service Time</Label>
                          <div className="font-medium">{data?.preferredTime}</div>
                        </div>
                      </div>
                      <div>
                        <Label>About Work</Label>
                        <div className="mt-1 p-2 bg-muted rounded-md">{data?.AdditionalNotes}</div>
                      </div>
                      <div>
                        <Label htmlFor={`payment-${data._id}`}>Enter Payment (Minimum 500)</Label>
                        <Input
                          id={`payment-${data._id}`}
                          type="number"
                          min={500}
                          value={isPayment[data._id] || ''}
                          onChange={(e) => setIsPayment({ ...isPayment, [data._id]: Number(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <Button
                          onClick={() => handleAccept(data?._id,data?.userId)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="mr-2 h-4 w-4" /> Accept
                        </Button>
                        <Button
                          onClick={() => handleCancel(data?._id)}
                          variant="destructive"
                        >
                          <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No work requests available.</div>
          )}
        </CardContent>
      </Card>
      <Button
        onClick={() => router.back()}
        className="mt-8"
        variant="outline"
      >
        Back
      </Button>
      <Toaster richColors position="top-center" />
      </>

  )
}