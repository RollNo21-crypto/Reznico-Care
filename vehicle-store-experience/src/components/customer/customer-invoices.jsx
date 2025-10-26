import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CustomerLayout from '@/components/customer/customer-layout'
import { 
  FileText, 
  Download, 
  Search,
  Filter,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react'

export function CustomerInvoices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample invoices data
  const invoices = [
    { 
      id: 'INV-2024-001', 
      date: '2024-01-15', 
      amount: 45.99, 
      status: 'Paid',
      service: 'Oil Change',
      dueDate: '2024-01-30',
      paymentMethod: 'Credit Card',
      items: [
        { description: 'Full Synthetic Oil Change', quantity: 1, price: 35.99 },
        { description: 'Oil Filter', quantity: 1, price: 10.00 }
      ]
    },
    { 
      id: 'INV-2024-002', 
      date: '2024-01-20', 
      amount: 89.99, 
      status: 'Paid',
      service: 'Brake Inspection',
      dueDate: '2024-02-04',
      paymentMethod: 'Debit Card',
      items: [
        { description: 'Brake Pad Replacement', quantity: 1, price: 65.99 },
        { description: 'Labor', quantity: 1, price: 24.00 }
      ]
    },
    { 
      id: 'INV-2024-003', 
      date: '2024-02-01', 
      amount: 35.00, 
      status: 'Pending',
      service: 'Tire Rotation',
      dueDate: '2024-02-15',
      paymentMethod: null,
      items: [
        { description: 'Tire Rotation Service', quantity: 1, price: 35.00 }
      ]
    },
    { 
      id: 'INV-2024-004', 
      date: '2024-01-05', 
      amount: 125.00, 
      status: 'Overdue',
      service: 'Engine Diagnostic',
      dueDate: '2024-01-20',
      paymentMethod: null,
      items: [
        { description: 'Diagnostic Scan', quantity: 1, price: 85.00 },
        { description: 'Report Generation', quantity: 1, price: 40.00 }
      ]
    },
  ]

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
      case 'pending':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Pending</Badge>
      case 'overdue':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-400" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = invoices.filter(inv => inv.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = invoices.filter(inv => inv.status !== 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="px-4 py-6 pb-20">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] rounded-2xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Invoices</h1>
                <p className="text-gray-400">Manage your billing history</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 text-[#D4FF00] mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">${totalAmount.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">Total</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">${paidAmount.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">Paid</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">${pendingAmount.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white rounded-2xl h-12"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { key: 'all', label: 'All Invoices' },
                  { key: 'paid', label: 'Paid' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'overdue', label: 'Overdue' }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={filterStatus === filter.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(filter.key)}
                    className={filterStatus === filter.key 
                      ? 'bg-[#D4FF00] text-black hover:bg-[#C4EF00] rounded-2xl whitespace-nowrap'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-800 rounded-2xl whitespace-nowrap'
                    }
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Invoices List */}
          <div className="space-y-4">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          {getStatusIcon(invoice.status)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{invoice.id}</h3>
                          <p className="text-sm text-gray-400">{invoice.service}</p>
                        </div>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-800/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Invoice Date</span>
                        </div>
                        <p className="text-white font-medium">{invoice.date}</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Due Date</span>
                        </div>
                        <p className="text-white font-medium">{invoice.dueDate}</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 rounded-xl p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Invoice Items</h4>
                      <div className="space-y-2">
                        {invoice.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <p className="text-white text-sm">{item.description}</p>
                              <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-white font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Payment Method</p>
                        <p className="text-white font-medium">
                          {invoice.paymentMethod || 'Not paid'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p className="text-2xl font-bold text-[#D4FF00]">${invoice.amount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-2xl"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {invoice.status !== 'Paid' && (
                        <Button 
                          size="sm" 
                          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black rounded-2xl"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Invoices Found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'You don\'t have any invoices yet'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}