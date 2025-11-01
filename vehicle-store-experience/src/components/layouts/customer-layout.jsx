import CustomerDashboard from '@/components/customer-dashboard'
import { CustomerServices } from '@/components/customer/customer-services'
import { CustomerInvoices } from '@/components/customer/customer-invoices'
import { CustomerProfile } from '@/components/customer/customer-profile'

export function CustomerLayout({ currentView, setCurrentView }) {
  // Customer portal has its own separate layout without sidebar
  if (currentView === 'customer-dashboard') {
    return <CustomerDashboard />
  }

  if (currentView === 'customer-services') {
    return <CustomerServices />
  }

  if (currentView === 'customer-invoices') {
    return <CustomerInvoices />
  }

  if (currentView === 'customer-profile') {
    return <CustomerProfile />
  }

  // Default to dashboard if no specific view
  return <CustomerDashboard />
}