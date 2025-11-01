class PartsTrackingService {
  constructor() {
    this.serviceRecords = new Map()
    this.partsUsageHistory = []
    this.invoiceItems = new Map()
    this.trackingMetrics = {
      totalPartsUsed: 0,
      totalCost: 0,
      averagePartsPerService: 0,
      mostUsedParts: new Map()
    }
    
    this.initializeTrackingSystem()
  }

  initializeTrackingSystem() {
    // Initialize with some sample data
    this.addSampleData()
    this.calculateMetrics()
  }

  addSampleData() {
    // Sample service records with parts usage
    const sampleRecords = [
      {
        serviceId: 'SRV-001',
        customerId: 'CUST-001',
        customerName: 'John Smith',
        vehicleInfo: {
          make: 'Toyota',
          model: 'Camry',
          year: '2020',
          plateNumber: 'ABC-123'
        },
        serviceType: 'Oil Change',
        date: new Date('2024-01-15'),
        partsUsed: [
          {
            partId: 'OIL-001',
            name: 'Engine Oil (5W-30)',
            partNumber: 'CAST-5W30-5L',
            quantity: 1,
            unitCost: 899,
            totalCost: 899,
            supplier: 'Castrol',
            installedBy: 'Tech-001',
            warrantyPeriod: '6 months'
          },
          {
            partId: 'FILTER-001',
            name: 'Oil Filter',
            partNumber: 'MANN-W712',
            quantity: 1,
            unitCost: 435,
            totalCost: 435,
            supplier: 'Mann Filter',
            installedBy: 'Tech-001',
            warrantyPeriod: '6 months'
          }
        ],
        laborCost: 800,
        totalServiceCost: 2134,
        status: 'completed'
      },
      {
        serviceId: 'SRV-002',
        customerId: 'CUST-002',
        customerName: 'Sarah Johnson',
        vehicleInfo: {
          make: 'BMW',
          model: 'X3',
          year: '2019',
          plateNumber: 'XYZ-789'
        },
        serviceType: 'Brake Service',
        date: new Date('2024-01-16'),
        partsUsed: [
          {
            partId: 'BRAKE-001',
            name: 'Brake Pads - Front',
            partNumber: 'BOSCH-BP001',
            quantity: 1,
            unitCost: 2400,
            totalCost: 2400,
            supplier: 'Bosch',
            installedBy: 'Tech-002',
            warrantyPeriod: '12 months'
          },
          {
            partId: 'BRAKE-002',
            name: 'Brake Fluid',
            partNumber: 'DOT4-500ML',
            quantity: 1,
            unitCost: 299,
            totalCost: 299,
            supplier: 'Motul',
            installedBy: 'Tech-002',
            warrantyPeriod: '2 years'
          }
        ],
        laborCost: 1500,
        totalServiceCost: 4199,
        status: 'completed'
      }
    ]

    sampleRecords.forEach(record => {
      this.serviceRecords.set(record.serviceId, record)
      this.trackPartsUsage(record)
    })
  }

  // Track parts usage for a service
  trackPartsUsage(serviceRecord) {
    const usageEntry = {
      id: `USAGE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      serviceId: serviceRecord.serviceId,
      customerId: serviceRecord.customerId,
      customerName: serviceRecord.customerName,
      vehicleInfo: serviceRecord.vehicleInfo,
      serviceType: serviceRecord.serviceType,
      date: serviceRecord.date,
      partsUsed: serviceRecord.partsUsed,
      totalPartsCost: serviceRecord.partsUsed.reduce((sum, part) => sum + part.totalCost, 0),
      laborCost: serviceRecord.laborCost,
      totalServiceCost: serviceRecord.totalServiceCost,
      technician: serviceRecord.partsUsed[0]?.installedBy || 'Unknown',
      timestamp: new Date()
    }

    this.partsUsageHistory.push(usageEntry)

    // Update parts usage metrics
    serviceRecord.partsUsed.forEach(part => {
      const currentCount = this.trackingMetrics.mostUsedParts.get(part.partId) || 0
      this.trackingMetrics.mostUsedParts.set(part.partId, currentCount + part.quantity)
    })

    return usageEntry
  }

  // Add a new service record with parts tracking
  addServiceRecord(serviceData) {
    const serviceId = `SRV-${Date.now()}`
    const serviceRecord = {
      ...serviceData,
      serviceId,
      date: new Date(),
      status: 'completed'
    }

    this.serviceRecords.set(serviceId, serviceRecord)
    const usageEntry = this.trackPartsUsage(serviceRecord)
    this.calculateMetrics()

    return {
      serviceRecord,
      usageEntry,
      invoiceData: this.generateInvoiceData(serviceRecord)
    }
  }

  // Generate invoice data from service record
  generateInvoiceData(serviceRecord) {
    const invoiceId = `INV-${serviceRecord.serviceId}`
    const invoiceData = {
      invoiceId,
      serviceId: serviceRecord.serviceId,
      customerId: serviceRecord.customerId,
      customerName: serviceRecord.customerName,
      vehicleInfo: serviceRecord.vehicleInfo,
      date: serviceRecord.date,
      items: [
        // Labor item
        {
          type: 'labor',
          description: `${serviceRecord.serviceType} - Labor`,
          quantity: 1,
          unitPrice: serviceRecord.laborCost,
          totalPrice: serviceRecord.laborCost,
          taxable: true
        },
        // Parts items
        ...serviceRecord.partsUsed.map(part => ({
          type: 'part',
          partId: part.partId,
          description: `${part.name} (${part.partNumber})`,
          quantity: part.quantity,
          unitPrice: part.unitCost,
          totalPrice: part.totalCost,
          supplier: part.supplier,
          warranty: part.warrantyPeriod,
          taxable: true
        }))
      ],
      subtotal: serviceRecord.totalServiceCost,
      taxRate: 0.15, // 15% VAT
      taxAmount: serviceRecord.totalServiceCost * 0.15,
      total: serviceRecord.totalServiceCost * 1.15,
      paymentStatus: 'pending',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }

    this.invoiceItems.set(invoiceId, invoiceData)
    return invoiceData
  }

  // Get parts usage analytics
  getUsageAnalytics(period = 30) {
    const cutoffDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
    const recentUsage = this.partsUsageHistory.filter(entry => entry.date >= cutoffDate)

    const analytics = {
      totalServices: recentUsage.length,
      totalPartsUsed: recentUsage.reduce((sum, entry) => 
        sum + entry.partsUsed.reduce((partSum, part) => partSum + part.quantity, 0), 0
      ),
      totalPartsCost: recentUsage.reduce((sum, entry) => sum + entry.totalPartsCost, 0),
      totalServiceCost: recentUsage.reduce((sum, entry) => sum + entry.totalServiceCost, 0),
      averagePartsPerService: 0,
      averagePartsCostPerService: 0,
      mostUsedParts: [],
      serviceTypeBreakdown: new Map(),
      technicianPerformance: new Map()
    }

    if (analytics.totalServices > 0) {
      analytics.averagePartsPerService = analytics.totalPartsUsed / analytics.totalServices
      analytics.averagePartsCostPerService = analytics.totalPartsCost / analytics.totalServices
    }

    // Calculate service type breakdown
    recentUsage.forEach(entry => {
      const current = analytics.serviceTypeBreakdown.get(entry.serviceType) || {
        count: 0,
        totalCost: 0,
        totalParts: 0
      }
      current.count++
      current.totalCost += entry.totalServiceCost
      current.totalParts += entry.partsUsed.length
      analytics.serviceTypeBreakdown.set(entry.serviceType, current)
    })

    // Calculate technician performance
    recentUsage.forEach(entry => {
      const current = analytics.technicianPerformance.get(entry.technician) || {
        servicesCompleted: 0,
        totalRevenue: 0,
        partsInstalled: 0
      }
      current.servicesCompleted++
      current.totalRevenue += entry.totalServiceCost
      current.partsInstalled += entry.partsUsed.length
      analytics.technicianPerformance.set(entry.technician, current)
    })

    // Get most used parts
    const partUsageMap = new Map()
    recentUsage.forEach(entry => {
      entry.partsUsed.forEach(part => {
        const current = partUsageMap.get(part.partId) || {
          partId: part.partId,
          name: part.name,
          partNumber: part.partNumber,
          totalQuantity: 0,
          totalCost: 0,
          usageCount: 0
        }
        current.totalQuantity += part.quantity
        current.totalCost += part.totalCost
        current.usageCount++
        partUsageMap.set(part.partId, current)
      })
    })

    analytics.mostUsedParts = Array.from(partUsageMap.values())
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10)

    return analytics
  }

  // Get customer parts history
  getCustomerPartsHistory(customerId) {
    const customerUsage = this.partsUsageHistory.filter(entry => entry.customerId === customerId)
    
    return {
      customerId,
      totalServices: customerUsage.length,
      totalPartsUsed: customerUsage.reduce((sum, entry) => 
        sum + entry.partsUsed.reduce((partSum, part) => partSum + part.quantity, 0), 0
      ),
      totalSpent: customerUsage.reduce((sum, entry) => sum + entry.totalServiceCost, 0),
      services: customerUsage.sort((a, b) => b.date - a.date),
      partsBreakdown: this.getCustomerPartsBreakdown(customerUsage),
      warrantyItems: this.getCustomerWarrantyItems(customerUsage)
    }
  }

  getCustomerPartsBreakdown(customerUsage) {
    const partsMap = new Map()
    
    customerUsage.forEach(entry => {
      entry.partsUsed.forEach(part => {
        const key = part.partId
        const current = partsMap.get(key) || {
          partId: part.partId,
          name: part.name,
          partNumber: part.partNumber,
          totalQuantity: 0,
          totalCost: 0,
          lastUsed: null,
          services: []
        }
        
        current.totalQuantity += part.quantity
        current.totalCost += part.totalCost
        current.lastUsed = entry.date > (current.lastUsed || new Date(0)) ? entry.date : current.lastUsed
        current.services.push({
          serviceId: entry.serviceId,
          date: entry.date,
          serviceType: entry.serviceType,
          quantity: part.quantity,
          cost: part.totalCost
        })
        
        partsMap.set(key, current)
      })
    })
    
    return Array.from(partsMap.values()).sort((a, b) => b.totalCost - a.totalCost)
  }

  getCustomerWarrantyItems(customerUsage) {
    const warrantyItems = []
    const now = new Date()
    
    customerUsage.forEach(entry => {
      entry.partsUsed.forEach(part => {
        if (part.warrantyPeriod && part.warrantyPeriod !== 'N/A') {
          const warrantyMonths = this.parseWarrantyPeriod(part.warrantyPeriod)
          const warrantyExpiry = new Date(entry.date)
          warrantyExpiry.setMonth(warrantyExpiry.getMonth() + warrantyMonths)
          
          warrantyItems.push({
            partId: part.partId,
            name: part.name,
            partNumber: part.partNumber,
            serviceId: entry.serviceId,
            serviceDate: entry.date,
            warrantyPeriod: part.warrantyPeriod,
            warrantyExpiry,
            isActive: warrantyExpiry > now,
            daysRemaining: Math.max(0, Math.ceil((warrantyExpiry - now) / (1000 * 60 * 60 * 24)))
          })
        }
      })
    })
    
    return warrantyItems.sort((a, b) => a.warrantyExpiry - b.warrantyExpiry)
  }

  parseWarrantyPeriod(warrantyPeriod) {
    const period = warrantyPeriod.toLowerCase()
    if (period.includes('year')) {
      const years = parseInt(period.match(/\d+/)[0])
      return years * 12
    } else if (period.includes('month')) {
      return parseInt(period.match(/\d+/)[0])
    }
    return 12 // Default to 12 months
  }

  // Calculate metrics
  calculateMetrics() {
    this.trackingMetrics.totalPartsUsed = this.partsUsageHistory.reduce((sum, entry) => 
      sum + entry.partsUsed.reduce((partSum, part) => partSum + part.quantity, 0), 0
    )
    
    this.trackingMetrics.totalCost = this.partsUsageHistory.reduce((sum, entry) => 
      sum + entry.totalPartsCost, 0
    )
    
    this.trackingMetrics.averagePartsPerService = this.partsUsageHistory.length > 0 
      ? this.trackingMetrics.totalPartsUsed / this.partsUsageHistory.length 
      : 0
  }

  // Get all service records
  getAllServiceRecords() {
    return Array.from(this.serviceRecords.values()).sort((a, b) => b.date - a.date)
  }

  // Get service record by ID
  getServiceRecord(serviceId) {
    return this.serviceRecords.get(serviceId)
  }

  // Get invoice data
  getInvoiceData(invoiceId) {
    return this.invoiceItems.get(invoiceId)
  }

  // Get all invoices
  getAllInvoices() {
    return Array.from(this.invoiceItems.values()).sort((a, b) => b.date - a.date)
  }

  // Update invoice payment status
  updateInvoicePayment(invoiceId, paymentStatus, paymentDate = new Date()) {
    const invoice = this.invoiceItems.get(invoiceId)
    if (invoice) {
      invoice.paymentStatus = paymentStatus
      invoice.paymentDate = paymentDate
      return invoice
    }
    return null
  }

  // Get parts usage trends
  getUsageTrends(days = 30) {
    const trends = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const dayUsage = this.partsUsageHistory.filter(entry => 
        entry.date >= date && entry.date < nextDate
      )
      
      trends.push({
        date: date.toISOString().split('T')[0],
        services: dayUsage.length,
        partsUsed: dayUsage.reduce((sum, entry) => 
          sum + entry.partsUsed.reduce((partSum, part) => partSum + part.quantity, 0), 0
        ),
        revenue: dayUsage.reduce((sum, entry) => sum + entry.totalServiceCost, 0)
      })
    }
    
    return trends
  }
}

// Create and export singleton instance
export const partsTrackingService = new PartsTrackingService()