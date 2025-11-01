import './App.css'
import { useState, useEffect } from 'react'
import { 
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/clerk-react'
import { 
  detectDomainType, 
  getDomainRole, 
  getDefaultView, 
  isViewAllowed,
  DOMAIN_TYPES 
} from '@/utils/domain-detection'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Dashboard } from '@/components/dashboard'
import { EmployeeDashboard } from '@/components/employee-dashboard'
import { ServiceIntake } from '@/components/service-intake'
import { AdminLogin } from '@/components/auth/admin-login'
import { EmployeeLogin } from '@/components/auth/employee-login'
import { Signup } from '@/components/auth/signup'
import { LandingPage } from '@/components/landing-page'
import { CustomerOnboarding } from '@/components/customer-onboarding'
import { NotificationsDrawer } from '@/components/notifications-drawer'
import { Unauthorized } from '@/components/unauthorized'
import { AdminLayout } from '@/components/layouts/admin-layout'
import { EmployeeLayout } from '@/components/layouts/employee-layout'
import { CustomerLayout } from '@/components/layouts/customer-layout'
import { AllVehicles } from '@/components/vehicles/all-vehicles'
import { AddVehicle } from '@/components/vehicles/add-vehicle'
import { AllCustomers } from '@/components/customers/all-customers'
import { Settings } from '@/components/settings'
import { ScheduleTracker } from '@/components/schedule-tracker'
import { Reports } from '@/components/reports'
import { Inventory } from '@/components/inventory'
import { Invoices } from '@/components/invoices'
import { CustomerLogin } from '@/components/auth/customer-login'
import CustomerDashboard from '@/components/customer-dashboard'
import { CustomerServices } from '@/components/customer/customer-services'
import { CustomerInvoices } from '@/components/customer/customer-invoices'
import { CustomerProfile } from '@/components/customer/customer-profile'
import { PartsAnalyticsDashboard } from '@/components/parts-analytics-dashboard'
import ReorderingDashboard from '@/components/reordering-dashboard'
import { CustomerPortal } from '@/components/customer-portal'
import { Button } from '@/components/ui/button'
import { ClipboardList, UserPlus, Home, ArrowLeft } from 'lucide-react'
import logo from '@/assets/logo-white.png'

function App() {
  const { user, isSignedIn, isLoaded } = useUser()
  const domainType = detectDomainType()
  const domainRole = getDomainRole(domainType)
  const userRole = user?.publicMetadata?.role || domainRole // Use domain role as fallback
  const [currentView, setCurrentView] = useState('landing')

  // Set appropriate default view based on domain and authentication status
  useEffect(() => {
    if (isLoaded) {
      const defaultView = getDefaultView(domainType, isSignedIn)
      setCurrentView(defaultView)
    }
  }, [domainType, isSignedIn, isLoaded])

  const renderContent = () => {
    // Handle unauthorized access
    if (currentView === 'unauthorized') {
      return <Unauthorized />
    }

    // Domain-specific rendering for subdomains
    if (domainType !== DOMAIN_TYPES.MAIN) {
      return renderDomainSpecificContent()
    }

    // Main domain rendering (existing logic)
    return renderMainDomainContent()
  }

  const renderDomainSpecificContent = () => {
    if (!isSignedIn) {
      // Show login page for the specific domain
      if (domainType === DOMAIN_TYPES.ADMIN) {
        return <AdminLogin onNavigate={setCurrentView} />
      }
      if (domainType === DOMAIN_TYPES.EMPLOYEE) {
        return <EmployeeLogin onNavigate={setCurrentView} />
      }
      if (domainType === DOMAIN_TYPES.CUSTOMER) {
        return <CustomerLogin onNavigate={setCurrentView} />
      }
    }

    // User is signed in, show the appropriate dashboard/layout
    if (domainType === DOMAIN_TYPES.ADMIN) {
      return <AdminLayout currentView={currentView} setCurrentView={setCurrentView} />
    }
    if (domainType === DOMAIN_TYPES.EMPLOYEE) {
      return <EmployeeLayout currentView={currentView} setCurrentView={setCurrentView} />
    }
    if (domainType === DOMAIN_TYPES.CUSTOMER) {
      return <CustomerLayout currentView={currentView} setCurrentView={setCurrentView} />
    }

    return <div>Unknown domain type</div>
  }

  const renderMainDomainContent = () => {
    // Show loading spinner while Clerk is initializing
    if (!isLoaded) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }

    // Show login pages
    if (currentView === 'admin-login') {
      return <AdminLogin onNavigate={setCurrentView} />
    }

    if (currentView === 'employee-login') {
      return <EmployeeLogin onNavigate={setCurrentView} />
    }

    if (currentView === 'customer-login') {
      return <CustomerLogin onNavigate={setCurrentView} />
    }

    if (currentView === 'signup') {
      return <Signup />
    }

    // Landing page - main entry point
    if (currentView === 'landing' && !isSignedIn) {
      return <LandingPage onGetStarted={() => setCurrentView('home')} />
    }

    // Home page - choose login type
    if (currentView === 'home' && !isSignedIn) {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Full-Width Header with Logo */}
          <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Reznico Care" className="h-8 md:h-10 w-auto" />
             
            </div>
            <button
              onClick={() => setCurrentView('landing')}
              className="text-gray-400 hover:text-[#D4FF00] transition-colors inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </header>

          {/* Split Screen Content */}
          <div className="flex-1 flex">
          {/* Left Column - Animated Images/Visual */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/10 via-transparent to-black/50 z-10"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-64 h-64 bg-[#D4FF00] rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C4EF00] rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center px-12 xl:px-20 text-white">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl xl:text-6xl font-bold tracking-tight">
                    Welcome to
                  </h2>
                  <h1 className="text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#D4FF00] to-[#C4EF00] bg-clip-text text-transparent">
                    Reznico Care
                  </h1>
                </div>
                
                <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                  Streamline your vehicle store operations with our comprehensive management system
                </p>
                
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#D4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">Real-time Dashboard Analytics</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#D4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">Customer Service Management</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#D4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">Vehicle Intake System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Role Selection */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-lg space-y-8">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#D4FF00] to-[#C4EF00] bg-clip-text text-transparent">
                  Reznico Care
                </h1>
              </div>

              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Choose Your Role</h2>
                  <p className="text-gray-400 text-lg">Select how you want to access the system</p>
                </div>

                <div className="space-y-4">
                  {/* Admin Login Button */}
                  <button
                    onClick={() => setCurrentView('admin-login')}
                    className="group w-full relative overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 text-left transition-all hover:border-[#D4FF00] hover:shadow-2xl hover:scale-[1.02] duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Home className="h-8 w-8 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF00] transition-colors mb-1">
                          Admin / Owner
                        </h3>
                        <p className="text-sm text-gray-400">
                          Dashboard, analytics & business management
                        </p>
                      </div>
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-[#D4FF00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Employee Login Button */}
                  <button
                    onClick={() => setCurrentView('employee-login')}
                    className="group w-full relative overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 text-left transition-all hover:border-[#D4FF00] hover:shadow-2xl hover:scale-[1.02] duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <ClipboardList className="h-8 w-8 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF00] transition-colors mb-1">
                          Employee / Worker
                        </h3>
                        <p className="text-sm text-gray-400">
                          Service intake & customer onboarding
                        </p>
                      </div>
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-[#D4FF00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Customer Login Button */}
                  <button
                    onClick={() => setCurrentView('customer-login')}
                    className="group w-full relative overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 text-left transition-all hover:border-[#D4FF00] hover:shadow-2xl hover:scale-[1.02] duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <UserPlus className="h-8 w-8 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF00] transition-colors mb-1">
                          Customer
                        </h3>
                        <p className="text-sm text-gray-400">
                          Track services, invoices & appointments
                        </p>
                      </div>
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-[#D4FF00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Demo Credentials Info */}
                <div className="mt-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white mb-1">Demo Admin Access</h4>
                      <p className="text-xs text-gray-400">
                        Use provided demo credentials to explore admin features
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>

          {/* Full-Width Footer */}
          <footer className="border-t border-gray-800 px-6 py-4 md:px-12">
            <p className="text-center text-xs text-gray-500">
              © 2025 Reznico Care • v1.0.0
            </p>
          </footer>
        </div>
      )
    }

    // Customer dashboard and modules (no sidebar, separate portal)
    if (currentView === 'customer-dashboard') {
      console.log('Rendering customer dashboard, isSignedIn:', isSignedIn)
      if (!isSignedIn) {
        console.log('Not signed in, redirecting to customer login')
        setCurrentView('customer-login')
        return null
      }
      console.log('Rendering CustomerDashboard component')
      return <CustomerDashboard />
    }

    if (currentView === 'customer-services') {
      if (!isSignedIn) {
        setCurrentView('customer-login')
        return null
      }
      return <CustomerServices />
    }

    if (currentView === 'customer-invoices') {
      if (!isSignedIn) {
        setCurrentView('customer-login')
        return null
      }
      return <CustomerInvoices />
    }

    if (currentView === 'customer-profile') {
      if (!isSignedIn) {
        setCurrentView('customer-login')
        return null
      }
      return <CustomerProfile />
    }

    // Redirect to home if not signed in
    if (!isSignedIn && currentView !== 'home') {
      setCurrentView('home')
      return null
    }

    // Main application with sidebar only
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
                      {currentView === 'dashboard' && 'Dashboard'}
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
                      {currentView === 'parts-analytics' && 'Parts Analytics'}
                      {currentView === 'reordering-dashboard' && 'Automated Reordering'}
                      {currentView === 'customer-portal' && 'Customer Portal'}
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
            {currentView === 'dashboard' && (
              userRole === 'admin' ? <Dashboard onNavigate={setCurrentView} /> : <EmployeeDashboard onNavigate={setCurrentView} />
            )}
            {currentView === 'service-intake' && <ServiceIntake />}
            {currentView === 'all-vehicles' && <AllVehicles onNavigate={setCurrentView} />}
            {currentView === 'add-vehicle' && <AddVehicle onNavigate={setCurrentView} />}
            {currentView === 'all-customers' && <AllCustomers onNavigate={setCurrentView} />}
            {currentView === 'settings' && <Settings onNavigate={setCurrentView} />}
            {currentView === 'schedule' && <ScheduleTracker onNavigate={setCurrentView} />}
            {currentView === 'reports' && <Reports onNavigate={setCurrentView} />}
            {currentView === 'inventory' && <Inventory onNavigate={setCurrentView} />}
            {currentView === 'invoices' && <Invoices onNavigate={setCurrentView} />}
            {currentView === 'parts-analytics' && <PartsAnalyticsDashboard onNavigate={setCurrentView} />}
            {currentView === 'reordering-dashboard' && <ReorderingDashboard onNavigate={setCurrentView} />}
            {currentView === 'customer-portal' && <CustomerPortal onNavigate={setCurrentView} />}
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

  // Handle routing based on domain and authentication
  useEffect(() => {
    if (!isLoaded) return

    // If on a specific domain, enforce role-based access
    if (domainType !== DOMAIN_TYPES.MAIN) {
      if (!isSignedIn) {
        // Show domain-specific login
        setCurrentView(`${domainRole}-login`)
        return
      }

      // Check if user has permission for this domain
      if (userRole !== domainRole) {
        // Redirect to appropriate domain or show error
        setCurrentView('unauthorized')
        return
      }

      // Set domain-specific default view
      setCurrentView(getDefaultView(domainType))
      return
    }

    // Main domain logic (existing logic)
    const path = window.location.pathname
    console.log('Current path:', path, 'isSignedIn:', isSignedIn, 'userRole:', userRole)
    
    // Customer routes
    if (path === '/customer-login') {
      setCurrentView('customer-login')
      return
    }
    if (path === '/customer-dashboard') {
      setCurrentView('customer-dashboard')
      return
    }
    if (path === '/customer-services') {
      setCurrentView('customer-services')
      return
    }
    if (path === '/customer-invoices') {
      setCurrentView('customer-invoices')
      return
    }
    if (path === '/customer-profile') {
      setCurrentView('customer-profile')
      return
    }
    
    if (path === '/admin-login') {
      setCurrentView('admin-login')
    } else if (path === '/employee-login') {
      setCurrentView('employee-login')
    } else if (path === '/signup') {
      setCurrentView('signup')
    } else if (path === '/choose-role') {
      setCurrentView('home')
    } else if (isSignedIn) {
      // Set view based on path or default to role-based view
      if (path === '/dashboard') {
        setCurrentView('dashboard')
      } else if (path === '/service-intake') {
        setCurrentView('service-intake')
      } else {
        // Default view based on role - prioritize customer dashboard for customer users
        if (userRole === 'customer') {
          setCurrentView('customer-dashboard')
        } else if (userRole === 'admin') {
          setCurrentView('dashboard')
        } else if (userRole === 'employee') {
          setCurrentView('service-intake')
        } else {
          // If no specific role is set, check the login path to determine intent
          if (path.includes('customer') || window.location.search.includes('customer')) {
            setCurrentView('customer-dashboard')
          } else {
            setCurrentView('customer-dashboard') // Default to customer dashboard
          }
        }
      }
    } else {
      setCurrentView('landing')
    }
  }, [isLoaded, isSignedIn, userRole, domainType, domainRole])

  // Update URL when view changes
  useEffect(() => {
    const paths = {
      'landing': '/',
      'home': '/choose-role',
      'signup': '/signup',
      'admin-login': '/admin-login',
      'employee-login': '/employee-login',
      'dashboard': '/dashboard',
      'service-intake': '/service-intake',
      'customer-onboarding': '/customer-onboarding',
      'all-vehicles': '/vehicles',
      'add-vehicle': '/vehicles/add',
      'all-customers': '/customers',
      'settings': '/settings',
      'schedule': '/schedule',
      'reports': '/reports',
      'inventory': '/inventory',
      'invoices': '/invoices',
      'customer-login': '/customer-login',
      'customer-dashboard': '/customer-dashboard',
      'customer-services': '/customer-services',
      'customer-invoices': '/customer-invoices',
      'customer-profile': '/customer-profile'
    }
    if (paths[currentView]) {
      window.history.pushState({}, '', paths[currentView])
    }
  }, [currentView])

  return renderContent()
}

export default App
