// Parts Service - Live Integration System
// Handles real-time inventory tracking, supplier integration, and parts management

class PartsService {
  constructor() {
    this.suppliers = new Map()
    this.inventory = new Map()
    this.priceCache = new Map()
    this.orderHistory = []
    this.usageTracking = []
    this.reorderRules = new Map()
    this.notifications = []
    
    // Initialize with mock data
    this.initializeMockData()
    
    // Start real-time updates
    this.startRealTimeUpdates()
  }

  // Initialize mock suppliers and inventory
  initializeMockData() {
    // Suppliers
    const suppliers = [
      {
        id: 'supplier-1',
        name: 'NAPA Auto Parts',
        apiEndpoint: 'https://api.napaparts.com',
        deliveryTime: 'Same Day',
        reliability: 0.95,
        priceMultiplier: 1.0,
        status: 'active'
      },
      {
        id: 'supplier-2',
        name: 'AutoZone',
        apiEndpoint: 'https://api.autozone.com',
        deliveryTime: '2 Hours',
        reliability: 0.92,
        priceMultiplier: 0.95,
        status: 'active'
      },
      {
        id: 'supplier-3',
        name: 'Local Supplier',
        apiEndpoint: 'https://api.localsupplier.com',
        deliveryTime: '4 Hours',
        reliability: 0.88,
        priceMultiplier: 0.90,
        status: 'active'
      }
    ]

    suppliers.forEach(supplier => {
      this.suppliers.set(supplier.id, supplier)
    })

    // Inventory items
    const inventoryItems = [
      {
        id: 'part-1',
        name: 'Brake Pads - Front',
        partNumber: 'BP-HONDA-CITY-F',
        category: 'Brakes',
        currentStock: 15,
        minStock: 10,
        maxStock: 50,
        unit: 'Sets',
        avgCost: 2400,
        lastUpdated: new Date(),
        suppliers: ['supplier-1', 'supplier-2', 'supplier-3'],
        compatibility: ['Honda City', 'Honda Civic'],
        status: 'in-stock'
      },
      {
        id: 'part-2',
        name: 'Engine Oil Filter',
        partNumber: 'OF-HONDA-CITY',
        category: 'Filters',
        currentStock: 8,
        minStock: 15,
        maxStock: 40,
        unit: 'Units',
        avgCost: 435,
        lastUpdated: new Date(),
        suppliers: ['supplier-1', 'supplier-2'],
        compatibility: ['Honda City', 'Honda Accord'],
        status: 'low-stock'
      },
      {
        id: 'part-3',
        name: 'Engine Oil (5W-30)',
        partNumber: 'OIL-5W30-001',
        category: 'Fluids',
        currentStock: 2,
        minStock: 20,
        maxStock: 100,
        unit: 'Quarts',
        avgCost: 899,
        lastUpdated: new Date(),
        suppliers: ['supplier-1', 'supplier-2', 'supplier-3'],
        compatibility: ['Universal'],
        status: 'critical'
      },
      {
        id: 'part-4',
        name: 'Spark Plugs (Set of 4)',
        partNumber: 'SP-SET4-005',
        category: 'Ignition',
        currentStock: 25,
        minStock: 10,
        maxStock: 60,
        unit: 'Sets',
        avgCost: 2499,
        lastUpdated: new Date(),
        suppliers: ['supplier-1', 'supplier-3'],
        compatibility: ['Honda City', 'Honda Civic', 'Honda Accord'],
        status: 'in-stock'
      },
      {
        id: 'part-5',
        name: 'Air Filter',
        partNumber: 'AF-STD-003',
        category: 'Filters',
        currentStock: 12,
        minStock: 8,
        maxStock: 30,
        unit: 'Units',
        avgCost: 1299,
        lastUpdated: new Date(),
        suppliers: ['supplier-2', 'supplier-3'],
        compatibility: ['Honda City'],
        status: 'in-stock'
      }
    ]

    inventoryItems.forEach(item => {
      this.inventory.set(item.id, item)
      
      // Set up reorder rules
      this.reorderRules.set(item.id, {
        autoReorder: true,
        reorderQuantity: Math.ceil((item.maxStock - item.minStock) * 0.7),
        preferredSupplier: item.suppliers[0]
      })
    })
  }

  // Start real-time updates simulation
  startRealTimeUpdates() {
    // Simulate stock level changes
    setInterval(() => {
      this.simulateStockChanges()
    }, 30000) // Every 30 seconds

    // Simulate price updates
    setInterval(() => {
      this.updatePrices()
    }, 60000) // Every minute
  }

  // Simulate stock level changes
  simulateStockChanges() {
    this.inventory.forEach((item, id) => {
      // Random stock consumption
      if (Math.random() < 0.3) { // 30% chance of stock change
        const change = Math.floor(Math.random() * 3) + 1
        item.currentStock = Math.max(0, item.currentStock - change)
        item.lastUpdated = new Date()
        
        // Update status based on stock level
        if (item.currentStock === 0) {
          item.status = 'out-of-stock'
        } else if (item.currentStock < item.minStock) {
          item.status = 'critical'
        } else if (item.currentStock < item.minStock * 1.5) {
          item.status = 'low-stock'
        } else {
          item.status = 'in-stock'
        }

        // Trigger reorder if needed
        this.checkReorderNeeded(id)
      }
    })
  }

  // Update prices from suppliers
  async updatePrices() {
    for (const [partId, part] of this.inventory) {
      const prices = await this.fetchSupplierPrices(partId)
      this.priceCache.set(partId, {
        prices,
        lastUpdated: new Date()
      })
    }
  }

  // Fetch prices from suppliers (simulated)
  async fetchSupplierPrices(partId) {
    const part = this.inventory.get(partId)
    if (!part) return []

    const prices = []
    
    for (const supplierId of part.suppliers) {
      const supplier = this.suppliers.get(supplierId)
      if (supplier && supplier.status === 'active') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Generate realistic price with some variation
        const basePrice = part.avgCost
        const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
        const price = Math.round(basePrice * (1 + variation) * supplier.priceMultiplier)
        
        prices.push({
          supplierId,
          supplierName: supplier.name,
          price,
          availability: this.getSupplierAvailability(partId, supplierId),
          deliveryTime: supplier.deliveryTime,
          lastUpdated: new Date()
        })
      }
    }
    
    return prices.sort((a, b) => a.price - b.price) // Sort by price
  }

  // Get supplier availability (simulated)
  getSupplierAvailability(partId, supplierId) {
    const supplier = this.suppliers.get(supplierId)
    const random = Math.random()
    
    if (random < supplier.reliability) {
      return Math.floor(Math.random() * 50) + 10 // 10-60 units
    } else {
      return 0 // Out of stock
    }
  }

  // Check if reorder is needed
  checkReorderNeeded(partId) {
    const part = this.inventory.get(partId)
    const reorderRule = this.reorderRules.get(partId)
    
    if (!part || !reorderRule || !reorderRule.autoReorder) return

    if (part.currentStock <= part.minStock) {
      this.createReorderNotification(partId)
      
      if (reorderRule.autoReorder) {
        this.autoReorderPart(partId)
      }
    }
  }

  // Create reorder notification
  createReorderNotification(partId) {
    const part = this.inventory.get(partId)
    const notification = {
      id: `reorder-${partId}-${Date.now()}`,
      type: 'reorder-needed',
      partId,
      partName: part.name,
      currentStock: part.currentStock,
      minStock: part.minStock,
      severity: part.currentStock === 0 ? 'critical' : 'warning',
      timestamp: new Date(),
      read: false
    }
    
    this.notifications.push(notification)
  }

  // Auto reorder part
  async autoReorderPart(partId) {
    const part = this.inventory.get(partId)
    const reorderRule = this.reorderRules.get(partId)
    const prices = await this.fetchSupplierPrices(partId)
    
    if (prices.length === 0) return

    // Find best supplier (lowest price with good availability)
    const bestSupplier = prices.find(p => p.availability >= reorderRule.reorderQuantity) || prices[0]
    
    const order = {
      id: `order-${Date.now()}`,
      partId,
      partName: part.name,
      quantity: reorderRule.reorderQuantity,
      supplierId: bestSupplier.supplierId,
      supplierName: bestSupplier.supplierName,
      unitPrice: bestSupplier.price,
      totalPrice: bestSupplier.price * reorderRule.reorderQuantity,
      status: 'pending',
      orderDate: new Date(),
      expectedDelivery: this.calculateDeliveryDate(bestSupplier.deliveryTime),
      autoGenerated: true
    }
    
    this.orderHistory.push(order)
    
    // Create order confirmation notification
    this.notifications.push({
      id: `order-${order.id}`,
      type: 'order-placed',
      orderId: order.id,
      partName: part.name,
      quantity: order.quantity,
      supplier: order.supplierName,
      timestamp: new Date(),
      read: false
    })
  }

  // Calculate delivery date
  calculateDeliveryDate(deliveryTime) {
    const now = new Date()
    const hours = deliveryTime.includes('Same Day') ? 8 : 
                 deliveryTime.includes('2 Hours') ? 2 :
                 deliveryTime.includes('4 Hours') ? 4 : 24
    
    return new Date(now.getTime() + hours * 60 * 60 * 1000)
  }

  // Track parts usage
  trackPartUsage(partId, quantity, serviceId, vehicleInfo) {
    const part = this.inventory.get(partId)
    if (!part) return

    // Update inventory
    part.currentStock = Math.max(0, part.currentStock - quantity)
    part.lastUpdated = new Date()
    
    // Record usage
    this.usageTracking.push({
      id: `usage-${Date.now()}`,
      partId,
      partName: part.name,
      quantity,
      serviceId,
      vehicleInfo,
      timestamp: new Date(),
      cost: part.avgCost * quantity
    })

    // Update part status
    if (part.currentStock === 0) {
      part.status = 'out-of-stock'
    } else if (part.currentStock < part.minStock) {
      part.status = 'critical'
    } else if (part.currentStock < part.minStock * 1.5) {
      part.status = 'low-stock'
    }

    // Check if reorder is needed
    this.checkReorderNeeded(partId)
  }

  // Get parts recommendations for a service
  getPartsRecommendations(serviceType, vehicleInfo) {
    const recommendations = []
    
    // Service-specific part recommendations
    const servicePartMap = {
      'Oil Change': ['part-2', 'part-3'], // Oil filter, Engine oil
      'Brake Service': ['part-1'], // Brake pads
      'Regular Maintenance': ['part-2', 'part-3', 'part-5'], // Oil filter, Engine oil, Air filter
      'Engine Diagnostic': ['part-4'], // Spark plugs
      'Full Service': ['part-1', 'part-2', 'part-3', 'part-4', 'part-5'] // All parts
    }
    
    const recommendedPartIds = servicePartMap[serviceType] || []
    
    for (const partId of recommendedPartIds) {
      const part = this.inventory.get(partId)
      if (part && part.compatibility.some(compat => 
        compat === 'Universal' || vehicleInfo.includes(compat))) {
        
        recommendations.push({
          ...part,
          recommended: true,
          reason: `Commonly needed for ${serviceType}`,
          availability: part.currentStock > 0 ? 'Available' : 'Out of Stock',
          estimatedCost: part.avgCost
        })
      }
    }
    
    return recommendations
  }

  // Get real-time inventory status
  getInventoryStatus() {
    const items = Array.from(this.inventory.values())
    
    return {
      totalItems: items.length,
      inStock: items.filter(i => i.status === 'in-stock').length,
      lowStock: items.filter(i => i.status === 'low-stock').length,
      critical: items.filter(i => i.status === 'critical').length,
      outOfStock: items.filter(i => i.status === 'out-of-stock').length,
      totalValue: items.reduce((sum, item) => sum + (item.currentStock * item.avgCost), 0),
      items: items.map(item => ({
        ...item,
        prices: this.priceCache.get(item.id)?.prices || []
      }))
    }
  }

  // Get supplier performance
  getSupplierPerformance() {
    return Array.from(this.suppliers.values()).map(supplier => ({
      ...supplier,
      orderCount: this.orderHistory.filter(o => o.supplierId === supplier.id).length,
      avgDeliveryTime: supplier.deliveryTime,
      reliability: supplier.reliability
    }))
  }

  // Get usage analytics
  getUsageAnalytics(timeframe = '30d') {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - (timeframe === '30d' ? 30 : 7))
    
    const recentUsage = this.usageTracking.filter(u => u.timestamp >= cutoffDate)
    
    const analytics = {
      totalUsage: recentUsage.length,
      totalCost: recentUsage.reduce((sum, u) => sum + u.cost, 0),
      topParts: this.getTopUsedParts(recentUsage),
      usageByCategory: this.getUsageByCategory(recentUsage),
      costTrend: this.getCostTrend(recentUsage)
    }
    
    return analytics
  }

  // Get top used parts
  getTopUsedParts(usageData) {
    const partUsage = new Map()
    
    usageData.forEach(usage => {
      const current = partUsage.get(usage.partId) || { quantity: 0, cost: 0, name: usage.partName }
      current.quantity += usage.quantity
      current.cost += usage.cost
      partUsage.set(usage.partId, current)
    })
    
    return Array.from(partUsage.entries())
      .map(([partId, data]) => ({ partId, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
  }

  // Get usage by category
  getUsageByCategory(usageData) {
    const categoryUsage = new Map()
    
    usageData.forEach(usage => {
      const part = this.inventory.get(usage.partId)
      if (part) {
        const current = categoryUsage.get(part.category) || 0
        categoryUsage.set(part.category, current + usage.quantity)
      }
    })
    
    return Array.from(categoryUsage.entries()).map(([category, quantity]) => ({
      category,
      quantity
    }))
  }

  // Get cost trend
  getCostTrend(usageData) {
    const dailyCosts = new Map()
    
    usageData.forEach(usage => {
      const date = usage.timestamp.toDateString()
      const current = dailyCosts.get(date) || 0
      dailyCosts.set(date, current + usage.cost)
    })
    
    return Array.from(dailyCosts.entries())
      .map(([date, cost]) => ({ date, cost }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  // Get real-time pricing for service intake
  async getRealTimePricing(partIds, vehicleInfo) {
    const pricingData = []
    
    for (const partId of partIds) {
      const part = this.inventory.get(partId)
      if (!part) continue

      // Get latest supplier prices
      const prices = await this.fetchSupplierPrices(partId)
      
      // Calculate compatibility score
      const compatibilityScore = this.calculateCompatibilityScore(part, vehicleInfo)
      
      // Get availability from all suppliers
      const totalAvailability = prices.reduce((sum, p) => sum + p.availability, 0)
      
      pricingData.push({
        id: partId,
        name: part.name,
        partNumber: part.partNumber,
        description: `${part.category} - Compatible with ${vehicleInfo.make} ${vehicleInfo.model}`,
        brand: 'OEM Quality',
        warranty: '12 months',
        category: part.category,
        currentStock: part.currentStock,
        availability: totalAvailability > 0 ? 'in-stock' : 'out-of-stock',
        price: prices.length > 0 ? prices[0].price : part.avgCost,
        originalPrice: part.avgCost,
        discount: prices.length > 0 ? Math.max(0, part.avgCost - prices[0].price) : 0,
        suppliers: prices,
        compatibilityScore,
        isRecommended: compatibilityScore > 0.8,
        quantity: 1,
        estimatedDelivery: prices.length > 0 ? prices[0].deliveryTime : '24 Hours',
        lastUpdated: new Date()
      })
    }
    
    return pricingData.sort((a, b) => b.compatibilityScore - a.compatibilityScore)
  }

  // Calculate compatibility score based on vehicle info
  calculateCompatibilityScore(part, vehicleInfo) {
    let score = 0
    
    // Check direct compatibility
    const vehicleString = `${vehicleInfo.make} ${vehicleInfo.model}`
    if (part.compatibility.includes(vehicleString)) {
      score += 1.0
    } else if (part.compatibility.includes(vehicleInfo.make)) {
      score += 0.8
    } else if (part.compatibility.includes('Universal')) {
      score += 0.6
    }
    
    // Adjust based on vehicle year
    if (vehicleInfo.year) {
      const year = parseInt(vehicleInfo.year)
      if (year >= 2015) score += 0.1 // Newer vehicles get slight boost
      if (year <= 2010) score -= 0.1 // Older vehicles get slight penalty
    }
    
    return Math.min(1.0, Math.max(0, score))
  }

  // Get dynamic pricing based on demand and availability
  getDynamicPricing(partId) {
    const part = this.inventory.get(partId)
    if (!part) return null

    let priceMultiplier = 1.0
    
    // Adjust based on stock level
    if (part.currentStock === 0) {
      priceMultiplier += 0.2 // 20% increase for out of stock
    } else if (part.currentStock < part.minStock) {
      priceMultiplier += 0.1 // 10% increase for low stock
    } else if (part.currentStock > part.maxStock * 0.8) {
      priceMultiplier -= 0.05 // 5% discount for high stock
    }
    
    // Adjust based on recent usage
    const recentUsage = this.usageTracking
      .filter(u => u.partId === partId && u.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .length
    
    if (recentUsage > 5) {
      priceMultiplier += 0.05 // 5% increase for high demand
    }
    
    return {
      basePrice: part.avgCost,
      adjustedPrice: Math.round(part.avgCost * priceMultiplier),
      priceMultiplier,
      factors: {
        stockLevel: part.currentStock < part.minStock ? 'low' : 'normal',
        demand: recentUsage > 5 ? 'high' : 'normal'
      }
    }
  }

  // Get supplier comparison for a part
  async getSupplierComparison(partId) {
    const part = this.inventory.get(partId)
    if (!part) return null

    const prices = await this.fetchSupplierPrices(partId)
    
    return {
      partId,
      partName: part.name,
      suppliers: prices.map(price => ({
        ...price,
        supplier: this.suppliers.get(price.supplierId),
        score: this.calculateSupplierScore(price, this.suppliers.get(price.supplierId))
      })).sort((a, b) => b.score - a.score)
    }
  }

  // Calculate supplier score based on price, reliability, and delivery time
  calculateSupplierScore(price, supplier) {
    let score = 0
    
    // Price factor (lower is better) - 40% weight
    const priceScore = Math.max(0, 1 - (price.price / 5000)) // Normalize to 0-1
    score += priceScore * 0.4
    
    // Reliability factor - 35% weight
    score += supplier.reliability * 0.35
    
    // Delivery time factor - 25% weight
    const deliveryScore = supplier.deliveryTime.includes('Same Day') ? 1.0 :
                         supplier.deliveryTime.includes('2 Hours') ? 0.9 :
                         supplier.deliveryTime.includes('4 Hours') ? 0.7 : 0.5
    score += deliveryScore * 0.25
    
    return Math.round(score * 100) / 100
  }

  // Get parts for specific service with real-time data
  async getServiceParts(serviceType, vehicleInfo) {
    const servicePartMap = {
      'Oil Change': ['part-2', 'part-3'],
      'Brake Service': ['part-1'],
      'Regular Maintenance': ['part-2', 'part-3', 'part-5'],
      'Engine Diagnostic': ['part-4'],
      'Transmission Service': ['part-3'],
      'Cooling System': ['part-3'],
      'Electrical Repair': ['part-4'],
      'Suspension Repair': ['part-1'],
      'Full Service': ['part-1', 'part-2', 'part-3', 'part-4', 'part-5']
    }
    
    const partIds = servicePartMap[serviceType] || []
    return await this.getRealTimePricing(partIds, vehicleInfo)
  }

  // Bulk price update from external API (simulated)
  async bulkPriceUpdate() {
    const updates = []
    
    for (const [partId, part] of this.inventory) {
      try {
        // Simulate external API call
        await new Promise(resolve => setTimeout(resolve, 50))
        
        const newPrices = await this.fetchSupplierPrices(partId)
        this.priceCache.set(partId, {
          prices: newPrices,
          lastUpdated: new Date()
        })
        
        updates.push({
          partId,
          partName: part.name,
          oldPrice: part.avgCost,
          newPrice: newPrices.length > 0 ? newPrices[0].price : part.avgCost,
          suppliers: newPrices.length
        })
      } catch (error) {
        console.error(`Failed to update prices for ${partId}:`, error)
      }
    }
    
    // Create notification for bulk update
    this.notifications.push({
      id: `bulk-update-${Date.now()}`,
      type: 'price-update',
      message: `Updated prices for ${updates.length} parts`,
      updatedParts: updates.length,
      timestamp: new Date(),
      read: false
    })
    
    return updates
  }

  // Mark notification as read
  markNotificationRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  // Get order history
  getOrderHistory() {
    return this.orderHistory.sort((a, b) => b.orderDate - a.orderDate)
  }

  // Place manual order
  async placeOrder(partId, quantity, supplierId) {
    const part = this.inventory.get(partId)
    const supplier = this.suppliers.get(supplierId)
    
    if (!part || !supplier) {
      throw new Error('Invalid part or supplier')
    }

    const prices = await this.fetchSupplierPrices(partId)
    const supplierPrice = prices.find(p => p.supplierId === supplierId)
    
    if (!supplierPrice) {
      throw new Error('Price not available from supplier')
    }

    const order = {
      id: `order-${Date.now()}`,
      partId,
      partName: part.name,
      quantity,
      supplierId,
      supplierName: supplier.name,
      unitPrice: supplierPrice.price,
      totalPrice: supplierPrice.price * quantity,
      status: 'pending',
      orderDate: new Date(),
      expectedDelivery: this.calculateDeliveryDate(supplier.deliveryTime),
      autoGenerated: false
    }
    
    this.orderHistory.push(order)
    
    return order
  }

  // Receive order (simulate delivery)
  receiveOrder(orderId) {
    const order = this.orderHistory.find(o => o.id === orderId)
    if (!order) return false

    const part = this.inventory.get(order.partId)
    if (!part) return false

    // Update inventory
    part.currentStock += order.quantity
    part.lastUpdated = new Date()
    
    // Update part status
    if (part.currentStock >= part.maxStock * 0.8) {
      part.status = 'in-stock'
    } else if (part.currentStock >= part.minStock) {
      part.status = 'low-stock'
    }

    // Update order status
    order.status = 'received'
    order.receivedDate = new Date()

    // Create notification
    this.notifications.push({
      id: `received-${order.id}`,
      type: 'order-received',
      orderId: order.id,
      partName: order.partName,
      quantity: order.quantity,
      timestamp: new Date(),
      read: false
    })

    return true
  }

  // Receive order from automated reordering system
  receiveOrder(orderData) {
    const { orderId, partId, quantity, unitCost, supplier, receivedDate } = orderData
    
    const part = this.inventory.get(partId)
    if (!part) {
      throw new Error(`Part ${partId} not found in inventory`)
    }

    // Update inventory
    part.currentStock += quantity
    part.lastRestocked = receivedDate || new Date()
    
    // Update average cost with weighted average
    const totalValue = (part.currentStock - quantity) * part.avgCost + quantity * unitCost
    part.avgCost = Math.round(totalValue / part.currentStock)

    // Update part status
    if (part.currentStock >= part.maxStock * 0.8) {
      part.status = 'in-stock'
    } else if (part.currentStock >= part.minStock) {
      part.status = 'low-stock'
    }

    // Add to order history
    const orderRecord = {
      id: orderId,
      partId,
      partName: part.name,
      quantity,
      unitCost,
      totalCost: quantity * unitCost,
      supplier,
      receivedDate: receivedDate || new Date(),
      type: 'automated-reorder'
    }

    if (!this.orderHistory) {
      this.orderHistory = []
    }
    this.orderHistory.push(orderRecord)

    // Create notification
    this.notifications.push({
      id: `auto-received-${orderId}`,
      type: 'automated-order-received',
      orderId,
      partName: part.name,
      quantity,
      supplier,
      timestamp: new Date(),
      read: false
    })

    console.log(`Received automated order ${orderId}: ${quantity} units of ${part.name}`)
    return orderRecord
  }

  // Get inventory status for automated reordering
  getInventoryStatus() {
    return Array.from(this.inventory.values()).map(part => ({
      id: part.id,
      name: part.name,
      currentStock: part.currentStock,
      minStock: part.minStock,
      maxStock: part.maxStock,
      status: part.status,
      lastUpdated: part.lastRestocked,
      avgCost: part.avgCost
    }))
  }
}

// Create singleton instance
const partsService = new PartsService()

export default partsService