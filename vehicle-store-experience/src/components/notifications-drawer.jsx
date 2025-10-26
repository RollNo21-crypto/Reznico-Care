import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  Car,
  Users,
  ClipboardList,
  Calendar,
  Package,
  FileText,
  Wrench,
  CheckCircle,
} from "lucide-react"

const recentActivities = [
  {
    type: "vehicle",
    title: "2024 Tesla Model 3 Added",
    date: "10 mins ago",
    description: "New electric sedan added to inventory",
    details: "Stock #: EV-2024-001 | Price: $42,990",
    icon: Car,
    unread: true,
  },
  {
    type: "service",
    title: "Service Request Completed",
    date: "1 hour ago",
    description: "Oil change and tire rotation completed",
    details: "Customer: John Doe | Vehicle: 2022 Honda Accord",
    icon: Wrench,
    unread: true,
  },
  {
    type: "customer",
    title: "New Customer Onboarded",
    date: "2 hours ago",
    description: "Jane Smith registered as new customer",
    details: "Interested in: SUV, Electric vehicles",
    icon: Users,
    unread: true,
  },
  {
    type: "appointment",
    title: "Upcoming Appointment",
    date: "Today 3:00 PM",
    description: "Test drive scheduled for 2024 Ford F-150",
    details: "Customer: Mike Johnson",
    icon: Calendar,
    unread: false,
  },
  {
    type: "vehicle",
    title: "Vehicle Sold",
    date: "Yesterday",
    description: "2023 Toyota Camry sold for $28,500",
    details: "Customer: Sarah Williams | Sales Rep: Tom Brown",
    icon: Package,
    unread: false,
  },
  {
    type: "service",
    title: "Service Scheduled",
    date: "Yesterday",
    description: "Brake inspection scheduled for tomorrow",
    details: "Customer: David Lee | Vehicle: 2021 BMW X5",
    icon: ClipboardList,
    unread: false,
  },
  {
    type: "report",
    title: "Monthly Report Generated",
    date: "2 days ago",
    description: "October sales report ready for review",
    details: "Total Sales: $485,000 | Units Sold: 18",
    icon: FileText,
    unread: false,
  },
  {
    type: "vehicle",
    title: "Inventory Update",
    date: "3 days ago",
    description: "Stock level update completed",
    details: "Total Vehicles: 245 | Available: 189",
    icon: Car,
    unread: false,
  },
]

export function NotificationsDrawer() {
  const [activities, setActivities] = React.useState(recentActivities)
  const unreadCount = activities.filter((a) => a.unread).length

  const markAllAsRead = () => {
    setActivities(activities.map((a) => ({ ...a, unread: false })))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications & Activity</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
          <SheetDescription>
            Recent updates and activities in your vehicle store
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <div className="space-y-2">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className={`flex gap-4 rounded-lg border p-4 transition-colors hover:bg-accent ${
                    activity.unread ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-tight">
                        {activity.title}
                      </p>
                      {activity.unread && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {activity.date}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
