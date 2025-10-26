import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus,
  Car,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  Activity,
  ClipboardList
} from "lucide-react"

export function Dashboard({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMake, setFilterMake] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample data
  const stats = [
    { label: "Total Revenue", value: "$485,200", change: "+18.2%", icon: DollarSign, trend: "up" },
    { label: "Total Vehicles", value: "245", change: "+12.5%", icon: Car, trend: "up" },
    { label: "Active Customers", value: "1,284", change: "+8.1%", icon: Users, trend: "up" },
    { label: "Avg. Sale Price", value: "$38,450", change: "+5.2%", icon: TrendingUp, trend: "up" },
  ]

  const vehicles = [
    { id: 1, name: "2024 Tesla Model 3", make: "Tesla", stock: "EV-2024-001", price: "$42,990", status: "available" },
    { id: 2, name: "2023 Toyota Camry", make: "Toyota", stock: "SD-2023-045", price: "$28,500", status: "reserved" },
    { id: 3, name: "2024 Ford F-150", make: "Ford", stock: "TR-2024-012", price: "$55,200", status: "available" },
    { id: 4, name: "2023 Honda CR-V", make: "Honda", stock: "SUV-2023-089", price: "$32,750", status: "available" },
    { id: 5, name: "2024 BMW X5", make: "BMW", stock: "LUX-2024-007", price: "$68,900", status: "service" },
  ]

  const recentActivity = [
    { action: "New vehicle added", details: "2024 Tesla Model 3", time: "5 min ago" },
    { action: "Vehicle sold", details: "2023 Toyota Camry", time: "1 hour ago" },
    { action: "Service completed", details: "Oil change - Honda Accord", time: "2 hours ago" },
  ]

  const filteredVehicles = vehicles.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       v.stock.toLowerCase().includes(searchQuery.toLowerCase())
    const matchMake = filterMake === "all" || v.make === filterMake
    const matchStatus = filterStatus === "all" || v.status === filterStatus
    return matchSearch && matchMake && matchStatus
  })

  const getStatusBadge = (status) => {
    const config = {
      available: { variant: "default", icon: CheckCircle, label: "Available", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      reserved: { variant: "secondary", icon: Clock, label: "Reserved", className: "bg-gray-800 text-gray-300 border-gray-700" },
      service: { variant: "destructive", icon: AlertCircle, label: "In Service", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    }[status] || { variant: "outline", icon: Activity, label: status, className: "bg-gray-800 text-gray-400 border-gray-700" }
    
    const Icon = config.icon
    return (
      <Badge className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.label}
                </CardTitle>
                <Icon className="h-5 w-5 text-[#D4FF00]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-[#D4FF00] font-medium">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Vehicle Inventory */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Vehicle Inventory</CardTitle>
              <Button size="sm" className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold" onClick={() => onNavigate && onNavigate('add-vehicle')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Filters */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Select value={filterMake} onValueChange={setFilterMake}>
                <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Makes</SelectItem>
                  <SelectItem value="Tesla" className="text-white hover:bg-gray-700">Tesla</SelectItem>
                  <SelectItem value="Toyota" className="text-white hover:bg-gray-700">Toyota</SelectItem>
                  <SelectItem value="Ford" className="text-white hover:bg-gray-700">Ford</SelectItem>
                  <SelectItem value="Honda" className="text-white hover:bg-gray-700">Honda</SelectItem>
                  <SelectItem value="BMW" className="text-white hover:bg-gray-700">BMW</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
                  <SelectItem value="available" className="text-white hover:bg-gray-700">Available</SelectItem>
                  <SelectItem value="reserved" className="text-white hover:bg-gray-700">Reserved</SelectItem>
                  <SelectItem value="service" className="text-white hover:bg-gray-700">In Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400">Vehicle</TableHead>
                    <TableHead className="text-gray-400">Stock #</TableHead>
                    <TableHead className="text-gray-400">Price</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-right text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.length === 0 ? (
                    <TableRow className="border-gray-800">
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No vehicles found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell className="font-medium text-white">{vehicle.name}</TableCell>
                        <TableCell className="font-mono text-sm text-gray-400">{vehicle.stock}</TableCell>
                        <TableCell className="font-semibold text-white">{vehicle.price}</TableCell>
                        <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-red-500 text-gray-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Activity & Service Intake */}
        <div className="space-y-4">
          {/* Service Intake Quick Access */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#D4FF00]" />
                Service Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Start a new service request for a customer
                </p>
                <Button 
                  className="w-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                  onClick={() => onNavigate && onNavigate('service-intake')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Service Request
                </Button>
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Today's Requests</span>
                    <span className="font-semibold text-[#D4FF00]">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">Pending</span>
                    <span className="font-semibold text-yellow-500">5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">Completed</span>
                    <span className="font-semibold text-green-500">7</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 last:pb-0 border-b border-gray-800 last:border-0">
                  <div className="rounded-full bg-[#D4FF00]/20 p-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#D4FF00]" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-800 hover:text-[#D4FF00]">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
