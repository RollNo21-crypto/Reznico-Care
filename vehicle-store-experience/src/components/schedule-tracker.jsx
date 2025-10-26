import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Clock,
  User,
  Car,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  Phone,
  Plus
} from "lucide-react"

export function ScheduleTracker({ onNavigate }) {
  const { user } = useUser()
  const employeeName = user?.fullName || user?.firstName || "Employee"
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filterStatus, setFilterStatus] = useState("all") // all, pending, completed

  // Sample schedule data for the employee
  const scheduleData = [
    {
      id: 1,
      time: "9:00 AM",
      duration: "30 min",
      customer: "John Smith",
      phone: "(555) 123-4567",
      vehicle: "2024 Tesla Model 3",
      service: "Oil Change",
      location: "Bay 1",
      status: "completed",
      priority: "normal",
      date: new Date().toDateString()
    },
    {
      id: 2,
      time: "10:00 AM",
      duration: "1 hour",
      customer: "Sarah Johnson",
      phone: "(555) 234-5678",
      vehicle: "2023 Toyota Camry",
      service: "Brake Inspection",
      location: "Bay 2",
      status: "in-progress",
      priority: "high",
      date: new Date().toDateString()
    },
    {
      id: 3,
      time: "11:30 AM",
      duration: "45 min",
      customer: "Mike Davis",
      phone: "(555) 345-6789",
      vehicle: "2024 Ford F-150",
      service: "Tire Rotation",
      location: "Bay 1",
      status: "pending",
      priority: "normal",
      date: new Date().toDateString()
    },
    {
      id: 4,
      time: "1:00 PM",
      duration: "2 hours",
      customer: "Emily Brown",
      phone: "(555) 456-7890",
      vehicle: "2023 Honda CR-V",
      service: "Full Service",
      location: "Bay 3",
      status: "pending",
      priority: "normal",
      date: new Date().toDateString()
    },
    {
      id: 5,
      time: "3:30 PM",
      duration: "1.5 hours",
      customer: "David Wilson",
      phone: "(555) 567-8901",
      vehicle: "2024 BMW X5",
      service: "Engine Diagnostic",
      location: "Bay 2",
      status: "pending",
      priority: "high",
      date: new Date().toDateString()
    },
  ]

  // Filter appointments
  const filteredAppointments = scheduleData.filter(appointment => {
    if (filterStatus === "all") return true
    return appointment.status === filterStatus
  })

  // Calculate stats
  const stats = {
    total: scheduleData.length,
    completed: scheduleData.filter(a => a.status === "completed").length,
    inProgress: scheduleData.filter(a => a.status === "in-progress").length,
    pending: scheduleData.filter(a => a.status === "pending").length,
  }

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: Clock, label: "Pending", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      "in-progress": { icon: AlertCircle, label: "In Progress", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      completed: { icon: CheckCircle, label: "Completed", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
    }[status]
    
    const Icon = config.icon
    return (
      <Badge className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    if (priority === "high") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">High Priority</Badge>
    }
    return null
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    // Navigate by day
    newDate.setDate(newDate.getDate() + direction)
    setCurrentDate(newDate)
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="h-8 w-8 text-[#D4FF00]" />
            My Schedule
          </h1>
          <p className="text-gray-400 mt-1">Manage your appointments and tasks, {employeeName}</p>
        </div>
        <Button 
          onClick={() => onNavigate && onNavigate('service-intake')}
          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Today</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-[#D4FF00]">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#D4FF00]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Navigation & Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate(-1)}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center min-w-[200px]">
                <p className="text-lg font-semibold text-white">{formatDate(currentDate)}</p>
                <p className="text-xs text-gray-500">
                  {currentDate.toDateString() === new Date().toDateString() ? "Today" : ""}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate(1)}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              >
                Today
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "bg-[#D4FF00] text-black hover:bg-[#C4EF00]" : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
                className={filterStatus === "pending" ? "bg-[#D4FF00] text-black hover:bg-[#C4EF00]" : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className={filterStatus === "completed" ? "bg-[#D4FF00] text-black hover:bg-[#C4EF00]" : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">No appointments for this filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="bg-gray-800 border-gray-700 hover:border-[#D4FF00]/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Time & Duration */}
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center min-w-[80px] p-3 bg-gray-900 rounded-lg border border-gray-700">
                          <Clock className="h-5 w-5 text-[#D4FF00] mb-1" />
                          <span className="text-lg font-bold text-white">{appointment.time}</span>
                          <span className="text-xs text-gray-500">{appointment.duration}</span>
                        </div>

                        {/* Appointment Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{appointment.service}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusBadge(appointment.status)}
                                {getPriorityBadge(appointment.priority)}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-400">Customer:</span>
                              <span className="text-white font-medium">{appointment.customer}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-400">{appointment.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Car className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-400">Vehicle:</span>
                              <span className="text-white">{appointment.vehicle}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-400">Location:</span>
                              <span className="text-white">{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        {appointment.status === "pending" && (
                          <Button 
                            className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                            size="sm"
                          >
                            Start Service
                          </Button>
                        )}
                        {appointment.status === "in-progress" && (
                          <Button 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                            size="sm"
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          size="sm"
                          className="bg-gray-900 border-gray-700 hover:bg-gray-800 text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
