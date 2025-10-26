import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Edit, Trash2, Car, Filter } from "lucide-react"

export function AllVehicles({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMake, setFilterMake] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const vehicles = [
    { id: 1, name: "2024 Tesla Model 3", make: "Tesla", model: "Model 3", year: "2024", stock: "EV-2024-001", price: "$42,990", status: "available", mileage: "0 mi" },
    { id: 2, name: "2023 Toyota Camry", make: "Toyota", model: "Camry", year: "2023", stock: "SD-2023-045", price: "$28,500", status: "reserved", mileage: "12,450 mi" },
    { id: 3, name: "2024 Ford F-150", make: "Ford", model: "F-150", year: "2024", stock: "TR-2024-012", price: "$55,200", status: "available", mileage: "0 mi" },
    { id: 4, name: "2023 Honda CR-V", make: "Honda", model: "CR-V", year: "2023", stock: "SUV-2023-089", price: "$32,750", status: "available", mileage: "8,200 mi" },
    { id: 5, name: "2024 BMW X5", make: "BMW", model: "X5", year: "2024", stock: "LUX-2024-007", price: "$68,900", status: "service", mileage: "1,200 mi" },
    { id: 6, name: "2023 Chevrolet Silverado", make: "Chevrolet", model: "Silverado", year: "2023", stock: "TR-2023-034", price: "$48,500", status: "available", mileage: "15,000 mi" },
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
      available: { className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30", label: "Available" },
      reserved: { className: "bg-gray-800 text-gray-300 border-gray-700", label: "Reserved" },
      service: { className: "bg-red-500/20 text-red-400 border-red-500/30", label: "In Service" },
    }[status] || { className: "bg-gray-800 text-gray-400 border-gray-700", label: status }
    
    return (
      <Badge className={`gap-1 ${config.className}`}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Vehicles</h1>
          <p className="text-gray-400 mt-1">Manage your vehicle inventory</p>
        </div>
        <Button 
          onClick={() => onNavigate && onNavigate('add-vehicle')}
          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Vehicle
        </Button>
      </div>

      {/* Filters and Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{vehicles.length}</div>
            <p className="text-xs text-gray-400">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#D4FF00]">{vehicles.filter(v => v.status === 'available').length}</div>
            <p className="text-xs text-gray-400">Available</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-500">{vehicles.filter(v => v.status === 'reserved').length}</div>
            <p className="text-xs text-gray-400">Reserved</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-500">{vehicles.filter(v => v.status === 'service').length}</div>
            <p className="text-xs text-gray-400">In Service</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Car className="h-5 w-5 text-[#D4FF00]" />
            Vehicle Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search vehicles or stock number..."
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
                <SelectItem value="Chevrolet" className="text-white hover:bg-gray-700">Chevrolet</SelectItem>
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
                  <TableHead className="text-gray-400">Year</TableHead>
                  <TableHead className="text-gray-400">Mileage</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length === 0 ? (
                  <TableRow className="border-gray-800">
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No vehicles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white">
                        <div>
                          <div>{vehicle.make} {vehicle.model}</div>
                          <div className="text-xs text-gray-400">{vehicle.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-gray-400">{vehicle.stock}</TableCell>
                      <TableCell className="text-gray-300">{vehicle.year}</TableCell>
                      <TableCell className="text-gray-300">{vehicle.mileage}</TableCell>
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
    </div>
  )
}
