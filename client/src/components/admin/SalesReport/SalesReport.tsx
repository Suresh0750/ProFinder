// "use client"

// import { useState ,useEffect,useCallback} from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CalendarDays, FileSpreadsheet, FileText } from "lucide-react"
// import { format } from "date-fns"



// // * types
// import {salesReport} from '@/types/AdminTypes'

// interface Booking {
//   id: string;
//   username: string;
//   date: string;
//   workerName: string;
//   amount: number;
//   status: 'completed' | 'pending' | 'cancelled';
//   category: string;
// }



// const categories = ["All", "Plumbing", "Electrical", "Carpentry", "Painting"]

//  const SalesReport: React.FC = () => {

//   const [usernameFilter, setUsernameFilter] = useState<string | null>("")
//   const [workerNameFilter, setWorkerNameFilter] = useState<string | null>("")
//   const [categoryFilter, setCategoryFilter] = useState<string | null>("")
//   const [dateFilter, setDateFilter] = useState<Date | null>("")
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [itemsPerPage] = useState<number>(10)
//   const [stopAPI,setStopAPI] = useState(true)
//   const [totalDatas,setTotalDatas] = useState<salesReport[]>([])    
//   const [filterSales,setFilterSales] = useState<salesReport[]>([])
//   const [categoryList,setCategoryList] = useState<string[]>(["All"])

//   const [stopCategoryAPI,setStopCategoryAPI] = useState<boolean>(true)

//   const {data} = useSalesReportQuery({usernameFilter,workerNameFilter,categoryFilter,dateFilter},{skip:stopAPI})
//   const {data:category} = useCategoryListQuery({},{skip:stopCategoryAPI})

//     useEffect(()=>{
//         setStopAPI(false)
//         console.log(JSON.stringify(data))
//         if(data?.result){
//             setFilterSales(data?.result?.salesDatas)
//             setTotalDatas(data?.result?.salesDatas)
//             setStopAPI(true)
//         }
//         // setStopAPI(true)
//     },[data])

//     useEffect(()=>{
//         setStopCategoryAPI(false)
//         if(category?.result){
//             setCategoryList(["All", ...category?.result]);
//             setStopCategoryAPI(false)
//         }
//         // setStopCategoryAPI(true)
//     },[category])

//     const getSalesData = ()=>{
//         setStopAPI(false)
//     }
  
//   const applyFilters = () => {
//     let filtered = [...totalDatas];
//     let filter ;
//     if (usernameFilter) {
//         console.log('k',usernameFilter)
//         console.log(JSON.stringify(filtered))
//         console.log(JSON.stringify( filtered.filter(booking => ((booking?.user)?.toLowerCase())?.includes((usernameFilter)?.toLowerCase()))))
//       filtered = filtered.filter(booking => ((booking?.user)?.toLowerCase())?.includes((usernameFilter)?.toLowerCase()))
     
//     }
//     if (workerNameFilter) {
//         console.log('worker')
//       filtered = filtered.filter(booking => booking?.worker.toLowerCase().includes(workerNameFilter.toLowerCase()))
//     }
//     if (categoryFilter !== "All") {
//       filtered = filtered.filter(booking => booking?.service === categoryFilter)
//     }
//     if (dateFilter) {
//       filtered = filtered.filter(booking => booking?.preferredDate === format(dateFilter, "yyyy-MM-dd"))
//     }
//     console.log("filtered")
//     console.log(filtered)
//     setFilterSales(filtered)
//     setCurrentPage(1)
//   }

//   const resetFilters = () => {
//     setUsernameFilter("")
//     setWorkerNameFilter("")
//     setCategoryFilter("All")
//     setDateFilter(null)
//     setCurrentPage(1)
//   }

//   const downloadPDF = () => {
//     // Implement PDF download logic here
//     console.log("Downloading PDF...")
//   }

//   const downloadExcel = () => {
//     // Implement Excel download logic here
//     console.log("Downloading Excel...")
//   }

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const totalPages = data?.result?.count || 0

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                 <SelectTrigger id="category">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>{category}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Start Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className="w-full justify-start text-left font-normal">
//                     <CalendarDays className="mr-2 h-4 w-4" />
//                     {startDateFilter ? format(startDateFilter, "PPP") : "Pick a start date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={startDateFilter}
//                     onSelect={(date: Date | undefined) => setStartDateFilter(date ?? null)}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div className="space-y-2">
//               <Label>End Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className="w-full justify-start text-left font-normal">
//                     <CalendarDays className="mr-2 h-4 w-4" />
//                     {endDateFilter ? format(endDateFilter, "PPP") : "Pick an end date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={endDateFilter}
//                     onSelect={(date: Date | undefined) => setEndDateFilter(date ?? null)}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-2 mt-4">
//             <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
//             <Button onClick={applyFilters}>Apply Filters</Button>
//           </div>
//         </CardContent>
//       </Card>


//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Booking Information</CardTitle>
//           <div className="space-x-2">
//             <Button onClick={downloadPDF} variant="outline">
//               <FileText className="mr-2 h-4 w-4" />
//               Download PDF
//             </Button>
//             <Button onClick={downloadExcel} variant="outline">
//               <FileSpreadsheet className="mr-2 h-4 w-4" />
//               Download Excel
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Username</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Worker Name</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Category</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filterSales?.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell>{booking._id}</TableCell>
//                   <TableCell>{booking.user}</TableCell>
//                   <TableCell>{booking.preferredDate}</TableCell>
//                   <TableCell>{booking.worker}</TableCell>
//                   <TableCell>${booking.payment}</TableCell>
//                   <TableCell>
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       booking.isAccept === 'Completed' ? 'bg-green-100 text-green-800' :
//                       booking.isAccept === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {booking.isAccept}
//                     </span>
//                   </TableCell>
//                   <TableCell>{booking.service}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
          
//           {/* Pagination */}
//           <div className="flex items-center justify-between space-x-2 py-4">
//             <div className="flex-1 text-sm text-muted-foreground">
            
//             </div>
//             <div className="space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => paginate(1)}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronsLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1)
//                 .filter(number => Math.abs(currentPage - number) <= 2 || number === 1 || number === totalPages)
//                 .map((number) => (
//                   <Button
//                     key={number}
//                     variant={currentPage === number ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => paginate(number)}
//                   >
//                     {number}
//                   </Button>
//                 ))}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => paginate(totalPages)}
//                 disabled={currentPage === totalPages}
//               >
//                 <ChevronsRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   )
// }

// export default SalesReport
"use client"

import { useState,useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CalendarDays, FileSpreadsheet, FileText } from "lucide-react"
import { format, isWithinInterval } from "date-fns"

// * API CALL

import {useSalesReportQuery,useCategoryListQuery} from '@/lib/features/api/adminApiSlice'




interface Booking {
  id: string;
  username: string;
  date: string;
  workerName: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  category: string;
}

// Mock data for bookings (expanded for pagination example)
const allBookings: Booking[] = Array(100).fill(null).map((_, index) => ({
  id: `B${String(index + 1).padStart(3, '0')}`,
  username: `user${index + 1}`,
  date: format(new Date(2023, 6, index + 1), "yyyy-MM-dd"),
  workerName: `Worker ${index + 1}`,
  amount: Math.floor(Math.random() * 300) + 100,
  status: ['completed', 'pending', 'cancelled'][Math.floor(Math.random() * 3)] as 'completed' | 'pending' | 'cancelled',
  category: ['Plumbing', 'Electrical', 'Carpentry', 'Painting'][Math.floor(Math.random() * 4)]
}))

const categories = ["All", "Plumbing", "Electrical", "Carpentry", "Painting"]

export default function SalesReport() {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(allBookings)
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null)
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(10)
  const [categoryList,setCategoryList] = useState<string[]>(["All"])
  const [stopCategoryAPI,setStopCategoryAPI] = useState<boolean>(true)
  const [stopAPI,setStopAPI] = useState(true)

  const {data:category} = useCategoryListQuery({},{skip:stopCategoryAPI})
  const {data} = useSalesReportQuery({categoryFilter,startDateFilter,endDateFilter},{skip:stopAPI})
    useEffect(()=>{
        setStopCategoryAPI(false)
        if(category?.result){
            setCategoryList(["All", ...category?.result]);
            setStopCategoryAPI(false)
        }
    },[category])

  const applyFilters = () => {
    let filtered = allBookings
    if (categoryFilter !== "All") {
      filtered = filtered.filter(booking => booking.category === categoryFilter)
    }
    if (startDateFilter && endDateFilter) {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.date)
        return isWithinInterval(bookingDate, { start: startDateFilter, end: endDateFilter })
      })
    }
    setFilteredBookings(filtered)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setCategoryFilter("All")
    setStartDateFilter(null)
    setEndDateFilter(null)
    setFilteredBookings(allBookings)
    setCurrentPage(1)
  }

  const downloadPDF = () => {
    console.log("Downloading PDF...")
  }

  const downloadExcel = () => {
    console.log("Downloading Excel...")
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryList} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryList?.length>0 && categoryList?.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {startDateFilter ? format(startDateFilter, "PPP") : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDateFilter}
                    onSelect={(date: Date | undefined) => setStartDateFilter(date ?? null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {endDateFilter ? format(endDateFilter, "PPP") : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDateFilter}
                    onSelect={(date: Date | undefined) => setEndDateFilter(date ?? null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Booking Information</CardTitle>
          <div className="space-x-2">
            <Button onClick={downloadPDF} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={downloadExcel} variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Download Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Worker Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.username}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.workerName}</TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>{booking.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} entries
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(number => Math.abs(currentPage - number) <= 2 || number === 1 || number === totalPages)
                .map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}