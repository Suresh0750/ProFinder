"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, ArrowRight, Calendar, DollarSign, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EnhancedPaymentSuccessPage({params}:{params:{id:string}}) {
  const [isExpanded, setIsExpanded] = useState(false)

  console.log('params id')
  console.log(params?.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4 mt-[4em]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl overflow-hidden">
          <CardHeader className="bg-green-500 text-white text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-20 h-20 bg-white rounded-full flex items-center justify-center"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
            <CardTitle className="text-3xl font-bold mb-2">Payment Successful!</CardTitle>
            <p className="text-green-100">Your booking has been confirmed</p>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">Booking Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-blue-600">
                    {/* <Tool className="mr-3 h-5 w-5" /> */}
                    <div>
                      <p className="font-medium">Service</p>
                      <p className="text-sm">Plumbing Repair</p>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Calendar className="mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm">July 15, 2023 at 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <DollarSign className="mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">Total Paid</p>
                      <p className="text-sm">$150.00</p>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">123 Main St, Anytown, USA</p>
                    </div>
                  </div>
                </div>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="next-steps">
                  <AccordionTrigger>What's Next?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>You'll receive a confirmation email with all the details.</li>
                      <li>The assigned worker will contact you before the appointment.</li>
                      <li>Prepare the work area for easy access.</li>
                      <li>Have any relevant documents or information ready.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-4 px-6 py-6 bg-gray-50">
            <Button asChild variant="outline">
              <Link href="/dashboard" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                View Booking Details
              </Link>
            </Button>
            <Button asChild>
              <Link href="/" className="flex items-center">
                Return to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}