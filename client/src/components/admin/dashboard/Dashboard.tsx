"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Tooltip } from "recharts"
import { DollarSign, Star, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Mock data (expanded)
const workerDistribution = [
  { trade: "Carpenter", count: 50 },
  { trade: "Painter", count: 40 },
  { trade: "Electrician", count: 60 },
  { trade: "Tilework", count: 30 },
  { trade: "Construction", count: 45 },
  { trade: "Centring", count: 25 },
  { trade: "Fabrication", count: 35 },
  { trade: "Mechanical", count: 55 },
]

const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 10000 },
  { month: "Apr", revenue: 20000, expenses: 11000 },
  { month: "May", revenue: 22000, expenses: 12000 },
  { month: "Jun", revenue: 25000, expenses: 13000 },
]

const recentReviews = [
  { id: 1, user: "John Doe", worker: "Alice Smith", rating: 4.5, comment: "Great work, very professional!" },
  { id: 2, user: "Jane Smith", worker: "Bob Johnson", rating: 5, comment: "Excellent service, highly recommended!" },
  { id: 3, user: "Mike Brown", worker: "Charlie Davis", rating: 4, comment: "Good job, but could improve timeliness." },
  { id: 4, user: "Emily Wilson", worker: "David Lee", rating: 4.8, comment: "Very satisfied with the work done." },
  { id: 5, user: "Sarah Johnson", worker: "Eva Martinez", rating: 3.5, comment: "Decent work, but took longer than expected." },
]

const topWorkers = [
  { id: 1, name: "Alice Smith", trade: "Electrician", rating: 4.9, jobs: 120, earnings: 15000 },
  { id: 2, name: "Bob Johnson", trade: "Carpenter", rating: 4.8, jobs: 110, earnings: 13500 },
  { id: 3, name: "Charlie Davis", trade: "Painter", rating: 4.7, jobs: 105, earnings: 12800 },
  { id: 4, name: "David Lee", trade: "Plumber", rating: 4.6, jobs: 95, earnings: 11500 },
  { id: 5, name: "Eva Martinez", trade: "Tiler", rating: 4.5, jobs: 90, earnings: 11000 },
]

const jobStatusData = [
  { name: "Completed", value: 300 },
  { name: "In Progress", value: 150 },
  { name: "Pending", value: 100 },
  { name: "Cancelled", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function EnhancedAdminDashboard() {
  const [totalRevenue] = useState(132000)
  const [totalReviews] = useState(1250)
  const [totalJobs] = useState(570)
  const [averageRating] = useState(4.7)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Enhanced Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly comparison for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Job Status</CardTitle>
                <CardDescription>Current status of all jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    status: {
                      label: "Job Status",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jobStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {jobStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {jobStatusData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="flex-1">{entry.name}</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Worker Distribution</CardTitle>
              <CardDescription>Number of workers in each trade</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Worker Count",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workerDistribution}>
                    <XAxis dataKey="trade" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Jobs Completed</TableHead>
                    <TableHead>Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topWorkers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell className="font-medium">{worker.name}</TableCell>
                      <TableCell>{worker.trade}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{worker.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{worker.jobs}</TableCell>
                      <TableCell>${worker.earnings.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Completion Rate</CardTitle>
              <CardDescription>Percentage of jobs completed on time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Progress value={85} className="h-2" />
                </div>
                <div className="ml-4 font-medium">85%</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                85% of jobs were completed on time in the last 30 days.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Electrical repair job completed by Alice Smith</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">Painting job in progress by Bob Johnson</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Plumbing job pending assignment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="flex items-center space-x-4">
                    
                    <Avatar>
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{review.user}</p>
                      <p className="text-sm text-muted-foreground">Worker: {review.worker}</p>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}