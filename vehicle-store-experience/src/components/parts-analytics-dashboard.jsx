import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Truck,
  Users,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import partsService from '../services/parts-service'

export function PartsAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [topParts, setTopParts] = useState([])
  const [supplierPerformance, setSupplierPerformance] = useState([])
  const [costTrends, setCostTrends] = useState([])
  const [notifications, setNotifications] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod, selectedCategory])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      // Load all analytics data
      const [
        analyticsData,
        topPartsData,
        supplierData,
        costTrendData,
        notificationsData
      ] = await Promise.all([
        partsService.getUsageAnalytics(),
        partsService.getTopUsedParts(10),
        partsService.getSupplierPerformance(),
        partsService.getCostTrend(parseInt(selectedPeriod)),
        partsService.getNotifications()
      ])

      setAnalytics(analyticsData)
      setTopParts(topPartsData)
      setSupplierPerformance(supplierData)
      setCostTrends(costTrendData)
      setNotifications(notificationsData.filter(n => !n.read))
    } catch (error) {
      console.error('Error loading analytics data:', error)
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

  const getSupplierRating = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-500' }
    if (score >= 80) return { label: 'Good', color: 'bg-blue-500' }
    if (score >= 70) return { label: 'Average', color: 'bg-yellow-500' }
    return { label: 'Poor', color: 'bg-red-500' }
  }

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-[#D4FF00]" />
        <span className="ml-2 text-white">Loading analytics...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Parts Analytics Dashboard</h1>
          <p className="text-gray-400">Comprehensive insights into parts usage, costs, and supplier performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
              <SelectItem value="365">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={loadAnalyticsData}
            className="bg-[#D4FF00] text-black hover:bg-[#B8E000]"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Parts Used</p>
                <p className="text-2xl font-bold text-white">{analytics?.totalPartsUsed || 0}</p>
              </div>
              <Package className="h-8 w-8 text-[#D4FF00]" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(analytics?.partsUsageTrend || 0)}
              <span className="text-sm text-gray-400 ml-1">
                {Math.abs(analytics?.partsUsageTrend || 0)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Cost</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(analytics?.totalCost || 0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#D4FF00]" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(analytics?.costTrend || 0)}
              <span className="text-sm text-gray-400 ml-1">
                {Math.abs(analytics?.costTrend || 0)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg Delivery Time</p>
                <p className="text-2xl font-bold text-white">{analytics?.avgDeliveryTime || 0} days</p>
              </div>
              <Clock className="h-8 w-8 text-[#D4FF00]" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(-(analytics?.deliveryTimeTrend || 0))}
              <span className="text-sm text-gray-400 ml-1">
                {Math.abs(analytics?.deliveryTimeTrend || 0)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Suppliers</p>
                <p className="text-2xl font-bold text-white">{supplierPerformance?.length || 0}</p>
              </div>
              <Truck className="h-8 w-8 text-[#D4FF00]" />
            </div>
            <div className="flex items-center mt-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-400 ml-1">All suppliers active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Active Notifications ({notifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.slice(0, 5).map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'low_stock' ? 'bg-red-500' :
                      notification.type === 'reorder' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <span className="text-white">{notification.message}</span>
                  </div>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {notification.type.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="usage" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Parts Usage
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Supplier Performance
          </TabsTrigger>
          <TabsTrigger value="costs" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Inventory Status
          </TabsTrigger>
        </TabsList>

        {/* Parts Usage Tab */}
        <TabsContent value="usage" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Used Parts</CardTitle>
              <CardDescription className="text-gray-400">
                Most frequently used parts in the last {selectedPeriod} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topParts.map((part, index) => (
                  <div key={part.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#D4FF00] text-black rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{part.name}</h3>
                        <p className="text-sm text-gray-400">{part.partNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{part.usageCount} uses</p>
                      <p className="text-sm text-gray-400">{formatCurrency(part.totalCost)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplier Performance Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Supplier Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Performance metrics for all active suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier) => {
                  const rating = getSupplierRating(supplier.overallScore)
                  return (
                    <div key={supplier.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">{supplier.name}</h3>
                        <Badge className={`${rating.color} text-white`}>
                          {rating.label} ({supplier.overallScore}%)
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Reliability</p>
                          <p className="text-white font-medium">{supplier.reliability}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Avg Delivery</p>
                          <p className="text-white font-medium">{supplier.avgDeliveryTime} days</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Total Orders</p>
                          <p className="text-white font-medium">{supplier.totalOrders}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cost Trends</CardTitle>
              <CardDescription className="text-gray-400">
                Parts cost analysis over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-white">{trend.period}</h3>
                      <p className="text-sm text-gray-400">{trend.partsCount} parts used</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{formatCurrency(trend.totalCost)}</p>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(trend.changePercent)}
                        <span className="text-sm text-gray-400">
                          {Math.abs(trend.changePercent)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Status Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Inventory Status</CardTitle>
              <CardDescription className="text-gray-400">
                Current stock levels and reorder alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsService.getInventoryStatus().map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'in-stock' ? 'bg-green-500' :
                        item.status === 'low-stock' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.partNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{item.currentStock} units</p>
                      <p className="text-sm text-gray-400">Min: {item.minStock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}