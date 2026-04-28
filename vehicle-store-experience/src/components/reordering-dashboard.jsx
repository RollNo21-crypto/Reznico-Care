import React, { useState, useEffect } from 'react'
import { automatedReorderingService } from '../services/automated-reordering-service'
import partsService from '../services/parts-service'

const ReorderingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [reorderingReport, setReorderingReport] = useState(null)
  const [pendingOrders, setPendingOrders] = useState([])
  const [notifications, setNotifications] = useState([])
  const [reorderRules, setReorderRules] = useState([])
  const [supplierPerformance, setSupplierPerformance] = useState([])
  const [inventoryStatus, setInventoryStatus] = useState([])
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showCreateRule, setShowCreateRule] = useState(false)

  useEffect(() => {
    loadDashboardData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const [report, orders, notifs, rules, performance, inventory] = await Promise.all([
        automatedReorderingService.getReorderingReport(30),
        automatedReorderingService.getPendingOrders(),
        automatedReorderingService.getNotifications(),
        automatedReorderingService.getAllReorderRules(),
        automatedReorderingService.getSupplierPerformance(),
        partsService.getInventoryStatus()
      ])

      setReorderingReport(report)
      setPendingOrders(orders)
      setNotifications(notifs)
      setReorderRules(rules)
      setSupplierPerformance(performance)
      setInventoryStatus(inventory)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      automatedReorderingService.stopMonitoring()
    } else {
      automatedReorderingService.startMonitoring()
    }
    setIsMonitoring(!isMonitoring)
  }

  const handleMarkNotificationRead = (notificationId) => {
    automatedReorderingService.markNotificationRead(notificationId)
    loadDashboardData()
  }

  const handleConfirmOrder = async (orderId, confirmationDetails) => {
    try {
      await automatedReorderingService.confirmOrder(orderId, confirmationDetails)
      loadDashboardData()
    } catch (error) {
      console.error('Error confirming order:', error)
    }
  }

  const handleReceiveOrder = async (orderId, receivedQuantity) => {
    try {
      await automatedReorderingService.receiveOrder(orderId, receivedQuantity)
      loadDashboardData()
    } catch (error) {
      console.error('Error receiving order:', error)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      sent: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      received: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    }
    return colors[priority] || 'text-gray-600'
  }

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Monitoring Status */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Monitoring Status</h3>
          <button
            onClick={handleToggleMonitoring}
            className={`px-4 py-2 rounded-lg font-medium ${
              isMonitoring 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
            }`}
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-400">
            {isMonitoring ? 'Automatic reordering is active' : 'Automatic reordering is paused'}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      {reorderingReport && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Orders (30d)</p>
                <p className="text-2xl font-bold text-white">{reorderingReport.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-white">₹{reorderingReport.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Auto Orders</p>
                <p className="text-2xl font-bold text-white">{reorderingReport.automaticOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Manual Orders</p>
                <p className="text-2xl font-bold text-white">{reorderingReport.manualOrders}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-500' : 'bg-[#D4FF00]'}`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{notification.message}</p>
                <p className="text-xs text-gray-400">{notification.timestamp.toLocaleString()}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => handleMarkNotificationRead(notification.id)}
                  className="text-xs text-[#D4FF00] hover:text-white"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const OrdersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Purchase Orders</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Manual Order
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Part</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {pendingOrders.map((order) => (
              <tr key={order.orderId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {order.partName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {order.supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₹{order.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[#D4FF00] hover:text-white mr-3"
                  >
                    View
                  </button>
                  {order.status === 'sent' && (
                    <button
                      onClick={() => handleConfirmOrder(order.orderId, { supplierReference: 'REF-123', expectedDelivery: new Date() })}
                      className="text-green-400 hover:text-white"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const RulesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reorder Rules</h3>
        <button
          onClick={() => setShowCreateRule(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Rule
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Reorder</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reorderRules.map((rule) => (
              <tr key={rule.partId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rule.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rule.minStock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rule.reorderQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{rule.maxPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getPriorityColor(rule.priority)}`}>
                    {rule.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rule.autoReorder ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const InventoryTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Inventory Status</h3>
      
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Part</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Min Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {inventoryStatus.map((item) => {
              const rule = reorderRules.find(r => r.partId === item.id)
              const isLowStock = rule && item.currentStock <= rule.minStock
              
              return (
                <tr key={item.id} className={isLowStock ? 'bg-red-900/20' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.currentStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {rule?.minStock || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      isLowStock ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {isLowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {item.lastUpdated?.toLocaleDateString() || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isLowStock && (
                      <button className="text-[#D4FF00] hover:text-white">
                        Reorder Now
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const PerformanceTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Supplier Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplierPerformance.map((supplier) => (
          <div key={supplier.id} className="bg-gray-800 rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-white mb-4">{supplier.name}</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Orders:</span>
                <span className="text-sm font-medium text-white">{supplier.totalOrders}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Completion Rate:</span>
                <span className="text-sm font-medium text-white">{supplier.completionRate.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">On-Time Rate:</span>
                <span className="text-sm font-medium text-white">{supplier.onTimeRate.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Avg Delivery:</span>
                <span className="text-sm font-medium text-white">{supplier.averageDeliveryTime.toFixed(1)} days</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Value:</span>
                <span className="text-sm font-medium text-white">₹{supplier.totalValue.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${supplier.completionRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Overall Performance</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Automated Reordering Dashboard</h1>
        <p className="mt-2 text-gray-400">Monitor and manage automated parts reordering system</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'orders', name: 'Orders' },
            { id: 'rules', name: 'Reorder Rules' },
            { id: 'inventory', name: 'Inventory' },
            { id: 'performance', name: 'Performance' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#D4FF00] text-[#D4FF00]'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'orders' && <OrdersTab />}
      {activeTab === 'rules' && <RulesTab />}
      {activeTab === 'inventory' && <InventoryTab />}
      {activeTab === 'performance' && <PerformanceTab />}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-white mb-4">Order Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-400">Order ID:</label>
                  <p className="text-sm text-white">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Part:</label>
                  <p className="text-sm text-white">{selectedOrder.partName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Supplier:</label>
                  <p className="text-sm text-white">{selectedOrder.supplier.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Quantity:</label>
                  <p className="text-sm text-white">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Total Price:</label>
                  <p className="text-sm text-white">₹{selectedOrder.totalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Status:</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 hover:text-white"
                >
                  Close
                </button>
                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      handleReceiveOrder(selectedOrder.orderId, selectedOrder.quantity)
                      setSelectedOrder(null)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark Received
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReorderingDashboard