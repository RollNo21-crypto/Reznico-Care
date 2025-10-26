import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Package,
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Edit,
  ShoppingCart,
  Filter
} from "lucide-react"

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStock, setFilterStock] = useState("all")

  // Sample inventory data
  const inventoryItems = [
    { id: 1, name: "Engine Oil (5W-30)", sku: "OIL-5W30-001", category: "Fluids", quantity: 48, minStock: 20, unit: "Quarts", price: "$8.99", supplier: "AutoParts Inc", status: "in-stock" },
    { id: 2, name: "Brake Pads (Front)", sku: "BP-FRONT-002", category: "Brakes", quantity: 15, minStock: 10, unit: "Sets", price: "$45.99", supplier: "Brake Masters", status: "in-stock" },
    { id: 3, name: "Air Filter", sku: "AF-STD-003", category: "Filters", quantity: 8, minStock: 15, unit: "Units", price: "$12.99", supplier: "FilterPro", status: "low-stock" },
    { id: 4, name: "Transmission Fluid", sku: "TF-ATF-004", category: "Fluids", quantity: 2, minStock: 12, unit: "Quarts", price: "$15.99", supplier: "AutoParts Inc", status: "critical" },
    { id: 5, name: "Spark Plugs (Set of 4)", sku: "SP-SET4-005", category: "Ignition", quantity: 25, minStock: 10, unit: "Sets", price: "$24.99", supplier: "Ignition Plus", status: "in-stock" },
    { id: 6, name: "Wiper Blades", sku: "WB-24IN-006", category: "Accessories", quantity: 12, minStock: 8, unit: "Pairs", price: "$18.99", supplier: "VisionClear", status: "in-stock" },
    { id: 7, name: "Coolant", sku: "COL-UNI-007", category: "Fluids", quantity: 5, minStock: 10, unit: "Gallons", price: "$22.99", supplier: "AutoParts Inc", status: "low-stock" },
    { id: 8, name: "Battery (12V)", sku: "BAT-12V-008", category: "Electrical", quantity: 6, minStock: 5, unit: "Units", price: "$129.99", supplier: "PowerCell", status: "in-stock" },
  ]

  const stats = {
    totalItems: inventoryItems.length,
    lowStock: inventoryItems.filter(i => i.status === "low-stock").length,
    critical: inventoryItems.filter(i => i.status === "critical").length,
    totalValue: "$12,458"
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = filterCategory === "all" || item.category === filterCategory
    const matchStock = filterStock === "all" || item.status === filterStock
    return matchSearch && matchCategory && matchStock
  })

  const getStockBadge = (status) => {
    const config = {
      "in-stock": { icon: CheckCircle, label: "In Stock", className: "bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/30" },
      "low-stock": { icon: AlertCircle, label: "Low Stock", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      "critical": { icon: TrendingDown, label: "Critical", className: "bg-red-500/20 text-red-400 border-red-500/30" },
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
            <Package className="h-8 w-8 text-[#D4FF00]" />
            Inventory Management
          </h1>
          <p className="text-gray-400 mt-1">Track parts, supplies, and stock levels</p>
        </div>
        <Button className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
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
            <CardTitle className="text-sm font-medium text-gray-400">Total Value</CardTitle>
            <ShoppingCart className="h-5 w-5 text-[#D4FF00]" />
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
                placeholder="Search by name or SKU..."
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
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Item</TableHead>
                  <TableHead className="text-gray-400">SKU</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Quantity</TableHead>
                  <TableHead className="text-gray-400">Min Stock</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
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
                      <TableCell className="font-medium text-white">{item.name}</TableCell>
                      <TableCell className="font-mono text-sm text-gray-400">{item.sku}</TableCell>
                      <TableCell className="text-gray-400">{item.category}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          item.quantity < item.minStock ? 'text-red-400' : 'text-white'
                        }`}>
                          {item.quantity} {item.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">{item.minStock}</TableCell>
                      <TableCell className="font-semibold text-white">{item.price}</TableCell>
                      <TableCell>{getStockBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-gray-800 hover:text-[#D4FF00] text-gray-400"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Reorder
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
