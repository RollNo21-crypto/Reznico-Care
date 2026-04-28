import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Truck,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Users,
  Zap,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Edit
} from 'lucide-react'

export function SupplierPerformanceDashboard() {
  const [suppliers, setSuppliers] = useState([])
  const [performanceMetrics, setPerformanceMetrics] = useState({})
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [sortBy, setSortBy] = useState('rating')

  // Mock supplier data
  const mockSuppliers = [
    {
      id: 'sup-001',
      name: 'AutoParts Pro',
      category: 'OEM Parts',
      rating: 4.8,
      totalOrders: 156,
      onTimeDelivery: 94.2,
      qualityScore: 96.5,
      responseTime: 2.3, // hours
      defectRate: 1.2,
      costCompetitiveness: 87.5,
      relationship: 'preferred',
      contact: {
        phone: '+1-555-0123',
        email: 'orders@autopartspro.com',
        address: '123 Industrial Blvd, Detroit, MI'
      },
      recentOrders: [
        { date: '2024-01-15', amount: 2450, status: 'delivered', onTime: true },
        { date: '2024-01-12', amount: 1890, status: 'delivered', onTime: true },
        { date: '2024-01-08', amount: 3200, status: 'delivered', onTime: false }
      ],
      strengths: ['Fast delivery', 'High quality', 'Competitive pricing'],
      weaknesses: ['Limited inventory', 'Occasional delays'],
      certifications: ['ISO 9001', 'TS 16949'],
      paymentTerms: 'Net 30',
      minimumOrder: 500
    },
    {
      id: 'sup-002',
      name: 'Global Auto Supply',
      category: 'Aftermarket Parts',
      rating: 4.2,
      totalOrders: 89,
      onTimeDelivery: 87.6,
      qualityScore: 91.2,
      responseTime: 4.1,
      defectRate: 2.8,
      costCompetitiveness: 92.3,
      relationship: 'standard',
      contact: {
        phone: '+1-555-0456',
        email: 'sales@globalautosupply.com',
        address: '456 Commerce St, Chicago, IL'
      },
      recentOrders: [
        { date: '2024-01-14', amount: 1650, status: 'in_transit', onTime: true },
        { date: '2024-01-10', amount: 2100, status: 'delivered', onTime: true },
        { date: '2024-01-05', amount: 980, status: 'delivered', onTime: false }
      ],
      strengths: ['Wide selection', 'Good pricing', 'Flexible terms'],
      weaknesses: ['Quality inconsistency', 'Slow response'],
      certifications: ['ISO 9001'],
      paymentTerms: 'Net 45',
      minimumOrder: 250
    },
    {
      id: 'sup-003',
      name: 'Premium Parts Direct',
      category: 'Luxury Parts',
      rating: 4.9,
      totalOrders: 67,
      onTimeDelivery: 98.5,
      qualityScore: 98.8,
      responseTime: 1.2,
      defectRate: 0.3,
      costCompetitiveness: 72.1,
      relationship: 'premium',
      contact: {
        phone: '+1-555-0789',
        email: 'vip@premiumpartsdirect.com',
        address: '789 Luxury Lane, Beverly Hills, CA'
      },
      recentOrders: [
        { date: '2024-01-16', amount: 5600, status: 'delivered', onTime: true },
        { date: '2024-01-11', amount: 4200, status: 'delivered', onTime: true },
        { date: '2024-01-06', amount: 3800, status: 'delivered', onTime: true }
      ],
      strengths: ['Exceptional quality', 'Fast response', 'Premium service'],
      weaknesses: ['High prices', 'Limited availability'],
      certifications: ['ISO 9001', 'TS 16949', 'OEM Certified'],
      paymentTerms: 'Net 15',
      minimumOrder: 1000
    }
  ]

  const mockMetrics = {
    totalSuppliers: 24,
    averageRating: 4.3,
    onTimeDeliveryRate: 91.2,
    totalOrderValue: 245600,
    averageResponseTime: 2.8,
    qualityScore: 94.1,
    topPerformer: 'Premium Parts Direct',
    improvementNeeded: 2
  }

  useEffect(() => {
    setSuppliers(mockSuppliers)
    setPerformanceMetrics(mockMetrics)
  }, [])

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-400'
    if (rating >= 4.0) return 'text-yellow-400'
    if (rating >= 3.5) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRelationshipBadge = (relationship) => {
    switch (relationship) {
      case 'premium': return 'bg-purple-600 text-white'
      case 'preferred': return 'bg-green-600 text-white'
      case 'standard': return 'bg-blue-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  const getPerformanceColor = (value, threshold = 90) => {
    if (value >= threshold) return 'text-green-400'
    if (value >= threshold - 10) return 'text-yellow-400'
    return 'text-red-400'
  }

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating
      case 'onTime': return b.onTimeDelivery - a.onTimeDelivery
      case 'quality': return b.qualityScore - a.qualityScore
      case 'orders': return b.totalOrders - a.totalOrders
      default: return 0
    }
  })

  const handleContactSupplier = (supplier) => {
    console.log('Contacting supplier:', supplier.name)
  }

  const handleRateSupplier = (supplierId, rating) => {
    console.log('Rating supplier:', supplierId, rating)
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Truck className="h-6 w-6 text-[#D4FF00]" />
            Supplier Performance Dashboard
          </CardTitle>
          <p className="text-gray-400">
            Comprehensive supplier analytics with ratings and delivery performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="onTime">Sort by On-Time Delivery</option>
              <option value="quality">Sort by Quality Score</option>
              <option value="orders">Sort by Order Volume</option>
            </select>
            <Button className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90">
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
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            All Suppliers
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#D4FF00]" />
                  <div>
                    <p className="text-2xl font-bold text-white">{performanceMetrics.totalSuppliers}</p>
                    <p className="text-gray-400">Total Suppliers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{performanceMetrics.averageRating}</p>
                    <p className="text-gray-400">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-green-400">{performanceMetrics.onTimeDeliveryRate}%</p>
                    <p className="text-gray-400">On-Time Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-blue-400">${performanceMetrics.totalOrderValue?.toLocaleString()}</p>
                    <p className="text-gray-400">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-[#D4FF00]" />
                Top Performing Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedSuppliers.slice(0, 3).map((supplier, index) => (
                  <div key={supplier.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        <span className="text-black font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{supplier.name}</p>
                        <p className="text-gray-400 text-sm">{supplier.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className={`font-bold ${getRatingColor(supplier.rating)}`}>
                            {supplier.rating}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{supplier.totalOrders} orders</p>
                      </div>
                      <Badge className={getRelationshipBadge(supplier.relationship)}>
                        {supplier.relationship}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4">
            {sortedSuppliers.map((supplier) => (
              <Card key={supplier.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                        <Badge className={getRelationshipBadge(supplier.relationship)}>
                          {supplier.relationship}
                        </Badge>
                      </div>
                      <p className="text-gray-400">{supplier.category}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {supplier.contact.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {supplier.contact.email}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className={`text-xl font-bold ${getRatingColor(supplier.rating)}`}>
                          {supplier.rating}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{supplier.totalOrders} orders</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">On-Time Delivery</p>
                      <p className={`text-lg font-bold ${getPerformanceColor(supplier.onTimeDelivery)}`}>
                        {supplier.onTimeDelivery}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Quality Score</p>
                      <p className={`text-lg font-bold ${getPerformanceColor(supplier.qualityScore, 95)}`}>
                        {supplier.qualityScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Response Time</p>
                      <p className="text-white font-bold">{supplier.responseTime}h</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Defect Rate</p>
                      <p className={`text-lg font-bold ${supplier.defectRate <= 2 ? 'text-green-400' : 'text-red-400'}`}>
                        {supplier.defectRate}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-green-400 font-medium mb-2 flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Strengths
                      </p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {supplier.strengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-yellow-400 font-medium mb-2 flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4" />
                        Areas for Improvement
                      </p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {supplier.weaknesses.map((weakness, index) => (
                          <li key={index}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                      onClick={() => handleContactSupplier(supplier)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-white border-gray-600"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-white border-gray-600"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Rate Supplier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{supplier.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getPerformanceColor(supplier.onTimeDelivery) === 'text-green-400' ? 'bg-green-400' : 
                              getPerformanceColor(supplier.onTimeDelivery) === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${supplier.onTimeDelivery}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.onTimeDelivery)}`}>
                          {supplier.onTimeDelivery}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quality Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{supplier.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getPerformanceColor(supplier.qualityScore, 95) === 'text-green-400' ? 'bg-green-400' : 
                              getPerformanceColor(supplier.qualityScore, 95) === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${supplier.qualityScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(supplier.qualityScore, 95)}`}>
                          {supplier.qualityScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <p>Performance trend charts would appear here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-[#D4FF00]" />
                  <div>
                    <p className="text-2xl font-bold text-[#D4FF00]">{performanceMetrics.qualityScore}%</p>
                    <p className="text-gray-400">Overall Quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{performanceMetrics.averageResponseTime}h</p>
                    <p className="text-gray-400">Avg Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-red-400">{performanceMetrics.improvementNeeded}</p>
                    <p className="text-gray-400">Need Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supplier Comparison */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Supplier Comparison Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 p-2">Supplier</th>
                      <th className="text-center text-gray-400 p-2">Rating</th>
                      <th className="text-center text-gray-400 p-2">On-Time %</th>
                      <th className="text-center text-gray-400 p-2">Quality %</th>
                      <th className="text-center text-gray-400 p-2">Response Time</th>
                      <th className="text-center text-gray-400 p-2">Cost Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b border-gray-800">
                        <td className="text-white p-2">{supplier.name}</td>
                        <td className="text-center p-2">
                          <span className={getRatingColor(supplier.rating)}>
                            {supplier.rating}
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span className={getPerformanceColor(supplier.onTimeDelivery)}>
                            {supplier.onTimeDelivery}%
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span className={getPerformanceColor(supplier.qualityScore, 95)}>
                            {supplier.qualityScore}%
                          </span>
                        </td>
                        <td className="text-center p-2 text-white">{supplier.responseTime}h</td>
                        <td className="text-center p-2">
                          <span className={getPerformanceColor(supplier.costCompetitiveness, 85)}>
                            {supplier.costCompetitiveness}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}