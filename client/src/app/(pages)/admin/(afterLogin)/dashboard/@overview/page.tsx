"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Tooltip } from "recharts"

// Mock data (you would fetch this from an API in a real application)
const revenueData = [
  { month: "Jan", revenue: 12000,},
  { month: "Feb", revenue: 15000, },
  { month: "Mar", revenue: 18000,},
  { month: "Apr", revenue: 20000,  },
  { month: "May", revenue: 22000, },  
  { month: "Jun", revenue: 25000,  },
]

const jobStatusData = [
  { name: "Completed", value: 300 },
  { name: "In Progress", value: 150 },  
  { name: "Pending", value: 100 },
  { name: "Cancelled", value: 20 },
]

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function OverviewPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-3">
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
    </>
  )
}