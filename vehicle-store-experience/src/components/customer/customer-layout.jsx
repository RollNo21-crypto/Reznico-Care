import React, { useState, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  ClipboardList, 
  FileText, 
  Calendar, 
  User, 
  LogOut,
  Bell,
  Settings
} from 'lucide-react'
import logo from '@/assets/logo-white.png'

export default function CustomerLayout({ children }) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const customerName = user?.fullName || user?.firstName || "Customer"
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const navigationItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "services", label: "Services", icon: ClipboardList },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "appointments", label: "Bookings", icon: Calendar },
    { id: "profile", label: "Profile", icon: User }
  ]

  const handleNavigation = (viewId) => {
    if (onNavigate) {
      onNavigate(viewId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo and Welcome */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Reznico Care" className="h-8 w-8" />
            <div>
              <h1 className="text-lg font-bold text-white">Hi, {customerName.split(' ')[0]} 👋</h1>
              <p className="text-xs text-gray-400">Customer Portal</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-gray-800"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#D4FF00] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">2</span>
              </span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-800"
              onClick={() => handleNavigation('settings')}
            >
              <Settings className="h-5 w-5 text-gray-400" />
            </Button>

            {/* Sign Out */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-800 hover:text-red-400"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 hover:text-[#D4FF00]"
                onClick={() => setShowNotifications(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-white">Your brake inspection is complete!</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-white">Appointment reminder: Tire rotation tomorrow at 10:00 AM</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Mobile App Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50">
        <div className="flex items-center justify-around px-2 py-2">
        <button 
           onClick={() => window.location.href = '/customer-dashboard'}
           className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
             currentPath === '/customer-dashboard' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white'
           }`}
         >
           <Home className="h-5 w-5" />
           <span className="text-xs font-medium">Home</span>
         </button>
        
        <button 
           onClick={() => window.location.href = '/customer-services'}
           className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
             currentPath === '/customer-services' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white'
           }`}
         >
           <ClipboardList className="h-5 w-5" />
           <span className="text-xs font-medium">Services</span>
         </button>
        
        <button 
           onClick={() => window.location.href = '/customer-invoices'}
           className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
             currentPath === '/customer-invoices' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white'
           }`}
         >
           <FileText className="h-5 w-5" />
           <span className="text-xs font-medium">Invoices</span>
         </button>
         
         <button 
           onClick={() => window.location.href = '/customer-dashboard'}
           className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
             currentPath === '/customer-bookings' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white'
           }`}
         >
           <Calendar className="h-5 w-5" />
           <span className="text-xs font-medium">Bookings</span>
         </button>
         
         <button 
           onClick={() => window.location.href = '/customer-profile'}
           className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
             currentPath === '/customer-profile' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white'
           }`}
         >
           <User className="h-5 w-5" />
           <span className="text-xs font-medium">Profile</span>
         </button>
        </div>
      </nav>

      {/* Safe Area for iOS devices */}
      <div className="h-safe-area-inset-bottom bg-gray-900"></div>
    </div>
  )
}