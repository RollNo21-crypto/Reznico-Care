import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Edit, Trash2, Users, Mail, Phone } from "lucide-react"

export function AllCustomers({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("")

  const customers = [
    { id: 1, name: "John Smith", email: "john.smith@email.com", phone: "+1 (555) 123-4567", vehicle: "2024 Tesla Model 3", services: 3, totalSpent: "$2,450", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 (555) 234-5678", vehicle: "2023 Toyota Camry", services: 5, totalSpent: "$1,800", status: "active" },
    { id: 3, name: "Michael Brown", email: "m.brown@email.com", phone: "+1 (555) 345-6789", vehicle: "2024 Ford F-150", services: 2, totalSpent: "$3,200", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily.davis@email.com", phone: "+1 (555) 456-7890", vehicle: "2023 Honda CR-V", services: 7, totalSpent: "$4,100", status: "vip" },
    { id: 5, name: "David Wilson", email: "d.wilson@email.com", phone: "+1 (555) 567-8901", vehicle: "2024 BMW X5", services: 1, totalSpent: "$950", status: "active" },
    { id: 6, name: "Lisa Anderson", email: "lisa.a@email.com", phone: "+1 (555) 678-9012", vehicle: "2023 Chevrolet Silverado", services: 4, totalSpent: "$2,800", status: "active" },
  ]

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  )

  const getStatusBadge = (status) => {
    const config = {
      active: { className: "bg-green-500/20 text-green-400 border-green-500/30", label: "Active" },
      vip: { className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30", label: "VIP" },
      inactive: { className: "bg-gray-800 text-gray-400 border-gray-700", label: "Inactive" },
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
          <h1 className="text-3xl font-bold text-white">All Customers</h1>
          <p className="text-gray-400 mt-1">Manage your customer database</p>
        </div>
        <Button 
          onClick={() => onNavigate && onNavigate('customer-onboarding')}
          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{customers.length}</div>
            <p className="text-xs text-gray-400">Total Customers</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{customers.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-gray-400">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#D4FF00]">{customers.filter(c => c.status === 'vip').length}</div>
            <p className="text-xs text-gray-400">VIP Customers</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              ${customers.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[$,]/g, '')), 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-[#D4FF00]" />
            Customer Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers by name, email, or phone..."
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
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Vehicle</TableHead>
                  <TableHead className="text-gray-400">Services</TableHead>
                  <TableHead className="text-gray-400">Total Spent</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow className="border-gray-800">
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white">
                        {customer.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{customer.vehicle}</TableCell>
                      <TableCell className="text-gray-300">{customer.services}</TableCell>
                      <TableCell className="font-semibold text-white">{customer.totalSpent}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
