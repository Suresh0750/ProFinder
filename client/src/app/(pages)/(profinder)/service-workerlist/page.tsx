"use client"

import React, { useState, useEffect } from "react"
import { AiTwotoneEnvironment } from "react-icons/ai"
import { MdSearch } from "react-icons/md"
import Image from "next/image"
import { Pagination } from "@mui/material"
import Footer from "@/components/Footer"
import {
  useGetCategoryNameQuery,
  useListWorkerDataAPIQuery,
} from "@/lib/features/api/customerApiSlice"
import { WorkerDatails } from "@/types/workerTypes"
import { useRouter } from "next/navigation"
import { useLoadScript, Autocomplete } from "@react-google-maps/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Checkbox from '@/components/ui/checkbox'
import { Label } from "@/components/ui/label"

const libraries = ["places"]

export default function ServiceWorkerListPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCategory, setShowCategory] = useState<WorkerDatails[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [allCategory, setAllCategory] = useState<WorkerDatails[]>([])
  const [categoryName, setCategoryName] = useState<string[]>([])
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  const Router = useRouter()
  const { data } = useListWorkerDataAPIQuery("")
  const { data: GetCategoryName } = useGetCategoryNameQuery("")

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  })

  const total = 8

  const handleFilterCategory = (categoryName: string) => {
    if (categoryName === "All") {
      setShowCategory(allCategory)
      setFilterCategory("All")
    } else {
      let filterCategory = allCategory.filter((val) => val?.Category === categoryName)
      setShowCategory(filterCategory)
      setFilterCategory(categoryName)
    }
  }

  const handleRedirectWorkerPage = (_id: string) => {
    Router.push(`/worker_details/${_id}`)
  }

  useEffect(() => {
    setCategoryName(GetCategoryName?.result)
  }, [GetCategoryName])

  useEffect(() => {
    setAllCategory(data?.result)
    setShowCategory(data?.result)
  }, [data])

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    let { value } = event.target
    let result
    if (filterCategory === "All") {
      result = allCategory.filter((val) =>
        val?.FirstName.toLowerCase().includes(value.toLowerCase())
      )
      setShowCategory(result)
    } else {
      result = allCategory.filter(
        (val) =>
          val?.Category === filterCategory && val?.FirstName.toLowerCase().includes(value.toLowerCase())
      )
      setShowCategory(result)
    }
  }

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      setSearchTerm(place.formatted_address || "")
      // You can use place.geometry.location.lat() and place.geometry.location.lng() for coordinates
    }
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        <aside className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["All", ...(categoryName || [])].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filterCategory === category}
                      onCheckedChange={() => handleFilterCategory(category)}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
        <main className="w-full md:w-3/4">
          <Card className="mb-6">
            <CardContent className="p-4">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className="flex items-center space-x-2">
                  <MdSearch className="text-gray-600" />
                  <Input
                    type="search"
                    placeholder="Search by location"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow"
                  />
                </div>
              </Autocomplete>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showCategory &&
              showCategory.slice((page - 1) * total, page * total).map((val, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => handleRedirectWorkerPage(val?._id || '')}>
                  <CardContent className="p-0">
                    <img
                      src={val?.Profile || "/placeholder.png"}
                      width={500}
                      height={256}
                      alt={val?.FirstName || "Worker"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-900">{val?.FirstName}</h2>
                      <p className="text-sm text-gray-600">Reviews</p>
                      <div className="flex items-center text-gray-500 mt-2">
                        <AiTwotoneEnvironment className="mr-1" />
                        <span>{val?.StreetAddress}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    <Button variant="secondary">{val?.Category}</Button>
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              count={Math.ceil((showCategory?.length || 0) / total)}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
            />
          </div>
        </main>
      </div>
    </div>
  )
}