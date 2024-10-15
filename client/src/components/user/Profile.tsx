'use client'

import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  occupation: string
  joinDate: string
  bio: string
  avatarUrl: string
}

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    occupation: 'Software Engineer',
    joinDate: 'January 2020',
    bio: 'Passionate about creating intuitive and efficient web applications. Always eager to learn new technologies and solve complex problems.',
    avatarUrl: '/placeholder.svg?height=100&width=100'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', userProfile)
    setIsEditing(false)
  }

  return (
    <>
    {/* Main content */}
    <main className="flex-1 p-8 overflow-y-auto">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                  <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" className="mt-4">
                    Change Avatar
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="name"
                        name="name"
                        value={userProfile.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userProfile.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="phone"
                        name="phone"
                        value={userProfile.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="location"
                        name="location"
                        value={userProfile.location}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="occupation"
                        name="occupation"
                        value={userProfile.occupation}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Member Since</Label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <Input
                        id="joinDate"
                        name="joinDate"
                        value={userProfile.joinDate}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={userProfile.bio}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            {isEditing && (
              <Button onClick={handleSave}>Save Changes</Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </>
  )
}