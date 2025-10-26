import React, { useState } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomerLayout from '@/components/customer/customer-layout'
import { 
  User, 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Settings,
  Bell,
  Shield,
  CreditCard,
  Edit,
  Save,
  X,
  Camera,
  LogOut,
  Trash2
} from 'lucide-react'

export function CustomerProfile() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  })

  // Sample customer data
  const customerData = {
    memberSince: '2023-06-15',
    totalServices: 12,
    loyaltyPoints: 450,
    preferredTechnician: 'John Smith',
    vehicles: [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        vin: 'ABC123XYZ789',
        mileage: 45000,
        color: 'Silver',
        licensePlate: 'ABC-1234'
      }
    ],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      promotionalEmails: true,
      appointmentReminders: true
    }
  }

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    })
    setIsEditing(false)
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="px-4 py-6 pb-20">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] rounded-2xl flex items-center justify-center">
                <User className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                <p className="text-gray-400">Manage your account settings</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] rounded-2xl flex items-center justify-center">
                    <User className="h-10 w-10 text-black" />
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                  <Badge className="bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30 mt-2">
                    Premium Member
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </div>

              {/* Member Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#D4FF00]">{customerData.totalServices}</p>
                  <p className="text-xs text-gray-400">Services</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#D4FF00]">{customerData.loyaltyPoints}</p>
                  <p className="text-xs text-gray-400">Points</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#D4FF00]">2+</p>
                  <p className="text-xs text-gray-400">Years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-[#D4FF00]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">First Name</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.firstName}
                      onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})}
                      className="bg-gray-800/50 border-gray-700 text-white rounded-2xl"
                    />
                  ) : (
                    <p className="text-white font-medium">{user?.firstName || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Last Name</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.lastName}
                      onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})}
                      className="bg-gray-800/50 border-gray-700 text-white rounded-2xl"
                    />
                  ) : (
                    <p className="text-white font-medium">{user?.lastName || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <p className="text-white font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    className="bg-gray-800/50 border-gray-700 text-white rounded-2xl"
                  />
                ) : (
                  <p className="text-white font-medium">{editedProfile.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                    className="bg-gray-800/50 border-gray-700 text-white rounded-2xl"
                  />
                ) : (
                  <p className="text-white font-medium">{editedProfile.address}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black rounded-2xl"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Vehicles */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Car className="h-5 w-5 text-[#D4FF00]" />
                My Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customerData.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-gray-400">{vehicle.color} • {vehicle.licensePlate}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">VIN</p>
                      <p className="text-white font-medium">{vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mileage</p>
                      <p className="text-white font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
              >
                <Car className="h-4 w-4 mr-2" />
                Add Another Vehicle
              </Button>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#D4FF00]" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive text message alerts' },
                { key: 'promotionalEmails', label: 'Promotional Emails', description: 'Special offers and deals' },
                { key: 'appointmentReminders', label: 'Appointment Reminders', description: '24-hour service reminders' }
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">{pref.label}</p>
                    <p className="text-sm text-gray-400">{pref.description}</p>
                  </div>
                  <Switch 
                    checked={customerData.preferences[pref.key]}
                    className="data-[state=checked]:bg-[#D4FF00]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#D4FF00]" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
              >
                <Shield className="h-4 w-4 mr-3" />
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
              >
                <CreditCard className="h-4 w-4 mr-3" />
                Payment Methods
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => signOut()}
                className="w-full justify-start border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-2xl"
              >
                <Trash2 className="h-4 w-4 mr-3" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  )
}