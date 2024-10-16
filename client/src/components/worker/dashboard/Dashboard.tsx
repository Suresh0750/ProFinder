"use client"
import { DashboardHeader, ViewRequest } from "@/components/worker/dashboard/wokerDashboard"
import { 
  DollarSign, 
  CheckCircle, 
  Calendar, 
  Star, 
  CreditCard, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDashboardQuery } from "@/lib/features/api/workerApiSlice"
import {useEffect,useState} from 'react'
import Link from 'next/link'

 const Dashboard = ()=>{
  const [dashboardDetails,setDashboardDetails] = useState([])
    const customerData = JSON.parse(localStorage.getItem('customerData') || '{}')
    const {data} = useDashboardQuery(customerData?._id)

    useEffect(()=>{
      setDashboardDetails(data?.result)
      console.log(JSON.stringify(data?.result)) 
    },[data])

    return(
        <>
        <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />

      {
        dashboardDetails?.length>1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardDetails[1]?.ResentActivity[0]?.totalPayment}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardDetails[1]?.ResentActivity[0]?.countIsCompleteTrue}</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>
          <ViewRequest />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              
              <CardTitle className="text-sm font-medium">Upcoming Services</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardDetails[1]?.ResentActivity[0]?.countIsCompleteFalse}</div>
              <Link href={'/worker/dashboard/upcoming-works'}>
                <Button className="mt-4 w-full" variant="outline">
                  View Schedule <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardDetails[1]?.ResentActivity[0]?.pendingPayment}</div>
              <p className="text-xs text-muted-foreground">From {dashboardDetails[1]?.ResentActivity[0]?.pendingCustomer} customers</p>
            </CardContent>
          </Card>
        </div>
        )
      }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
             
                {
                  dashboardDetails?.length>0 && (
                    dashboardDetails[1]?.getRecentActivity?.map((act:any)=>{
                      // console.log(data?.requestId?.user)
                      // console.log(data?.isCompleted)
                    return  <div className="flex items-center">
                        <div className="mr-2 rounded-full p-1 bg-yellow-100">
                          <AlertCircle className="h-3 w-3 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          {/* <p className="text-sm font-medium">Electrical Repair</p> */}
                          <p className="text-xs text-muted-foreground">Customer: {act?.requestId?.user}</p>
                        </div>
                        {
                          (act?.isCompleted )? (<span className="text-xs text-yellow-600 font-medium">Pending</span>) :
                          <span className="text-xs text-green-600 font-medium">Completed</span>
                        }
                      </div>
                  })
                  )
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Your acceptance rate is higher than 80% of workers in your area.</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium">Your average rating has improved by 0.2 stars in the last month.</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm font-medium">You have 2 pending reviews. Responding quickly can improve your rating.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
        </>
    )
}


export default Dashboard