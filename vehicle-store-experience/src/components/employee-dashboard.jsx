import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus,
  Users,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Car,
  Calendar,
  Activity,
  ArrowUpRight,
  Eye,
  Edit
} from "lucide-react"

export function EmployeeDashboard({ onNavigate }) {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")

  // Get employee name from Clerk
  const employeeName = user?.fullName || user?.firstName || "Employee"

  // Sample data - Employee-focused stats (personalized)
  const stats = [
    { label: "My Tasks Today", value: "12", change: "+3 new", icon: ClipboardList, trend: "up" },
    { label: "My Active Services", value: "8", change: "5 pending", icon: Clock, trend: "neutral" },
    { label: "Customers I Served", value: "24", change: "Today", icon: Users, trend: "up" },
    { label: "My Completed Tasks", value: "16", change: "This week", icon: CheckCircle, trend: "up" },
  ]

  // Today's service requests assigned to this employee
  const serviceRequests = [
    { id: 1, customer: "John Smith", vehicle: "2024 Tesla Model 3", service: "Oil Change", status: "pending", time: "9:00 AM", priority: "normal", assignedTo: employeeName },
    { id: 2, customer: "Sarah Johnson", vehicle: "2023 Toyota Camry", service: "Brake Inspection", status: "in-progress", time: "10:30 AM", priority: "high", assignedTo: employeeName },
    { id: 3, customer: "Mike Davis", vehicle: "2024 Ford F-150", service: "Tire Rotation", status: "completed", time: "11:00 AM", priority: "normal", assignedTo: employeeName },
    { id: 4, customer: "Emily Brown", vehicle: "2023 Honda CR-V", service: "Full Service", status: "pending", time: "1:00 PM", priority: "normal", assignedTo: employeeName },
    { id: 5, customer: "David Wilson", vehicle: "2024 BMW X5", service: "Engine Diagnostic", status: "in-progress", time: "2:00 PM", priority: "high", assignedTo: employeeName },
  ]

  // Recent customers served by this employee
  const recentCustomers = [
    { name: "John Smith", phone: "(555) 123-4567", vehicle: "Tesla Model 3", lastVisit: "Today", servedBy: employeeName },
    { name: "Sarah Johnson", phone: "(555) 234-5678", vehicle: "Toyota Camry", lastVisit: "Today", servedBy: employeeName },
    { name: "Mike Davis", phone: "(555) 345-6789", vehicle: "Ford F-150", lastVisit: "Yesterday", servedBy: employeeName },
  ]

  // Quick actions data
  const quickActions = [
    { label: "New Service Request", icon: ClipboardList, view: "service-intake", color: "lime" },
    { label: "Add Customer", icon: UserPlus, view: "customer-onboarding", color: "blue" },
    { label: "View Vehicles", icon: Car, view: "all-vehicles", color: "purple" },
    { label: "My Schedule", icon: Calendar, view: "schedule", color: "orange" },
  ]

  const filteredRequests = serviceRequests.filter(r => {
    const matchSearch = r.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       r.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       r.service.toLowerCase().includes(searchQuery.toLowerCase())
    return matchSearch
  })

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: Clock, label: "Pending", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      "in-progress": { icon: Activity, label: "In Progress", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      completed: { icon: CheckCircle, label: "Completed", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
    }[status] || { icon: AlertCircle, label: status, className: "bg-gray-800 text-gray-400 border-gray-700" }
    
    const Icon = config.icon
    return (
      <Badge className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    const config = {
      high: { label: "High", className: "bg-red-500/20 text-red-400 border-red-500/30" },
      normal: { label: "Normal", className: "bg-gray-800 text-gray-400 border-gray-700" },
    }[priority] || { label: priority, className: "bg-gray-800 text-gray-400 border-gray-700" }
    
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome Back, {employeeName}! 👋</h1>
          <p className="text-gray-400 mt-1">Here's your activity for today</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-semibold text-[#D4FF00]">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

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
                  <span className="text-gray-400">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon
              return (
                <Button
                  key={i}
                  onClick={() => onNavigate && onNavigate(action.view)}
                  className="h-auto flex-col gap-2 p-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-[#D4FF00]"
                  variant="outline"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#D4FF00]" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Today's Service Requests */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">My Service Requests Today</CardTitle>
              <Button 
                size="sm" 
                className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                onClick={() => onNavigate && onNavigate('service-intake')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400">Customer</TableHead>
                    <TableHead className="text-gray-400">Vehicle</TableHead>
                    <TableHead className="text-gray-400">Service</TableHead>
                    <TableHead className="text-gray-400">Time</TableHead>
                    <TableHead className="text-gray-400">Priority</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-right text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow className="border-gray-800">
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No service requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell className="font-medium text-white">{request.customer}</TableCell>
                        <TableCell className="text-sm text-gray-400">{request.vehicle}</TableCell>
                        <TableCell className="text-white">{request.service}</TableCell>
                        <TableCell className="font-mono text-sm text-gray-400">{request.time}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                              <Edit className="h-4 w-4" />
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

        {/* Right Column - Recent Customers & Performance */}
        <div className="space-y-4">
          {/* Recent Customers */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">My Recent Customers</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#D4FF00] hover:text-[#C4EF00] hover:bg-gray-800"
                  onClick={() => onNavigate && onNavigate('all-customers')}
                >
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCustomers.map((customer, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 last:pb-0 border-b border-gray-800 last:border-0">
                    <div className="rounded-full bg-[#D4FF00]/20 p-2">
                      <Users className="h-4 w-4 text-[#D4FF00]" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium text-white">{customer.name}</p>
                      <p className="text-xs text-gray-400">{customer.vehicle}</p>
                      <p className="text-xs text-gray-500">{customer.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{customer.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                variant="outline"
                onClick={() => onNavigate && onNavigate('customer-onboarding')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Customer
              </Button>
            </CardContent>
          </Card>

          {/* Today's Summary */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">My Performance Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#D4FF00]" />
                    <span className="text-sm text-gray-400">Completed</span>
                  </div>
                  <span className="text-xl font-bold text-[#D4FF00]">3</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-gray-400">In Progress</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">2</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-gray-400">Pending</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-400">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
