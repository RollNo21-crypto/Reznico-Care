import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Package, 
  Clock, 
  Shield, 
  FileText, 
  Download, 
  Search,
  Calendar,
  Wrench,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Truck,
  Eye,
  Filter
} from 'lucide-react'
import { partsTrackingService } from '../services/parts-tracking-service'

export function CustomerPortal({ customerId = 'CUST-001' }) {
  const [customerData, setCustomerData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCustomerData()
  }, [customerId])

  const loadCustomerData = async () => {
    setIsLoading(true)
    try {
      const data = partsTrackingService.getCustomerPartsHistory(customerId)
      setCustomerData(data)
    } catch (error) {
      console.error('Error loading customer data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWarrantyStatus = (warrantyItem) => {
    if (!warrantyItem.isActive) {
      return { label: 'Expired', color: 'bg-red-500' }
    } else if (warrantyItem.daysRemaining <= 30) {
      return { label: 'Expiring Soon', color: 'bg-yellow-500' }
    } else {
      return { label: 'Active', color: 'bg-green-500' }
    }
  }

  const filteredServices = customerData?.services.filter(service =>
    service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.serviceId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="h-8 w-8 animate-pulse text-[#D4FF00] mx-auto mb-2" />
          <p className="text-white">Loading your service history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Service History</h1>
          <p className="text-gray-400">Track your parts, warranties, and service records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Services</p>
                <p className="text-2xl font-bold text-white">{customerData?.totalServices || 0}</p>
              </div>
              <Wrench className="h-8 w-8 text-[#D4FF00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Parts Installed</p>
                <p className="text-2xl font-bold text-white">{customerData?.totalPartsUsed || 0}</p>
              </div>
              <Package className="h-8 w-8 text-[#D4FF00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(customerData?.totalSpent || 0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#D4FF00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Warranties</p>
                <p className="text-2xl font-bold text-white">
                  {customerData?.warrantyItems.filter(w => w.isActive).length || 0}
                </p>
              </div>
              <Shield className="h-8 w-8 text-[#D4FF00]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="services" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Service History
          </TabsTrigger>
          <TabsTrigger value="parts" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Parts Breakdown
          </TabsTrigger>
          <TabsTrigger value="warranties" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Warranties
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Invoices
          </TabsTrigger>
        </TabsList>

        {/* Service History Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Service History</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredServices.map((service) => (
                  <div key={service.serviceId} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{service.serviceType}</h3>
                        <p className="text-sm text-gray-400">Service ID: {service.serviceId}</p>
                        <p className="text-sm text-gray-400">{formatDate(service.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{formatCurrency(service.totalServiceCost)}</p>
                        <Badge className="bg-green-500 text-white mt-1">Completed</Badge>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Parts Used ({service.partsUsed.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.partsUsed.map((part, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-600 rounded">
                            <div>
                              <p className="text-sm font-medium text-white">{part.name}</p>
                              <p className="text-xs text-gray-400">{part.partNumber}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-white">Qty: {part.quantity}</p>
                              <p className="text-xs text-gray-400">{formatCurrency(part.totalCost)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-600">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Truck className="h-4 w-4" />
                        Vehicle: {service.vehicleInfo.year} {service.vehicleInfo.make} {service.vehicleInfo.model}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-600"
                        onClick={() => setSelectedService(service)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parts Breakdown Tab */}
        <TabsContent value="parts" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Parts Breakdown</CardTitle>
              <CardDescription className="text-gray-400">
                All parts installed on your vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData?.partsBreakdown.map((part) => (
                  <div key={part.partId} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{part.name}</h3>
                        <p className="text-sm text-gray-400">Part Number: {part.partNumber}</p>
                        <p className="text-sm text-gray-400">Last Used: {formatDate(part.lastUsed)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">Total: {formatCurrency(part.totalCost)}</p>
                        <p className="text-sm text-gray-400">Qty: {part.totalQuantity}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Service History</h4>
                      <div className="space-y-1">
                        {part.services.slice(0, 3).map((service, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">
                              {formatDate(service.date)} - {service.serviceType}
                            </span>
                            <span className="text-white">{formatCurrency(service.cost)}</span>
                          </div>
                        ))}
                        {part.services.length > 3 && (
                          <p className="text-xs text-gray-500">
                            +{part.services.length - 3} more services
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warranties Tab */}
        <TabsContent value="warranties" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Warranty Information</CardTitle>
              <CardDescription className="text-gray-400">
                Track your parts warranties and coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData?.warrantyItems.map((warranty, index) => {
                  const status = getWarrantyStatus(warranty)
                  return (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{warranty.name}</h3>
                          <p className="text-sm text-gray-400">Part Number: {warranty.partNumber}</p>
                          <p className="text-sm text-gray-400">Service: {warranty.serviceId}</p>
                        </div>
                        <Badge className={`${status.color} text-white`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Service Date</p>
                          <p className="text-white">{formatDate(warranty.serviceDate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Warranty Expires</p>
                          <p className="text-white">{formatDate(warranty.warrantyExpiry)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Coverage Period</p>
                          <p className="text-white">{warranty.warrantyPeriod}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Days Remaining</p>
                          <p className={`font-medium ${warranty.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {warranty.isActive ? warranty.daysRemaining : 'Expired'}
                          </p>
                        </div>
                      </div>
                      
                      {warranty.isActive && warranty.daysRemaining <= 30 && (
                        <div className="mt-3 p-2 bg-yellow-900 border border-yellow-700 rounded flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-yellow-200">
                            Warranty expires in {warranty.daysRemaining} days
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Invoice History</CardTitle>
              <CardDescription className="text-gray-400">
                View and download your service invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData?.services.map((service) => (
                  <div key={service.serviceId} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">INV-{service.serviceId}</h3>
                        <p className="text-sm text-gray-400">{service.serviceType}</p>
                        <p className="text-sm text-gray-400">{formatDate(service.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{formatCurrency(service.totalServiceCost * 1.15)}</p>
                        <Badge className="bg-green-500 text-white mt-1">Paid</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-400">Subtotal</p>
                        <p className="text-white">{formatCurrency(service.totalServiceCost)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">VAT (15%)</p>
                        <p className="text-white">{formatCurrency(service.totalServiceCost * 0.15)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total</p>
                        <p className="text-white font-semibold">{formatCurrency(service.totalServiceCost * 1.15)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-600"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-gray-800 border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Service Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Service ID</p>
                    <p className="text-white">{selectedService.serviceId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white">{formatDate(selectedService.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Service Type</p>
                    <p className="text-white">{selectedService.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Cost</p>
                    <p className="text-white">{formatCurrency(selectedService.totalServiceCost)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Vehicle Information</h4>
                  <p className="text-gray-300">
                    {selectedService.vehicleInfo.year} {selectedService.vehicleInfo.make} {selectedService.vehicleInfo.model}
                  </p>
                  <p className="text-gray-400">Plate: {selectedService.vehicleInfo.plateNumber}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Parts Used</h4>
                  <div className="space-y-2">
                    {selectedService.partsUsed.map((part, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">{part.name}</p>
                            <p className="text-sm text-gray-400">{part.partNumber}</p>
                            <p className="text-sm text-gray-400">Supplier: {part.supplier}</p>
                            <p className="text-sm text-gray-400">Warranty: {part.warrantyPeriod}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white">Qty: {part.quantity}</p>
                            <p className="text-white">{formatCurrency(part.totalCost)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}