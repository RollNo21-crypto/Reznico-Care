import { useState } from 'react'
import { UserButton } from '@clerk/clerk-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { NotificationsDrawer } from '@/components/notifications-drawer'
import { Dashboard } from '@/components/dashboard'
import { ServiceIntake } from '@/components/service-intake'
import { AllVehicles } from '@/components/vehicles/all-vehicles'
import { AddVehicle } from '@/components/vehicles/add-vehicle'
import { AllCustomers } from '@/components/customers/all-customers'
import { Settings } from '@/components/settings'
import { ScheduleTracker } from '@/components/schedule-tracker'
import { Reports } from '@/components/reports'
import { Inventory } from '@/components/inventory'
import { Invoices } from '@/components/invoices'
import { CustomerOnboarding } from '@/components/customer-onboarding'

export function AdminLayout({ currentView, setCurrentView }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-950">
        <AppSidebar onNavigate={setCurrentView} />
        <main className="flex-1 bg-gray-950">
          {/* Header with sidebar trigger and breadcrumbs */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 px-6">
            <SidebarTrigger className="text-gray-400 hover:text-[#D4FF00]" />
            <Separator orientation="vertical" className="h-6 bg-gray-800" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-medium">
                    {currentView === 'dashboard' && 'Admin Dashboard'}
                    {currentView === 'service-intake' && 'Service Intake'}
                    {currentView === 'customer-onboarding' && 'Customer Onboarding'}
                    {currentView === 'all-vehicles' && 'All Vehicles'}
                    {currentView === 'add-vehicle' && 'Add Vehicle'}
                    {currentView === 'all-customers' && 'All Customers'}
                    {currentView === 'settings' && 'Settings'}
                    {currentView === 'schedule' && 'My Schedule'}
                    {currentView === 'reports' && 'Reports & Analytics'}
                    {currentView === 'inventory' && 'Inventory Management'}
                    {currentView === 'invoices' && 'Invoices & Billing'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Button 
                onClick={() => setCurrentView('customer-onboarding')}
                className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                size="sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
              <NotificationsDrawer />
              <UserButton appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                  userButtonTrigger: "focus:shadow-none"
                }
              }} />
            </div>
          </header>
          
          {/* Main content area */}
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'service-intake' && <ServiceIntake />}
          {currentView === 'all-vehicles' && <AllVehicles onNavigate={setCurrentView} />}
          {currentView === 'add-vehicle' && <AddVehicle onNavigate={setCurrentView} />}
          {currentView === 'all-customers' && <AllCustomers onNavigate={setCurrentView} />}
          {currentView === 'settings' && <Settings onNavigate={setCurrentView} />}
          {currentView === 'schedule' && <ScheduleTracker onNavigate={setCurrentView} />}
          {currentView === 'reports' && <Reports onNavigate={setCurrentView} />}
          {currentView === 'inventory' && <Inventory onNavigate={setCurrentView} />}
          {currentView === 'invoices' && <Invoices onNavigate={setCurrentView} />}
          {currentView === 'customer-onboarding' && (
            <div className="p-6 bg-gray-950">
              <div className="max-w-4xl mx-auto space-y-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentView('dashboard')}
                  className="border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-[#D4FF00]"
                >
                  ← Back to Dashboard
                </Button>
                <CustomerOnboarding
                  onComplete={(data) => {
                    console.log('Customer onboarded:', data)
                    setTimeout(() => setCurrentView('dashboard'), 2000)
                  }}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}