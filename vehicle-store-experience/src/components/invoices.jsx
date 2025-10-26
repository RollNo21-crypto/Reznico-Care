import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign
} from "lucide-react"

export function Invoices() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample invoice data
  const invoices = [
    { id: 1, invoiceNo: "INV-2024-001", customer: "John Smith", date: "2024-01-15", amount: "$450.00", status: "paid", vehicle: "Tesla Model 3" },
    { id: 2, invoiceNo: "INV-2024-002", customer: "Sarah Johnson", date: "2024-01-16", amount: "$680.50", status: "pending", vehicle: "Toyota Camry" },
    { id: 3, invoiceNo: "INV-2024-003", customer: "Mike Davis", date: "2024-01-17", amount: "$125.00", status: "paid", vehicle: "Ford F-150" },
    { id: 4, invoiceNo: "INV-2024-004", customer: "Emily Brown", date: "2024-01-18", amount: "$1,250.00", status: "overdue", vehicle: "Honda CR-V" },
    { id: 5, invoiceNo: "INV-2024-005", customer: "David Wilson", date: "2024-01-19", amount: "$890.00", status: "pending", vehicle: "BMW X5" },
    { id: 6, invoiceNo: "INV-2024-006", customer: "Lisa Anderson", date: "2024-01-20", amount: "$320.00", status: "paid", vehicle: "Audi A4" },
    { id: 7, invoiceNo: "INV-2024-007", customer: "Tom Martinez", date: "2024-01-21", amount: "$550.00", status: "pending", vehicle: "Mercedes C-Class" },
  ]

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === "paid").length,
    pending: invoices.filter(i => i.status === "pending").length,
    overdue: invoices.filter(i => i.status === "overdue").length,
    totalRevenue: "$4,265.50"
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchSearch = invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchSearch && matchStatus
  })

  const getStatusBadge = (status) => {
    const config = {
      paid: { icon: CheckCircle, label: "Paid", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      pending: { icon: Clock, label: "Pending", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      overdue: { icon: XCircle, label: "Overdue", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    }[status]
    
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="h-8 w-8 text-[#D4FF00]" />
            Invoices & Billing
          </h1>
          <p className="text-gray-400 mt-1">Manage customer invoices and payments</p>
        </div>
        <Button className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Invoices</CardTitle>
            <FileText className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Paid</CardTitle>
            <CheckCircle className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#D4FF00]">{stats.paid}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
            <Clock className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Overdue</CardTitle>
            <XCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{stats.overdue}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D4FF00]">{stats.totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">All Invoices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by invoice # or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
                <SelectItem value="paid" className="text-white hover:bg-gray-700">Paid</SelectItem>
                <SelectItem value="pending" className="text-white hover:bg-gray-700">Pending</SelectItem>
                <SelectItem value="overdue" className="text-white hover:bg-gray-700">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Invoice #</TableHead>
                  <TableHead className="text-gray-400">Customer</TableHead>
                  <TableHead className="text-gray-400">Vehicle</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow className="border-gray-800">
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-mono text-sm text-white">{invoice.invoiceNo}</TableCell>
                      <TableCell className="font-medium text-white">{invoice.customer}</TableCell>
                      <TableCell className="text-gray-400">{invoice.vehicle}</TableCell>
                      <TableCell className="text-gray-400">{invoice.date}</TableCell>
                      <TableCell className="font-semibold text-white">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status !== "paid" && (
                            <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
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
