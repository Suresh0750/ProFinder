'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useGetSingleWorkerDetailsQuery } from '@/lib/features/api/workerApiSlice'
import { useSubmitReviewMutation, useGetReviewQuery } from '@/lib/features/api/customerApiSlice'
import { useConversationMutation } from '@/lib/features/api/userApiSlice'
import defaultImage from '../../../../../../public/images/worker/defaultImage.png'
import ServiceRequestModal from '@/components/serviceModal'
import ReviewModal from '@/components/ReviewModal'
import PayUComponent from '@/components/PayU'
import MaterialCarousel from '@/components/wokerDetailscarousel'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon, MessageCircleIcon, MessageSquare, MapPinIcon, BriefcaseIcon, CalendarIcon, DollarSignIcon, Check } from 'lucide-react'

const WorkerDetailsPage = ({ params }: { params: { workerId: string } }) => {
  const [workerDetails, setWorkerDetails] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewDetails, setReviewDetails] = useState([])
  const [customerRating, setCustomerRating] = useState(0)
  const [customerData, setCustomerData] = useState<any>(null)

  const router = useRouter()

  const { data, refetch, isLoading: isWorkerDetailsLoading } = useGetSingleWorkerDetailsQuery(
    customerData ? `${params.workerId}/${customerData._id}` : 'skip',
    { skip: !customerData }
  )
  const [conversation] = useConversationMutation()
  const [submitReview] = useSubmitReviewMutation()
  const { data: reviewData, refetch: fetchReview, isLoading: isReviewLoading } = useGetReviewQuery(params.workerId)

  useEffect(() => {
    const storedCustomerData = typeof window !== 'undefined' ? localStorage.getItem("customerData") : null
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData))
    }
  }, [])

  useEffect(() => {
    if (data?.result) {
      setWorkerDetails(data.result)
    }
  }, [data])

  useEffect(() => {
    if (reviewData?.result) {
      setReviewDetails(reviewData.result)
    }
  }, [reviewData])

  useEffect(() => {
    if (reviewDetails.length > 0) {
      const totalRating = reviewDetails.reduce((acc: number, curr: any) => acc + (curr?.rating || 0), 0)
      setCustomerRating(totalRating / reviewDetails.length)
    }
  }, [reviewDetails])

  const handleMessage = async () => {
    if (customerData && workerDetails) {
      try {
        const result = await conversation({
          userId: customerData._id,
          lastMessage: '',
          workerId: workerDetails._id,
          newMessage: true
        })
        if (result?.data?.success) {
          router.push('/user/message')
        }
      } catch (error) {
        console.error('Error starting conversation:', error)
      }
    }
  }

  const handleSubmitReview = async (reviewData: { rating: number, comment: string }) => {
    try {
      await submitReview({
        workerId: params.workerId,
        userId: customerData._id,
        ...reviewData
      })
      fetchReview()
      setIsReviewModalOpen(false)
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const renderRequestButton = () => {
    if (!data?.requestData?.isAccept) {
      const workerDetailsToStore = {
        _id: workerDetails?._id,
        Category: workerDetails?.Category,
        FirstName: workerDetails?.FirstName
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("workerDetails", JSON.stringify(workerDetailsToStore))
      }
      return (
        <>
        <Link href="/request">
          <Button className="w-full sm:w-auto">
            <MessageCircleIcon className="w-4 h-4 mr-2" />
            Send Request
          </Button>
        </Link>
         <MessageSquare onClick={handleMessage} className="cursor-pointer" />
        </>
      )
    }

    const isAccept = data.requestData?.isAccept


    console.log('IsAccept',isAccept)
    console.log(data?.requestData)
    switch (isAccept) {
      case "Accepted":
        return (
          <>
            <Badge variant="success">Accepted</Badge>
            <MessageSquare onClick={handleMessage} className="cursor-pointer" />
          </>
        )
      case "Pending":
        return <Badge variant="warning">Pending</Badge>
      case "Completed":
        return <Badge variant="success">Completed</Badge>
      default:
        return <>
            <Badge variant="destructive">Cancelled</Badge>
            <Link href="/request">
            <Button className="w-full sm:w-auto">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Send Request
            </Button>
          </Link>
        </> 
       
    }
  }

  if (isWorkerDetailsLoading || isReviewLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!workerDetails) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[75px]">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">Worker details not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[75px]">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={workerDetails?.Profile || defaultImage} alt={workerDetails?.FirstName} />
              <AvatarFallback>{workerDetails?.FirstName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2">{workerDetails?.FirstName}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{workerDetails?.City}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(customerRating || 0) ? 'fill-yellow-400' : 'fill-gray-300'}`} />
                ))}
                <span className="ml-2 text-sm text-gray-600">({reviewDetails?.length || 0} reviews)</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">  
                {/* {renderRequestButton()}
                {data?.requestData?.paymentId ? (
                  <>
                    <Check className="text-green-500" />
                    Payment successfully completed
                  </>
                ) : (
                  data?.requestData?._doc?.isAccept === "Accepted" ? (
                    <PayUComponent
                      currUserData={customerData}
                      requestId={data?.requestData?._doc?._id}
                      payment={data?.requestData?._doc?.payment || '500'}
                    />
                  ) : null
                )} */}
                <Link href="/request">
                  <Button className="w-full sm:w-auto">
                    <MessageCircleIcon className="w-4 h-4 mr-2" />
                    Send Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="work">Our Work</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Services:</p>
                      <p>{workerDetails.Category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Experience:</p>
                      <p>5 years</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Rate:</p>
                      <p>${data?.requestData?.payment || 'N/A'} per hour</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">Availability:</p>
                      <p>Monday - Friday: 9 AM - 5 PM</p>
                      <p>Saturday: 10 AM - 2 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="work">
          <Card>
            <CardContent className="p-6">
              {workerDetails?.WorkerImage && workerDetails?.WorkerImage?.length > 0 ? (
                <MaterialCarousel images={workerDetails.WorkerImage} />
              ) : (
                <p className="text-center text-gray-500">No work samples available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="success" className="text-lg p-2">{customerRating > 0 ? customerRating.toFixed(1) : 'N/A'}</Badge>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-6 h-6 ${i < Math.round(customerRating || 0) ? 'fill-yellow-400' : 'fill-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({reviewDetails?.length || 0} reviews)</span>
              </div>

              <Button variant="outline" className="mb-6" onClick={() => setIsReviewModalOpen(true)}>
                Write a Review
              </Button>

              <div className="space-y-6">
                {reviewDetails?.length > 0 ? reviewDetails.map((review: any) => (
                  <div key={review._id} className="border-t pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review?.userId?.profile || defaultImage} alt={review?.userId?.username} />
                          <AvatarFallback>{review?.userId?.username?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review?.userId?.username}</p>
                          <div className="flex items-center">
                            <Badge variant="success" className="mr-2">{review?.rating?.toFixed(1)}</Badge>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`w-4 h-4 ${i < review?.rating ? 'fill-yellow-400' : 'fill-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{new Date(review?.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600">{review?.comment}</p>
                  </div>
                )) : (
                  <p className="text-center text-gray-500">No reviews available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ServiceRequestModal
        workerDetails={workerDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  )
}

export default WorkerDetailsPage