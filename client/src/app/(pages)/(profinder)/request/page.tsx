'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useRequestToWorkerMutation } from '@/lib/features/api/customerApiSlice'
import { toast, Toaster } from 'sonner'
import { useLoadScript, Autocomplete, GoogleMap, Marker } from "@react-google-maps/api"
import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface WorkerDetails {
  _id: string
  Category: string
  FirstName: string
}

interface FormData {
  workerId: string
  service: string
  worker: string
  user: string
  preferredDate: string
  preferredTime: string
  servicelocation: string
  additionalNotes: string
}

interface ValidationErrors {
  preferredDate?: string
  preferredTime?: string
  servicelocation?: string
  additionalNotes?: string
}

const libraries: ("places")[] = ['places']

export default function WorkerRequestPage() {
  const router = useRouter()
  const workerDetails: WorkerDetails = JSON.parse(localStorage.getItem('workerDetails') || '{}')
  const [formData, setFormData] = useState<FormData>({
    workerId: workerDetails?._id || '',
    service: workerDetails?.Category || '',
    worker: workerDetails?.FirstName || '',
    user: '',
    preferredDate: '',
    preferredTime: '',
    servicelocation: '',
    additionalNotes: '',
  })

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [requestToWorker, { isLoading }] = useRequestToWorkerMutation()
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null)

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API as string,
    libraries,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // setMapCenter({ lat: latitude, lng: longitude })
          // setMarkerPosition({ lat: latitude, lng: longitude })
          setMapCenter({ lat: 11.0128646, lng: 76.9654417 })
          setMarkerPosition({ lat: 11.0128646, lng: 76.9654417 })
        },
        (error) => {
          console.error("Error getting user's location:", error)
          toast.error("Unable to get your location. Please enter it manually.")
        }
      )
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setValidationErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!formData.preferredDate) {
      errors.preferredDate = "Preferred date is required."
    } else if (new Date(formData.preferredDate) < today) {
      errors.preferredDate = "Preferred date cannot be in the past."
    }
    
    if (!formData.preferredTime) {
      errors.preferredTime = "Preferred time is required."
    } else {
      const [hours, minutes] = formData.preferredTime.split(':').map(Number)
      if (hours < 8 || hours > 20 || (hours === 20 && minutes > 0)) {
        errors.preferredTime = "Preferred time must be between 8:00 AM and 8:00 PM."
      }
    }
    
    if (!formData.servicelocation) {
      errors.servicelocation = "Service location is required."
    }
    if (!formData.additionalNotes) {
      errors.additionalNotes = "additionalNotes is required."
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    const customerData = JSON.parse(localStorage.getItem("customerData") || '{"_id":null, "customerName":""}')
    
    try {
      const result = await requestToWorker({
        ...formData,
        user: customerData.customerName,
        userId: customerData._id,
        service: workerDetails?.Category,
        worker: workerDetails?.FirstName,
        workerId: workerDetails?._id
      }).unwrap()

      if (result?.success) {
        toast.success(result?.message)
        router.push(`/worker_details/${workerDetails?._id}`)
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err?.data?.errorMessage || 'An error occurred while submitting the request.')
    }
  }

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete
  }, [])

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (place.geometry && place.geometry.location) {
        setFormData((prev) => ({ ...prev, servicelocation: place.formatted_address || '' }))
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        setMapCenter(newPosition)
        setMarkerPosition(newPosition)
      }
    }
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-[4em]">
      <Card>
        <CardHeader>
          <CardTitle>Service Request for {workerDetails?.FirstName}</CardTitle>
          <CardDescription>Please fill out the details for your service request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="worker">Worker</Label>
                <Input
                  id="worker"
                  name="worker"
                  value={formData.worker}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                {validationErrors.preferredDate && (
                  <p className="text-sm text-red-500">{validationErrors.preferredDate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  min="08:00"
                  max="20:00"
                  required
                />
                {validationErrors.preferredTime && (
                  <p className="text-sm text-red-500">{validationErrors.preferredTime}</p>
                )}
               
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicelocation">Service Location</Label>
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <Input
                  id="servicelocation"
                  name="servicelocation"
                  value={formData.servicelocation}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </Autocomplete>
              {validationErrors.servicelocation && (
                <p className="text-sm text-red-500">{validationErrors.servicelocation}</p>
              )}
            </div>
            <div className="h-64 w-full rounded-md overflow-hidden">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={14}
                onLoad={(map) => (mapRef.current = map)}
              >
                {markerPosition && (
                  <Marker
                    position={markerPosition}
                    icon={{
                      path: MapPin,
                      fillColor: '#ef4444',
                      fillOpacity: 1,
                      strokeWeight: 0,
                      scale: 1.5,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any special instructions or requirements?"
              />
               {validationErrors.additionalNotes && (
                  <p className="text-sm text-red-500">{validationErrors.additionalNotes}</p>
                )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </Card>
      <Toaster richColors position="top-center" />
    </div>
  )
}