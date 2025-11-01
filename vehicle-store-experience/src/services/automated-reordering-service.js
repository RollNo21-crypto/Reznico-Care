import partsService from './parts-service'

class AutomatedReorderingService {
  constructor() {
    this.reorderRules = new Map()
    this.pendingOrders = new Map()
    this.orderHistory = []
    this.supplierNotifications = []
    this.isMonitoring = false
    this.monitoringInterval = null
    
    this.initializeReorderingSystem()
  }

  initializeReorderingSystem() {
    // Set up default reorder rules
    this.setupDefaultReorderRules()
    
    // Start monitoring if not already running
    this.startMonitoring()
  }

  setupDefaultReorderRules() {
    const defaultRules = [
      {
        partId: 'OIL-001',
        name: 'Engine Oil (5W-30)',
        minStock: 10,
        reorderQuantity: 50,
        preferredSupplier: 'SUP-001',
        maxPrice: 1000,
        priority: 'high',
        autoReorder: true
      },
      {
        partId: 'FILTER-001',
        name: 'Oil Filter',
        minStock: 15,
        reorderQuantity: 30,
        preferredSupplier: 'SUP-002',
        maxPrice: 500,
        priority: 'high',
        autoReorder: true
      },
      {
        partId: 'BRAKE-001',
        name: 'Brake Pads - Front',
        minStock: 5,
        reorderQuantity: 20,
        preferredSupplier: 'SUP-003',
        maxPrice: 2500,
        priority: 'medium',
        autoReorder: true
      },
      {
        partId: 'BRAKE-002',
        name: 'Brake Fluid',
        minStock: 8,
        reorderQuantity: 25,
        preferredSupplier: 'SUP-001',
        maxPrice: 350,
        priority: 'medium',
        autoReorder: true
      },
      {
        partId: 'SPARK-001',
        name: 'Spark Plugs',
        minStock: 20,
        reorderQuantity: 100,
        preferredSupplier: 'SUP-004',
        maxPrice: 150,
        priority: 'low',
        autoReorder: false // Manual approval required
      }
    ]

    defaultRules.forEach(rule => {
      this.reorderRules.set(rule.partId, rule)
    })
  }

  startMonitoring() {
    if (this.isMonitoring) return

    this.isMonitoring = true
    
    // Check inventory every 5 minutes (in production, this might be hourly)
    this.monitoringInterval = setInterval(() => {
      this.checkInventoryLevels()
    }, 5 * 60 * 1000)

    // Initial check
    this.checkInventoryLevels()
    
    console.log('Automated reordering monitoring started')
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
    this.isMonitoring = false
    console.log('Automated reordering monitoring stopped')
  }

  async checkInventoryLevels() {
    try {
      const inventoryStatus = partsService.getInventoryStatus()
      const lowStockItems = []
      const reorderCandidates = []

      for (const item of inventoryStatus) {
        const reorderRule = this.reorderRules.get(item.id)
        
        if (reorderRule && item.currentStock <= reorderRule.minStock) {
          lowStockItems.push({
            ...item,
            reorderRule
          })

          // Check if we should automatically reorder
          if (reorderRule.autoReorder && !this.hasPendingOrder(item.id)) {
            reorderCandidates.push({
              ...item,
              reorderRule
            })
          }
        }
      }

      // Process automatic reorders
      for (const candidate of reorderCandidates) {
        await this.processAutomaticReorder(candidate)
      }

      // Send notifications for low stock items that require manual approval
      const manualApprovalItems = lowStockItems.filter(item => 
        !item.reorderRule.autoReorder && !this.hasPendingOrder(item.id)
      )

      if (manualApprovalItems.length > 0) {
        this.sendLowStockNotifications(manualApprovalItems)
      }

    } catch (error) {
      console.error('Error checking inventory levels:', error)
    }
  }

  async processAutomaticReorder(item) {
    try {
      // Get supplier pricing
      const supplierComparison = await partsService.getSupplierComparison(item.id)
      const preferredSupplier = supplierComparison.find(s => s.id === item.reorderRule.preferredSupplier)
      
      if (!preferredSupplier) {
        console.warn(`Preferred supplier not found for part ${item.id}`)
        return
      }

      // Check if price is within acceptable range
      if (preferredSupplier.price > item.reorderRule.maxPrice) {
        this.sendPriceAlertNotification(item, preferredSupplier)
        return
      }

      // Create purchase order
      const purchaseOrder = await this.createPurchaseOrder({
        partId: item.id,
        partName: item.name,
        quantity: item.reorderRule.reorderQuantity,
        supplier: preferredSupplier,
        reorderRule: item.reorderRule,
        orderType: 'automatic',
        priority: item.reorderRule.priority
      })

      // Send order to supplier
      await this.sendOrderToSupplier(purchaseOrder)

      console.log(`Automatic reorder created for ${item.name}: ${purchaseOrder.orderId}`)

    } catch (error) {
      console.error(`Error processing automatic reorder for ${item.name}:`, error)
    }
  }

  async createPurchaseOrder(orderData) {
    const orderId = `PO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const purchaseOrder = {
      orderId,
      partId: orderData.partId,
      partName: orderData.partName,
      quantity: orderData.quantity,
      unitPrice: orderData.supplier.price,
      totalPrice: orderData.quantity * orderData.supplier.price,
      supplier: {
        id: orderData.supplier.id,
        name: orderData.supplier.name,
        contact: orderData.supplier.contact
      },
      orderType: orderData.orderType,
      priority: orderData.priority,
      status: 'pending',
      createdAt: new Date(),
      expectedDelivery: this.calculateExpectedDelivery(orderData.supplier.deliveryTime),
      reorderRule: orderData.reorderRule,
      approvedBy: orderData.orderType === 'automatic' ? 'system' : null
    }

    this.pendingOrders.set(orderId, purchaseOrder)
    this.orderHistory.push({ ...purchaseOrder })

    return purchaseOrder
  }

  async sendOrderToSupplier(purchaseOrder) {
    // Simulate sending order to supplier
    const notification = {
      id: `NOTIF-${Date.now()}`,
      type: 'order_sent',
      supplierId: purchaseOrder.supplier.id,
      supplierName: purchaseOrder.supplier.name,
      orderId: purchaseOrder.orderId,
      message: `Purchase order ${purchaseOrder.orderId} sent to ${purchaseOrder.supplier.name}`,
      details: {
        partName: purchaseOrder.partName,
        quantity: purchaseOrder.quantity,
        totalPrice: purchaseOrder.totalPrice,
        expectedDelivery: purchaseOrder.expectedDelivery
      },
      timestamp: new Date(),
      status: 'sent'
    }

    this.supplierNotifications.push(notification)

    // Update order status
    purchaseOrder.status = 'sent'
    purchaseOrder.sentAt = new Date()

    return notification
  }

  calculateExpectedDelivery(deliveryDays) {
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)
    return deliveryDate
  }

  hasPendingOrder(partId) {
    return Array.from(this.pendingOrders.values()).some(order => 
      order.partId === partId && ['pending', 'sent', 'confirmed'].includes(order.status)
    )
  }

  sendLowStockNotifications(items) {
    items.forEach(item => {
      const notification = {
        id: `NOTIF-${Date.now()}-${item.id}`,
        type: 'low_stock_manual',
        partId: item.id,
        partName: item.name,
        currentStock: item.currentStock,
        minStock: item.reorderRule.minStock,
        message: `${item.name} is low in stock (${item.currentStock} units). Manual reorder required.`,
        priority: item.reorderRule.priority,
        timestamp: new Date(),
        requiresAction: true
      }

      this.supplierNotifications.push(notification)
    })
  }

  sendPriceAlertNotification(item, supplier) {
    const notification = {
      id: `NOTIF-${Date.now()}-PRICE-${item.id}`,
      type: 'price_alert',
      partId: item.id,
      partName: item.name,
      currentPrice: supplier.price,
      maxPrice: item.reorderRule.maxPrice,
      supplier: supplier.name,
      message: `Price alert: ${item.name} from ${supplier.name} (${supplier.price}) exceeds maximum price (${item.reorderRule.maxPrice})`,
      priority: 'high',
      timestamp: new Date(),
      requiresAction: true
    }

    this.supplierNotifications.push(notification)
  }

  // Manual reorder methods
  async createManualReorder(partId, quantity, supplierId, approvedBy) {
    try {
      const reorderRule = this.reorderRules.get(partId)
      if (!reorderRule) {
        throw new Error(`No reorder rule found for part ${partId}`)
      }

      const supplierComparison = await partsService.getSupplierComparison(partId)
      const selectedSupplier = supplierComparison.find(s => s.id === supplierId)
      
      if (!selectedSupplier) {
        throw new Error(`Supplier ${supplierId} not found`)
      }

      const purchaseOrder = await this.createPurchaseOrder({
        partId,
        partName: reorderRule.name,
        quantity,
        supplier: selectedSupplier,
        reorderRule,
        orderType: 'manual',
        priority: reorderRule.priority
      })

      purchaseOrder.approvedBy = approvedBy
      purchaseOrder.status = 'approved'

      await this.sendOrderToSupplier(purchaseOrder)

      return purchaseOrder
    } catch (error) {
      console.error('Error creating manual reorder:', error)
      throw error
    }
  }

  // Order management methods
  confirmOrder(orderId, confirmationDetails) {
    const order = this.pendingOrders.get(orderId)
    if (!order) {
      throw new Error(`Order ${orderId} not found`)
    }

    order.status = 'confirmed'
    order.confirmedAt = new Date()
    order.supplierReference = confirmationDetails.supplierReference
    order.confirmedDelivery = confirmationDetails.expectedDelivery

    const notification = {
      id: `NOTIF-${Date.now()}`,
      type: 'order_confirmed',
      orderId,
      message: `Order ${orderId} confirmed by supplier`,
      details: confirmationDetails,
      timestamp: new Date()
    }

    this.supplierNotifications.push(notification)
    return order
  }

  receiveOrder(orderId, receivedQuantity, receivedDate = new Date()) {
    const order = this.pendingOrders.get(orderId)
    if (!order) {
      throw new Error(`Order ${orderId} not found`)
    }

    order.status = 'received'
    order.receivedAt = receivedDate
    order.receivedQuantity = receivedQuantity
    order.isComplete = receivedQuantity >= order.quantity

    // Update inventory in parts service
    partsService.receiveOrder({
      orderId,
      partId: order.partId,
      quantity: receivedQuantity,
      unitCost: order.unitPrice,
      supplier: order.supplier.name,
      receivedDate
    })

    // Remove from pending orders if complete
    if (order.isComplete) {
      this.pendingOrders.delete(orderId)
    }

    const notification = {
      id: `NOTIF-${Date.now()}`,
      type: 'order_received',
      orderId,
      message: `Order ${orderId} received: ${receivedQuantity}/${order.quantity} units`,
      timestamp: new Date()
    }

    this.supplierNotifications.push(notification)
    return order
  }

  // Configuration methods
  updateReorderRule(partId, updates) {
    const currentRule = this.reorderRules.get(partId)
    if (!currentRule) {
      throw new Error(`No reorder rule found for part ${partId}`)
    }

    const updatedRule = { ...currentRule, ...updates }
    this.reorderRules.set(partId, updatedRule)
    return updatedRule
  }

  addReorderRule(rule) {
    this.reorderRules.set(rule.partId, rule)
    return rule
  }

  removeReorderRule(partId) {
    return this.reorderRules.delete(partId)
  }

  // Reporting methods
  getReorderingReport(days = 30) {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const recentOrders = this.orderHistory.filter(order => order.createdAt >= cutoffDate)

    return {
      totalOrders: recentOrders.length,
      automaticOrders: recentOrders.filter(o => o.orderType === 'automatic').length,
      manualOrders: recentOrders.filter(o => o.orderType === 'manual').length,
      totalValue: recentOrders.reduce((sum, order) => sum + order.totalPrice, 0),
      averageOrderValue: recentOrders.length > 0 ? 
        recentOrders.reduce((sum, order) => sum + order.totalPrice, 0) / recentOrders.length : 0,
      ordersByStatus: this.groupOrdersByStatus(recentOrders),
      ordersBySupplier: this.groupOrdersBySupplier(recentOrders),
      ordersByPriority: this.groupOrdersByPriority(recentOrders)
    }
  }

  groupOrdersByStatus(orders) {
    const grouped = new Map()
    orders.forEach(order => {
      const count = grouped.get(order.status) || 0
      grouped.set(order.status, count + 1)
    })
    return Object.fromEntries(grouped)
  }

  groupOrdersBySupplier(orders) {
    const grouped = new Map()
    orders.forEach(order => {
      const count = grouped.get(order.supplier.name) || 0
      grouped.set(order.supplier.name, count + 1)
    })
    return Object.fromEntries(grouped)
  }

  groupOrdersByPriority(orders) {
    const grouped = new Map()
    orders.forEach(order => {
      const count = grouped.get(order.priority) || 0
      grouped.set(order.priority, count + 1)
    })
    return Object.fromEntries(grouped)
  }

  // Getter methods
  getAllReorderRules() {
    return Array.from(this.reorderRules.values())
  }

  getPendingOrders() {
    return Array.from(this.pendingOrders.values())
  }

  getOrderHistory(limit = 50) {
    return this.orderHistory
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit)
  }

  getNotifications(unreadOnly = false) {
    const notifications = unreadOnly 
      ? this.supplierNotifications.filter(n => !n.read)
      : this.supplierNotifications

    return notifications.sort((a, b) => b.timestamp - a.timestamp)
  }

  markNotificationRead(notificationId) {
    const notification = this.supplierNotifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      notification.readAt = new Date()
    }
    return notification
  }

  getSupplierPerformance() {
    const performance = new Map()
    
    this.orderHistory.forEach(order => {
      const supplierId = order.supplier.id
      const current = performance.get(supplierId) || {
        id: supplierId,
        name: order.supplier.name,
        totalOrders: 0,
        completedOrders: 0,
        totalValue: 0,
        averageDeliveryTime: 0,
        onTimeDeliveries: 0
      }
      
      current.totalOrders++
      current.totalValue += order.totalPrice
      
      if (order.status === 'received') {
        current.completedOrders++
        
        if (order.receivedAt && order.expectedDelivery) {
          const deliveryTime = Math.ceil((order.receivedAt - order.createdAt) / (1000 * 60 * 60 * 24))
          current.averageDeliveryTime = (current.averageDeliveryTime + deliveryTime) / 2
          
          if (order.receivedAt <= order.expectedDelivery) {
            current.onTimeDeliveries++
          }
        }
      }
      
      performance.set(supplierId, current)
    })
    
    return Array.from(performance.values()).map(supplier => ({
      ...supplier,
      completionRate: supplier.totalOrders > 0 ? (supplier.completedOrders / supplier.totalOrders) * 100 : 0,
      onTimeRate: supplier.completedOrders > 0 ? (supplier.onTimeDeliveries / supplier.completedOrders) * 100 : 0
    }))
  }
}

// Create and export singleton instance
export const automatedReorderingService = new AutomatedReorderingService()