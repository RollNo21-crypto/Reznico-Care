import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  Car,
  Clock,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export function Reports() {
  const [dateRange, setDateRange] = useState("week")
  const [reportType, setReportType] = useState("overview")

  // Sample data
  const revenueData = {
    total: "$125,430",
    change: "+18.2%",
    trend: "up",
    breakdown: [
      { label: "Vehicle Sales", amount: "$85,200", percentage: 68 },
      { label: "Services", amount: "$28,150", percentage: 22 },
      { label: "Parts", amount: "$12,080", percentage: 10 }
    ]
  }

  const serviceMetrics = {
    completed: 156,
    pending: 23,
    avgTime: "2.5 hours",
    satisfaction: "4.8/5.0"
  }

  const topServices = [
    { name: "Oil Change", count: 45, revenue: "$2,250" },
    { name: "Brake Inspection", count: 38, revenue: "$5,700" },
    { name: "Tire Rotation", count: 32, revenue: "$1,920" },
    { name: "Full Service", count: 28, revenue: "$8,400" },
    { name: "Engine Diagnostic", count: 13, revenue: "$3,250" }
  ]

  const employeePerformance = [
    { name: "John Doe", services: 45, revenue: "$12,500", rating: 4.9 },
    { name: "Jane Smith", services: 42, revenue: "$11,800", rating: 4.8 },
    { name: "Mike Johnson", services: 38, revenue: "$10,200", rating: 4.7 },
    { name: "Sarah Williams", services: 31, revenue: "$8,900", rating: 4.6 }
  ]

  const customerInsights = {
    new: 48,
    returning: 108,
    retention: "72%",
    avgSpend: "$803"
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-[#D4FF00]" />
            Reports & Analytics
          </h1>
          <p className="text-gray-400 mt-1">Comprehensive business insights and performance metrics</p>
        </div>
        <Button className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="today" className="text-white hover:bg-gray-700">Today</SelectItem>
                  <SelectItem value="week" className="text-white hover:bg-gray-700">This Week</SelectItem>
                  <SelectItem value="month" className="text-white hover:bg-gray-700">This Month</SelectItem>
                  <SelectItem value="quarter" className="text-white hover:bg-gray-700">This Quarter</SelectItem>
                  <SelectItem value="year" className="text-white hover:bg-gray-700">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="overview" className="text-white hover:bg-gray-700">Overview</SelectItem>
                  <SelectItem value="sales" className="text-white hover:bg-gray-700">Sales Report</SelectItem>
                  <SelectItem value="services" className="text-white hover:bg-gray-700">Service Report</SelectItem>
                  <SelectItem value="employees" className="text-white hover:bg-gray-700">Employee Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{revenueData.total}</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              {revenueData.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-[#D4FF00]" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className="text-[#D4FF00] font-medium">{revenueData.change}</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Services Completed</CardTitle>
            <Clock className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{serviceMetrics.completed}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-yellow-400 font-medium">{serviceMetrics.pending}</span> pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Service Time</CardTitle>
            <TrendingUp className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{serviceMetrics.avgTime}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-[#D4FF00] font-medium">-15%</span> faster than average
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Customer Satisfaction</CardTitle>
            <Users className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{serviceMetrics.satisfaction}</div>
            <p className="text-xs text-gray-500 mt-1">
              Based on {serviceMetrics.completed} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue Breakdown */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueData.breakdown.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white font-semibold">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-[#D4FF00] h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topServices.map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#D4FF00]">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.count} services</p>
                    </div>
                  </div>
                  <span className="text-[#D4FF00] font-semibold">{service.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Employee Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeePerformance.map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.services} services completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4FF00] font-semibold">{emp.revenue}</p>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                      ⭐ {emp.rating}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Customer Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">New Customers</p>
                <p className="text-2xl font-bold text-white">{customerInsights.new}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Returning</p>
                <p className="text-2xl font-bold text-white">{customerInsights.returning}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Retention Rate</p>
                <p className="text-2xl font-bold text-[#D4FF00]">{customerInsights.retention}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Avg Spend</p>
                <p className="text-2xl font-bold text-[#D4FF00]">{customerInsights.avgSpend}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Generate Custom Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
              <FileText className="h-4 w-4 mr-2" />
              Sales Report
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
              <Car className="h-4 w-4 mr-2" />
              Inventory Report
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
              <Users className="h-4 w-4 mr-2" />
              Customer Report
            </Button>
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Monthly Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
