"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Clipboard,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  useBookingQuery,
  usePaymentIdQuery,
} from "@/lib/features/api/userApiSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayUComponent from "@/components/PayU";

interface Work {
  _id: string;
  service: string;
  worker: string;
  user: string;
  preferredDate: string;
  preferredTime: string;
  servicelocation: string;
  AdditionalNotes: string;
  userId: string;
  workerId: string;
  isAccept: string;
  payment: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function BookingPage() {
  const customerData = JSON.parse(localStorage.getItem("customerData") || "{}");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [skip, setSkip] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("Pending");
  const [skipPaymentAPI, setSkipPaymentAPI] = useState<boolean>(true);
  const [paymentId, setPaymentId] = useState<string>("");
  console.log('selectedWork',selectedWork)
  const {
    data: requestData,
    isLoading,
    error,
    refetch,
  } = useBookingQuery(customerData?._id, {
    skip: skip,
  });
  const { data: paymentIdData } = usePaymentIdQuery(selectedWork?._id || "", {
    skip: skipPaymentAPI,
  });

  // alert(JSON.stringify(paymentIdData))
  console.log("paymentId", paymentIdData);

  const handleFilter = (status: string) => {
    setFilter(status);
  };

  const handleWorkSelect = (work: Work) => {
    alert(work?._id);
    setSelectedWork(work);
  };
  useEffect(() => {
    if (selectedWork?._id) {
      setSkipPaymentAPI(false);
    }
  }, [selectedWork]);
  useEffect(() => {
    if (paymentIdData?.result) {
      setPaymentId(paymentIdData?.result?.paymentId);
      console.log("paymentId", paymentIdData?.result?.paymentId);
    } else {
      setPaymentId("");
    }
    setSkipPaymentAPI(false);
  }, [paymentIdData]);

  useEffect(() => {
    setSkip(false);
  }, []);

  useEffect(() => {
    if (requestData?.result && requestData.result.length > 0) {
      setSelectedWork(requestData.result);
      console.log(JSON.stringify(requestData));
    }
  }, [requestData]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "accepted":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredWorks =
    requestData?.result?.filter(
      (work: Work) => work.isAccept.toLowerCase() === filter.toLowerCase()
    ) || [];

  return (
    <>
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Work List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Pending">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="Pending"
                onClick={() => handleFilter("Pending")}
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="Cancelled"
                onClick={() => handleFilter("Cancelled")}
              >
                Cancelled
              </TabsTrigger>
              <TabsTrigger
                value="Accepted"
                onClick={() => handleFilter("Accepted")}
              >
                Accepted
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                onClick={() => handleFilter("Completed")}
              >
                Completed
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-2">
              <TabsContent value={filter}>
                {filteredWorks.map((work: Work) => (
                  <Card
                    key={work._id}
                    className={`mb-2 cursor-pointer transition-all ${
                      selectedWork?._id === work._id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleWorkSelect(work)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{work.user}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {format(parseISO(work.preferredDate), "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {work.preferredTime}
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Work Details</CardTitle>
          <CardDescription>Information about the selected work</CardDescription>
        </CardHeader>
        <Card className="w-full max-w-2xl mx-auto">
          {selectedWork && selectedWork?.service && (
            <>  
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">
                    {selectedWork?.service} Booking
                  </CardTitle>
                  <Badge
                    className={`${getStatusColor(
                      selectedWork?.isAccept || "pending"
                    )} text-white`}
                  >
                    {selectedWork?.isAccept}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Customer:</span>{" "}
                  {selectedWork?.user}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedWork?.preferredDate}
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Time:</span>{" "}
                  {selectedWork?.preferredTime}
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedWork?.servicelocation}
                </div>
                <div className="flex items-start space-x-2">
                  <Clipboard className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <span className="font-semibold">Additional Notes:</span>
                    <p className="mt-1 text-gray-600">
                      {selectedWork?.AdditionalNotes}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Payment :</span>
                  {/* <Badge variant={selectedWork?.payment > 0 ? "default" : "destructive"}> */}
                  <Badge variant={"default"}>
                    <h2>{selectedWork?.payment}</h2>
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  {
                    paymentId ? <CheckCircle size={25} className="text-green-500" aria-hidden="true" /> : <XCircle size={25} className="text-red-500" aria-hidden="true"/>
                  }
                 
                  <span className="font-semibold">Payment Status:</span>
                  <Badge variant={paymentId ? "default" : "destructive"}>
                    {paymentId ? "Paid" : "Unpaid"}
                  </Badge>
                  {(selectedWork?.isAccept=="Pending") ?
                    ""
                   :  (!paymentId)? 
                    <>
                      <PayUComponent
                        currUserData={customerData}
                        requestId={selectedWork?._id}
                        payment={String(selectedWork?.payment) || "500"}
                      />
                    </> : ''
                  }
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </Card>
      <Toaster richColors position="top-center" />
    </>
  );
}
// isAccept