import React, { useState } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CustomerLayout from '@/components/customer/customer-layout'
import { 
  Car, 
  Calendar, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Download,
  User,
  LogOut,
  Wrench,
  CreditCard,
  MapPin,
  Phone,
  TrendingUp,
  Activity,
  AlertCircle,
  Home,
  Settings,
  Bell,
  Menu,
  Edit,
  Save,
  X
} from 'lucide-react'

export default function CustomerDashboard() {
  const { user } = useUser()
  const { signOut } = useClerk()
  
  // State for current view and profile editing
  const [currentView, setCurrentView] = useState('home')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
    phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 123-4567'
  })

  // Profile management functions
  const handleProfileEdit = () => {
    setIsEditingProfile(true)
  }

  const handleProfileSave = () => {
    // Here you would typically update the user profile via Clerk or your API
    console.log('Saving profile data:', profileData)
    setIsEditingProfile(false)
  }

  const handleProfileCancel = () => {
    // Reset to original data
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.emailAddresses?.[0]?.emailAddress || '',
      phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'Jane Doe - (555) 123-4567'
    })
    setIsEditingProfile(false)
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Sample data - in a real app, this would come from an API
  const customerData = {
    services: [
      { id: 1, type: 'Oil Change', date: '2024-01-15', status: 'Completed', cost: 45.99 },
      { id: 2, type: 'Brake Inspection', date: '2024-01-20', status: 'Completed', cost: 89.99 },
      { id: 3, type: 'Tire Rotation', date: '2024-02-01', status: 'Pending', cost: 35.00 },
    ],
    invoices: [
      { id: 'INV-001', date: '2024-01-15', amount: 45.99, status: 'Paid' },
      { id: 'INV-002', date: '2024-01-20', amount: 89.99, status: 'Paid' },
      { id: 'INV-003', date: '2024-02-01', amount: 35.00, status: 'Pending' },
    ],
    appointments: [
      { id: 1, service: 'Annual Inspection', date: '2024-02-15', time: '10:00 AM' },
      { id: 2, service: 'Oil Change', date: '2024-03-01', time: '2:00 PM' },
    ],
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      vin: 'ABC123XYZ789',
      mileage: 45000
    }
  }

  const stats = {
    totalServices: customerData.services.length,
    completedServices: customerData.services.filter(s => s.status === 'Completed').length,
    pendingServices: customerData.services.filter(s => s.status === 'Pending').length,
    totalSpent: customerData.services.reduce((sum, service) => sum + service.cost, 0)
  }

  const getServiceStatusBadge = (status) => {
    const config = {
      completed: { icon: CheckCircle, label: "Completed", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      "in-progress": { icon: AlertCircle, label: "In Progress", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      pending: { icon: Clock, label: "Pending", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    }[status] || { icon: AlertCircle, label: "Unknown", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" }
    
    const Icon = config.icon
    return (
      <Badge className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  // Render profile section
  const renderProfileSection = () => (
    <div className="space-y-4">
      {/* Profile Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-[#D4FF00]" />
              My Profile
            </CardTitle>
            {!isEditingProfile ? (
              <Button 
                onClick={handleProfileEdit}
                variant="ghost" 
                size="sm"
                className="text-[#D4FF00] hover:bg-[#D4FF00]/10"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={handleProfileSave}
                  size="sm"
                  className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={handleProfileCancel}
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:bg-gray-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#D4FF00]/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-[#D4FF00]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-400 text-sm">{profileData.email}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400">First Name</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Last Name</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Email</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    type="email"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Phone</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    type="tel"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.phone || 'Not provided'}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-400">Address</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.address}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-400">Emergency Contact</Label>
                {isEditingProfile ? (
                  <Input
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <p className="text-white p-2 bg-gray-800 rounded border border-gray-700">
                    {profileData.emergencyContact}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#D4FF00]" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-[#D4FF00]"
            >
              <Bell className="h-4 w-4 mr-3" />
              Notification Preferences
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-[#D4FF00]"
            >
              <Settings className="h-4 w-4 mr-3" />
              Privacy Settings
            </Button>
            <Button 
              onClick={() => signOut()}
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              <X className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const getInvoiceStatusBadge = (status) => {
    const config = {
      paid: { label: "Paid", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      pending: { label: "Pending", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    }[status]
    
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      {/* Mobile-First Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4FF00]/20 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-[#D4FF00]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Hi, {user?.firstName || 'Customer'}!</h1>
            <p className="text-xs text-gray-400">Welcome back</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-400 hover:bg-gray-800 md:hidden"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
          </Button>
          {/* Desktop Sign Out */}
          <Button 
            variant="outline"
            onClick={() => signOut()}
            className="hidden md:flex border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-red-400"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-20 pb-24 md:pb-4 px-4 py-6 space-y-6">
        {/* Conditional Content Based on Current View */}
        {currentView === 'home' && (
          <>
            {/* Mobile-Optimized Stats Cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Wrench className="h-5 w-5 text-[#D4FF00]" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{stats.totalServices}</div>
                      <CardTitle className="text-xs font-medium text-gray-400">Services</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CheckCircle className="h-5 w-5 text-[#D4FF00]" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#D4FF00]">{stats.completedServices}</div>
                      <CardTitle className="text-xs font-medium text-gray-400">Completed</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{stats.pendingServices}</div>
                      <CardTitle className="text-xs font-medium text-gray-400">Pending</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <DollarSign className="h-5 w-5 text-[#D4FF00]" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#D4FF00]">${stats.totalSpent.toFixed(0)}</div>
                      <CardTitle className="text-xs font-medium text-gray-400">Spent</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Mobile-Optimized Main Content */}
            <div className="space-y-4">
              {/* Quick Actions - Mobile App Style */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                <Button className="h-16 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] hover:bg-[#D4FF00]/20 flex flex-col gap-1">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Book Service</span>
                </Button>
                <Button className="h-16 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 flex flex-col gap-1">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">View Invoices</span>
                </Button>
              </div>

              {/* Service History - Mobile Optimized */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-[#D4FF00]" />
                    Recent Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mobile: Card Layout */}
                  <div className="space-y-3 md:hidden">
                    {customerData.services.map((service) => (
                      <div key={service.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{service.type}</h3>
                          {getServiceStatusBadge(service.status.toLowerCase())}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{service.date}</span>
                          <span className="text-[#D4FF00] font-semibold">${service.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Desktop: Table Layout */}
                  <div className="hidden md:block border border-gray-800 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800 hover:bg-gray-800/50">
                          <TableHead className="text-gray-400">Service</TableHead>
                          <TableHead className="text-gray-400">Date</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-right text-gray-400">Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerData.services.map((service) => (
                          <TableRow key={service.id} className="border-gray-800 hover:bg-gray-800/50">
                            <TableCell className="font-medium text-white">{service.type}</TableCell>
                            <TableCell className="text-gray-400">{service.date}</TableCell>
                            <TableCell>{getServiceStatusBadge(service.status.toLowerCase())}</TableCell>
                            <TableCell className="text-right text-white font-medium">${service.cost}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile: Stacked Layout for Secondary Content */}
              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                {/* Upcoming Appointments */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#D4FF00]" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {customerData.appointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-[#D4FF00]" />
                            <span className="text-white font-medium text-sm">{apt.date}</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{apt.time} • {apt.service}</p>
                          <Badge className="bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30">
                            Scheduled
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* My Vehicle */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Car className="h-5 w-5 text-[#D4FF00]" />
                      My Vehicle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#D4FF00]/20 rounded-lg flex items-center justify-center">
                          <Car className="h-6 w-6 text-[#D4FF00]" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{customerData.vehicle.year} {customerData.vehicle.make} {customerData.vehicle.model}</p>
                          <p className="text-xs text-gray-400">VIN: {customerData.vehicle.vin}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <span className="text-xs text-gray-400">Mileage</span>
                        <span className="text-sm text-white font-medium">{customerData.vehicle.mileage.toLocaleString()} mi</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Invoices - Mobile Optimized */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#D4FF00]" />
                    Recent Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customerData.invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{inv.id}</p>
                          <p className="text-xs text-gray-400">{inv.date}</p>
                        </div>
                        <div className="text-right space-y-1 mr-3">
                          <p className="text-white font-semibold">${inv.amount}</p>
                          {getInvoiceStatusBadge(inv.status.toLowerCase())}
                        </div>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-700 hover:text-[#D4FF00] text-gray-400">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Profile Section */}
        {currentView === 'profile' && renderProfileSection()}
        
        {/* Services Section */}
        {currentView === 'services' && (
          <div className="text-center py-8">
            <Calendar className="h-16 w-16 text-[#D4FF00] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Services</h2>
            <p className="text-gray-400">Service booking functionality coming soon!</p>
          </div>
        )}
        
        {/* Invoices Section */}
        {currentView === 'invoices' && (
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-[#D4FF00] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Invoices</h2>
            <p className="text-gray-400">Detailed invoice management coming soon!</p>
          </div>
        )}
      </main>

      {/* Enhanced Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-gray-900/95 backdrop-blur border-t border-gray-800 md:hidden">
        <div className="grid grid-cols-4 h-20 px-2">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl mx-1 ${
              currentView === 'home' 
                ? 'text-[#D4FF00] bg-[#D4FF00]/10' 
                : 'text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('services')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl mx-1 ${
              currentView === 'services' 
                ? 'text-[#D4FF00] bg-[#D4FF00]/10' 
                : 'text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800'
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs font-medium">Services</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('invoices')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl mx-1 ${
              currentView === 'invoices' 
                ? 'text-[#D4FF00] bg-[#D4FF00]/10' 
                : 'text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800'
            }`}
          >
            <FileText className="h-6 w-6" />
            <span className="text-xs font-medium">Invoices</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl mx-1 ${
              currentView === 'profile' 
                ? 'text-[#D4FF00] bg-[#D4FF00]/10' 
                : 'text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}
