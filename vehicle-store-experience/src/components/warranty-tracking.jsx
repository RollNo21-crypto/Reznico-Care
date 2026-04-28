import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  Settings,
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  BarChart3,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

export function WarrantyTracking() {
  const [warranties, setWarranties] = useState([])
  const [expiringWarranties, setExpiringWarranties] = useState([])
  const [warrantyStats, setWarrantyStats] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedWarranty, setSelectedWarranty] = useState(null)

  // Mock warranty data
  const mockWarranties = [
    {
      id: 'war-001',
      partName: 'Brake Pad Set - Front',
      partNumber: 'BP-2019-TC-F',
      supplier: 'AutoParts Pro',
      purchaseDate: '2023-08-15',
      warrantyPeriod: 24, // months
      expiryDate: '2025-08-15',
      status: 'active',
      claimHistory: [],
      cost: 150.00,
      vehicle: '2019 Toyota Camry',
      installationDate: '2023-08-20',
      mileageAtInstall: 45000,
      currentMileage: 52000,
      warrantyType: 'parts_labor',
      terms: 'Full replacement coverage for manufacturing defects'
    },
    {
      id: 'war-002',
      partName: 'Transmission Filter',
      partNumber: 'TF-2020-HC-A',
      supplier: 'Honda Genuine Parts',
      purchaseDate: '2024-01-10',
      warrantyPeriod: 12,
      expiryDate: '2025-01-10',
      status: 'expiring_soon',
      claimHistory: [],
      cost: 85.00,
      vehicle: '2020 Honda Civic',
      installationDate: '2024-01-15',
      mileageAtInstall: 28000,
      currentMileage: 35000,
      warrantyType: 'parts_only',
      terms: 'Parts replacement only, labor not covered'
    },
    {
      id: 'war-003',
      partName: 'Alternator',
      partNumber: 'ALT-2018-FF-R',
      supplier: 'Ford Motor Company',
      purchaseDate: '2023-03-22',
      warrantyPeriod: 36,
      expiryDate: '2026-03-22',
      status: 'claimed',
      claimHistory: [
        {
          date: '2024-01-05',
          issue: 'Charging system failure',
          resolution: 'Replaced under warranty',
          cost: 0
        }
      ],
      cost: 320.00,
      vehicle: '2018 Ford F-150',
      installationDate: '2023-03-25',
      mileageAtInstall: 65000,
      currentMileage: 78000,
      warrantyType: 'full_coverage',
      terms: 'Complete coverage including parts, labor, and diagnostics'
    },
    {
      id: 'war-004',
      partName: 'Air Conditioning Compressor',
      partNumber: 'AC-2021-NM-C',
      supplier: 'Climate Control Systems',
      purchaseDate: '2023-12-01',
      warrantyPeriod: 18,
      expiryDate: '2025-06-01',
      status: 'expired',
      claimHistory: [],
      cost: 450.00,
      vehicle: '2021 Nissan Maxima',
      installationDate: '2023-12-05',
      mileageAtInstall: 15000,
      currentMileage: 25000,
      warrantyType: 'parts_labor',
      terms: 'Coverage for compressor and related components'
    }
  ]

  const mockStats = {
    totalWarranties: 156,
    activeWarranties: 98,
    expiringWarranties: 23,
    expiredWarranties: 35,
    totalValue: 45600,
    claimsThisYear: 12,
    claimValue: 3200,
    averageWarrantyPeriod: 22
  }

  useEffect(() => {
    setWarranties(mockWarranties)
    setWarrantyStats(mockStats)
    
    // Filter expiring warranties (within 30 days)
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000))
    
    const expiring = mockWarranties.filter(warranty => {
      const expiryDate = new Date(warranty.expiryDate)
      return expiryDate <= thirtyDaysFromNow && expiryDate > now
    })
    
    setExpiringWarranties(expiring)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'expiring_soon': return 'bg-yellow-600'
      case 'expired': return 'bg-red-600'
      case 'claimed': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'expiring_soon': return 'Expiring Soon'
      case 'expired': return 'Expired'
      case 'claimed': return 'Claimed'
      default: return 'Unknown'
    }
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const now = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredWarranties = warranties.filter(warranty => {
    const matchesSearch = warranty.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warranty.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warranty.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || warranty.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const handleClaimWarranty = (warrantyId) => {
    // Handle warranty claim logic
    console.log('Claiming warranty:', warrantyId)
  }

  const handleRenewWarranty = (warrantyId) => {
    // Handle warranty renewal logic
    console.log('Renewing warranty:', warrantyId)
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#D4FF00]" />
            Warranty Tracking System
          </CardTitle>
          <p className="text-gray-400">
            Comprehensive warranty management with expiration alerts and claim tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search warranties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="claimed">Claimed</option>
            </select>
            <Button className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90">
              <Upload className="h-4 w-4 mr-2" />
              Import Warranties
            </Button>
            <Button variant="outline" className="text-white border-gray-600">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="warranties" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            All Warranties
          </TabsTrigger>
          <TabsTrigger value="expiring" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Expiring Soon
          </TabsTrigger>
          <TabsTrigger value="claims" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Claims History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-[#D4FF00]" />
                  <div>
                    <p className="text-2xl font-bold text-white">{warrantyStats.totalWarranties}</p>
                    <p className="text-gray-400">Total Warranties</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-green-400">{warrantyStats.activeWarranties}</p>
                    <p className="text-gray-400">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{warrantyStats.expiringWarranties}</p>
                    <p className="text-gray-400">Expiring Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-blue-400">${warrantyStats.totalValue?.toLocaleString()}</p>
                    <p className="text-gray-400">Total Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expiring Warranties Alert */}
          {expiringWarranties.length > 0 && (
            <Card className="bg-yellow-900/20 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Warranties Expiring Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expiringWarranties.slice(0, 3).map((warranty) => (
                    <div key={warranty.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{warranty.partName}</p>
                        <p className="text-gray-400 text-sm">{warranty.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-semibold">
                          {getDaysUntilExpiry(warranty.expiryDate)} days left
                        </p>
                        <p className="text-gray-400 text-sm">
                          Expires: {new Date(warranty.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* All Warranties Tab */}
        <TabsContent value="warranties" className="space-y-4">
          <div className="grid gap-4">
            {filteredWarranties.map((warranty) => (
              <Card key={warranty.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {warranty.partName}
                      </h3>
                      <p className="text-gray-400">{warranty.partNumber} • {warranty.vehicle}</p>
                      <p className="text-gray-400 text-sm">Supplier: {warranty.supplier}</p>
                    </div>
                    <Badge className={`${getStatusColor(warranty.status)} text-white`}>
                      {getStatusText(warranty.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Purchase Date</p>
                      <p className="text-white font-medium">
                        {new Date(warranty.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Warranty Period</p>
                      <p className="text-white font-medium">{warranty.warrantyPeriod} months</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Expiry Date</p>
                      <p className="text-white font-medium">
                        {new Date(warranty.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cost</p>
                      <p className="text-white font-medium">${warranty.cost}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-medium mb-2">Warranty Terms:</p>
                    <p className="text-gray-300 text-sm">{warranty.terms}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                      onClick={() => handleClaimWarranty(warranty.id)}
                      disabled={warranty.status === 'expired'}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      File Claim
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-white border-gray-600"
                      onClick={() => setSelectedWarranty(warranty)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-white border-gray-600"
                      onClick={() => handleRenewWarranty(warranty.id)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Renew
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Expiring Soon Tab */}
        <TabsContent value="expiring" className="space-y-4">
          <div className="grid gap-4">
            {expiringWarranties.map((warranty) => (
              <Card key={warranty.id} className="bg-yellow-900/10 border-yellow-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {warranty.partName}
                      </h3>
                      <p className="text-gray-400">{warranty.vehicle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-lg">
                        {getDaysUntilExpiry(warranty.expiryDate)} days left
                      </p>
                      <p className="text-gray-400 text-sm">
                        Expires: {new Date(warranty.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                    <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Renew Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Claims History Tab */}
        <TabsContent value="claims" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Claims Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#D4FF00]">{warrantyStats.claimsThisYear}</p>
                  <p className="text-gray-400">Claims This Year</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">${warrantyStats.claimValue?.toLocaleString()}</p>
                  <p className="text-gray-400">Total Claim Value</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">92%</p>
                  <p className="text-gray-400">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claims History List */}
          <div className="space-y-4">
            {warranties.filter(w => w.claimHistory.length > 0).map((warranty) => (
              <Card key={warranty.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {warranty.partName} - {warranty.vehicle}
                  </h3>
                  
                  {warranty.claimHistory.map((claim, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">Claim Date: {new Date(claim.date).toLocaleDateString()}</p>
                          <p className="text-gray-400">Issue: {claim.issue}</p>
                        </div>
                        <Badge className="bg-green-600 text-white">Resolved</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Resolution: {claim.resolution}</p>
                      <p className="text-[#D4FF00] font-semibold">Cost: ${claim.cost}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}