"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings,
  Calendar,
  ChevronRight,
  PanelLeft,
  Package,
  FileText,
  DollarSign,
} from "lucide-react"
import { useUser } from "@clerk/clerk-react"
import logo from "@/assets/logo-white.png"

import { NavUser } from "@/components/nav-user"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Vehicle Store Navigation Data
const getNavigation = (userRole) => {
  const adminNav = [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Vehicles",
      icon: Car,
      items: [
        { title: "All Vehicles", view: "all-vehicles" },
        { title: "Add New", view: "add-vehicle" },
      ],
    },
    {
      title: "Customers",
      icon: Users,
      items: [
        { title: "All Customers", view: "all-customers" },
        { title: "Add Customer", view: "customer-onboarding" },
      ],
    },
    {
      title: "Service Intake",
      view: "service-intake",
      icon: ClipboardList,
    },
    {
      title: "Invoices",
      view: "invoices",
      icon: FileText,
    },
    {
      title: "Inventory",
      view: "inventory",
      icon: Package,
    },
    {
      title: "Parts Analytics",
      view: "parts-analytics",
      icon: BarChart3,
    },
    {
      title: "Auto Reordering",
      view: "reordering-dashboard",
      icon: Package,
    },
    {
      title: "Customer Portal",
      view: "customer-portal",
      icon: Users,
    },
    {
      title: "Reports",
      view: "reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      view: "settings",
      icon: Settings,
    },
  ]

  const employeeNav = [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Schedule",
      view: "schedule",
      icon: Calendar,
    },
    {
      title: "Service Intake",
      view: "service-intake",
      icon: ClipboardList,
    },
    {
      title: "Vehicles",
      icon: Car,
      items: [
        { title: "All Vehicles", view: "all-vehicles" },
        { title: "Add New", view: "add-vehicle" },
      ],
    },
    {
      title: "Customers",
      icon: Users,
      items: [
        { title: "All Customers", view: "all-customers" },
        { title: "Add Customer", view: "customer-onboarding" },
      ],
    },
  ]

  return userRole === 'admin' ? adminNav : employeeNav
}

export function AppSidebar({
  onNavigate,
  ...props
}) {
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role || 'employee'
  const navMain = getNavigation(userRole)
  
  const userData = {
    name: user?.fullName || user?.firstName || "User",
    email: user?.primaryEmailAddress?.emailAddress || "user@example.com",
    avatar: user?.imageUrl,
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-800 !bg-black" {...props}>
      <SidebarHeader className="border-b border-gray-800 !bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full py-2">
              <SidebarMenuButton size="lg" asChild className="flex-1 hover:bg-gray-800/50">
                <a href="#" className="hover:bg-transparent"> 
                  <div className="flex flex-col items-start gap-2 w-full">
                    <img src={logo} alt="Reznico Care" className="h-10 w-auto object-contain" />
                  </div>
                </a>
              </SidebarMenuButton>
              <SidebarTrigger className="ml-auto hover:bg-gray-800/50 text-gray-400 hover:text-[#D4FF00]" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="!bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 uppercase text-xs font-semibold tracking-wider">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.title === "Dashboard"}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      className="hover:bg-gray-800/50 data-[state=open]:bg-gray-800/50 text-gray-300 hover:text-[#D4FF00] transition-colors"
                      onClick={() => {
                        if (item.view && onNavigate) {
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                          onNavigate(item.view)
                        }
                      }}
                    >
                      {item.icon && <item.icon className="text-[#D4FF00]" />}
                      <span>{item.title}</span>
                      {item.items && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-gray-500" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild 
                              className="hover:bg-gray-800/30 text-gray-400 hover:text-[#D4FF00]"
                            >
                              <button
                                onClick={() => {
                                  if (subItem.view && onNavigate) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                    onNavigate(subItem.view)
                                  }
                                }}
                                className="w-full text-left"
                              >
                                <span>{subItem.title}</span>
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-800 !bg-black">
        <NavUser user={userData} />
        <div className="px-3 py-2">
          <Separator className="mb-2 bg-gray-800" />
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>© 2025 Reznico Care</span>
              <span className="font-medium text-[#D4FF00]">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <span className="font-medium text-gray-400">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
