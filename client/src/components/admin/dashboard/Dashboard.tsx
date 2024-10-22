"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Star, Users, TrendingUp } from "lucide-react"
import {useState,useEffect} from 'react'
import {useRouter} from 'next/navigation'
 
// API 
import {useDashboardQuery} from '@/lib/features/api/adminApiSlice'

const dashboard = ()=>{

  const [dashboard,setDashboard] = useState({})
  const { data, error } = useDashboardQuery({});
  const router = useRouter();
  
  useEffect(() => {
      console.log('main dashboard');
      console.log(JSON.stringify(data?.result));
      // console.log(error);
      if(data?.result){
        setDashboard(data?.result)
      }
      if (error && error.status === 401) {
          router.push(`/admin/login`);
      }
  }, [data, error]); 
  
  return(
    <>
     <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${dashboard?.totalRevenue?.length && dashboard?.totalRevenue[0]?.payment || 0}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboard?.totalReview || 0}</div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total wokers</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboard?.totalWorkers || 0}</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboard?.totalRevenue?.length && (dashboard?.avgRating[0]?.sum / dashboard?.avgRating[0]?.count ).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+0.2 from last month</p>
        </CardContent>
      </Card>
    </>
  )
}

export default dashboard