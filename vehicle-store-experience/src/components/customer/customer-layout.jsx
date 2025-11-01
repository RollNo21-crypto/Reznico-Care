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
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          {/* Logo and Welcome */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <img src={logo} alt="Reznico Care" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-bold text-white truncate">Hi, {customerName.split(' ')[0]} 👋</h1>
              <p className="text-[10px] sm:text-xs text-gray-400">Customer Portal</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-gray-800"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3 w-3 sm:h-4 sm:w-4 bg-[#D4FF00] rounded-full flex items-center justify-center">
                <span className="text-[8px] sm:text-xs font-bold text-black">2</span>
              </span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-gray-800"
              onClick={() => handleNavigation('settings')}
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>

            {/* Sign Out */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-gray-800 hover:text-red-400"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 hover:text-[#D4FF00] h-6 px-2"
                onClick={() => setShowNotifications(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-2">
              <div className="p-2 sm:p-3 bg-gray-800 rounded-lg">
                <p className="text-xs sm:text-sm text-white">Your brake inspection is complete!</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="p-2 sm:p-3 bg-gray-800 rounded-lg">
                <p className="text-xs sm:text-sm text-white">Appointment reminder: Tire rotation tomorrow at 10:00 AM</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">1 day ago</p>
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
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-1 py-2 sm:px-2">
        <button 
           onClick={() => window.location.href = '/customer-dashboard'}
           className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
             currentPath === '/customer-dashboard' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white active:bg-gray-800/50'
           }`}
         >
           <Home className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
           <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">Home</span>
         </button>
        
        <button 
           onClick={() => window.location.href = '/customer-services'}
           className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
             currentPath === '/customer-services' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white active:bg-gray-800/50'
           }`}
         >
           <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
           <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">Services</span>
         </button>
        
        <button 
           onClick={() => window.location.href = '/customer-invoices'}
           className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
             currentPath === '/customer-invoices' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white active:bg-gray-800/50'
           }`}
         >
           <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
           <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">Invoices</span>
         </button>
         
         <button 
           onClick={() => window.location.href = '/customer-dashboard'}
           className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
             currentPath === '/customer-bookings' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white active:bg-gray-800/50'
           }`}
         >
           <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
           <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">Bookings</span>
         </button>
         
         <button 
           onClick={() => window.location.href = '/customer-profile'}
           className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
             currentPath === '/customer-profile' 
               ? 'bg-[#D4FF00]/20 text-[#D4FF00]' 
               : 'text-gray-400 hover:text-white active:bg-gray-800/50'
           }`}
         >
           <User className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
           <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">Profile</span>
         </button>
        </div>
      </nav>

      {/* Safe Area for iOS devices */}
      <div className="h-safe-area-inset-bottom bg-gray-900"></div>
    </div>
  )
}