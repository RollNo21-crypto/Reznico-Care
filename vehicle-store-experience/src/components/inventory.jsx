import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Package,
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Edit,
  ShoppingCart,
  Filter,
  Bell,
  Truck,
  DollarSign,
  Clock,
  RefreshCw,
  Eye,
  Settings,
  BarChart3,
  Zap
} from "lucide-react"
import partsService from "../services/parts-service"

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStock, setFilterStock] = useState("all")
  const [inventoryData, setInventoryData] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [selectedPart, setSelectedPart] = useState(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Load data on component mount and set up real-time updates
  useEffect(() => {
    loadInventoryData()
    loadNotifications()
    loadOrderHistory()

    // Set up real-time updates
    const interval = setInterval(() => {
      loadInventoryData()
      loadNotifications()
      setLastUpdate(new Date())
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const loadInventoryData = () => {
    const data = partsService.getInventoryStatus()
    setInventoryData(data)
  }

  const loadNotifications = () => {
    const notifs = partsService.getNotifications()
    setNotifications(notifs)
  }

  const loadOrderHistory = () => {
    const orders = partsService.getOrderHistory()
    setOrderHistory(orders)
  }

  const inventoryItems = inventoryData?.items || []

  const stats = inventoryData ? {
    totalItems: inventoryData.totalItems,
    lowStock: inventoryData.lowStock,
    critical: inventoryData.critical,
    outOfStock: inventoryData.outOfStock,
    totalValue: `₹${inventoryData.totalValue.toLocaleString()}`
  } : {
    totalItems: 0,
    lowStock: 0,
    critical: 0,
    outOfStock: 0,
    totalValue: "₹0"
  }

  // Handle part ordering
  const handleOrderPart = async (partId) => {
    const part = inventoryItems.find(p => p.id === partId)
    if (part) {
      setSelectedPart(part)
      setOrderQuantity("")
      setSelectedSupplier("")
      setShowOrderDialog(true)
    }
  }

  const submitOrder = async () => {
    if (!selectedPart || !orderQuantity || !selectedSupplier) return

    try {
      await partsService.placeOrder(selectedPart.id, parseInt(orderQuantity), selectedSupplier)
      setShowOrderDialog(false)
      loadOrderHistory()
      loadNotifications()
    } catch (error) {
      console.error('Order failed:', error)
    }
  }

  const handleReceiveOrder = async (orderId) => {
    const success = partsService.receiveOrder(orderId)
    if (success) {
      loadInventoryData()
      loadOrderHistory()
      loadNotifications()
    }
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  const filteredItems = inventoryItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = filterCategory === "all" || item.category === filterCategory
    const matchStock = filterStatus === "all" || item.status === filterStatus
    return matchSearch && matchCategory && matchStock
  })

  const getStockBadge = (status) => {
    const config = {
      "in-stock": { icon: CheckCircle, label: "In Stock", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      "low-stock": { icon: AlertCircle, label: "Low Stock", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      "critical": { icon: TrendingDown, label: "Critical", className: "bg-red-500/20 text-red-400 border-red-500/30" },
      "out-of-stock": { icon: AlertCircle, label: "Out of Stock", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    }[status]
    
    const Icon = config?.icon || AlertCircle
    return (
      <Badge className={`gap-1 ${config?.className || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
        <Icon className="h-3 w-3" />
        {config?.label || "Unknown"}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="h-8 w-8 text-[#D4FF00]" />
            Live Inventory Management
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
              <Zap className="h-3 w-3" />
              Live
            </Badge>
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time parts tracking with automated reordering • Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowNotifications(!showNotifications)}
            className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 relative"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Items</CardTitle>
            <Package className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalItems}</div>
            <p className="text-xs text-gray-500 mt-1">Active SKUs</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Low Stock</CardTitle>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{stats.lowStock}</div>
            <p className="text-xs text-gray-500 mt-1">Needs reorder soon</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Critical</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{stats.critical}</div>
            <p className="text-xs text-gray-500 mt-1">Urgent reorder</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Out of Stock</CardTitle>
            <AlertCircle className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-400">{stats.outOfStock}</div>
            <p className="text-xs text-gray-500 mt-1">Unavailable</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Value</CardTitle>
            <DollarSign className="h-5 w-5 text-[#D4FF00]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#D4FF00]">{stats.totalValue}</div>
            <p className="text-xs text-gray-500 mt-1">Inventory worth</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">Inventory Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or part number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Categories</SelectItem>
                <SelectItem value="Fluids" className="text-white hover:bg-gray-700">Fluids</SelectItem>
                <SelectItem value="Brakes" className="text-white hover:bg-gray-700">Brakes</SelectItem>
                <SelectItem value="Filters" className="text-white hover:bg-gray-700">Filters</SelectItem>
                <SelectItem value="Ignition" className="text-white hover:bg-gray-700">Ignition</SelectItem>
                <SelectItem value="Electrical" className="text-white hover:bg-gray-700">Electrical</SelectItem>
                <SelectItem value="Accessories" className="text-white hover:bg-gray-700">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
                <SelectItem value="in-stock" className="text-white hover:bg-gray-700">In Stock</SelectItem>
                <SelectItem value="low-stock" className="text-white hover:bg-gray-700">Low Stock</SelectItem>
                <SelectItem value="critical" className="text-white hover:bg-gray-700">Critical</SelectItem>
                <SelectItem value="out-of-stock" className="text-white hover:bg-gray-700">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={loadInventoryData}
              className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Item</TableHead>
                  <TableHead className="text-gray-400">Part Number</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Stock</TableHead>
                  <TableHead className="text-gray-400">Min Stock</TableHead>
                  <TableHead className="text-gray-400">Live Price</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow className="border-gray-800">
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white">
                        <div>
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Compatible: {item.compatibility.join(', ')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-gray-400">{item.partNumber}</TableCell>
                      <TableCell className="text-gray-400">{item.category}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          item.currentStock < item.minStock ? 'text-red-400' : 'text-white'
                        }`}>
                          {item.currentStock} {item.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">{item.minStock}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {item.prices && item.prices.length > 0 ? (
                            <>
                              <div className="font-semibold text-[#D4FF00]">
                                ₹{item.prices[0].price}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.prices[0].supplierName}
                              </div>
                            </>
                          ) : (
                            <div className="font-semibold text-white">₹{item.avgCost}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStockBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400"
                            onClick={() => {
                              setSelectedPart(item)
                              setShowAnalytics(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400"
                            onClick={() => handleOrderPart(item.id)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Order
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

      {/* Order Part Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Order Part</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{selectedPart.name}</h3>
                <p className="text-sm text-gray-400">Part Number: {selectedPart.partNumber}</p>
                <p className="text-sm text-gray-400">Current Stock: {selectedPart.currentStock} {selectedPart.unit}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Order</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Select Supplier</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Choose supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {selectedPart.prices?.map((price, index) => (
                      <SelectItem key={index} value={price.supplierId} className="text-white hover:bg-gray-700">
                        {price.supplierName} - ₹{price.price} ({price.leadTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={submitOrder} className="bg-[#D4FF00] text-black hover:bg-[#B8E000]">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Part Analytics</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPart.name}</h3>
                  <p className="text-sm text-gray-400">Part Number: {selectedPart.partNumber}</p>
                  <p className="text-sm text-gray-400">Category: {selectedPart.category}</p>
                </div>
                <div className="text-right">
                  {getStockBadge(selectedPart.status)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Current Stock</div>
                  <div className="text-xl font-bold">{selectedPart.currentStock} {selectedPart.unit}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Min Stock</div>
                  <div className="text-xl font-bold">{selectedPart.minStock}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Avg Cost</div>
                  <div className="text-xl font-bold">₹{selectedPart.avgCost}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Supplier Pricing</h4>
                <div className="space-y-2">
                  {selectedPart.prices?.map((price, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                      <div>
                        <div className="font-medium">{price.supplierName}</div>
                        <div className="text-sm text-gray-400">Lead Time: {price.leadTime}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#D4FF00]">₹{price.price}</div>
                        <div className="text-xs text-gray-400">Last Updated: {price.lastUpdated}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Compatibility</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPart.compatibility?.map((vehicle, index) => (
                    <span key={index} className="bg-gray-800 px-2 py-1 rounded text-sm">
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Inventory Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                notification.type === 'critical' ? 'bg-red-900/20 border-red-500' :
                notification.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500' :
                'bg-blue-900/20 border-blue-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-400">{notification.message}</div>
                  </div>
                  <div className="text-xs text-gray-500">{notification.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
