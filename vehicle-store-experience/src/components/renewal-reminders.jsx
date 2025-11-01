import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Bell, 
  Calendar, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Car,
  FileText,
  Settings,
  Smartphone,
  Mail,
  MessageSquare,
  X,
  Plus,
  Edit
} from 'lucide-react'

// Mock reminder data
const REMINDERS = [
  {
    id: 'insurance-renewal',
    type: 'insurance',
    title: 'Insurance Policy Renewal',
    description: 'Your car insurance policy is expiring soon',
    dueDate: '2024-03-15',
    daysUntilDue: 45,
    status: 'upcoming',
    priority: 'high',
    documentType: 'Insurance Policy',
    lastUpdated: '2024-01-15',
    reminderSettings: {
      enabled: true,
      advanceNotice: [60, 30, 15, 7, 1], // days before
      channels: ['push', 'email', 'sms']
    }
  },
  {
    id: 'puc-renewal',
    type: 'puc',
    title: 'PUC Certificate Renewal',
    description: 'Your Pollution Under Control certificate has expired',
    dueDate: '2024-01-20',
    daysUntilDue: -10,
    status: 'overdue',
    priority: 'critical',
    documentType: 'PUC Certificate',
    lastUpdated: '2023-11-20',
    reminderSettings: {
      enabled: true,
      advanceNotice: [30, 15, 7, 1],
      channels: ['push', 'email']
    }
  },
  {
    id: 'service-due',
    type: 'service',
    title: '6-Month Service Due',
    description: 'Based on your last visit, your car is due for service',
    dueDate: '2024-02-15',
    daysUntilDue: 15,
    status: 'due-soon',
    priority: 'medium',
    documentType: 'Service Schedule',
    lastUpdated: '2023-08-15',
    reminderSettings: {
      enabled: true,
      advanceNotice: [30, 14, 7, 3],
      channels: ['push', 'email']
    }
  },
  {
    id: 'registration-renewal',
    type: 'registration',
    title: 'Vehicle Registration Renewal',
    description: 'Your vehicle registration needs renewal',
    dueDate: '2024-12-31',
    daysUntilDue: 330,
    status: 'upcoming',
    priority: 'low',
    documentType: 'Registration Certificate',
    lastUpdated: '2024-01-10',
    reminderSettings: {
      enabled: true,
      advanceNotice: [90, 60, 30, 15],
      channels: ['push', 'email']
    }
  }
]

// Notification history
const NOTIFICATION_HISTORY = [
  {
    id: 'notif-1',
    reminderId: 'puc-renewal',
    title: 'PUC Certificate Expired',
    message: 'Your PUC certificate expired 10 days ago. Please renew immediately.',
    sentDate: '2024-01-30T09:00:00',
    channel: 'push',
    status: 'delivered',
    action: 'viewed'
  },
  {
    id: 'notif-2',
    reminderId: 'insurance-renewal',
    title: 'Insurance Renewal Reminder',
    message: 'Your insurance policy expires in 60 days. Time to start renewal process.',
    sentDate: '2024-01-15T10:30:00',
    channel: 'email',
    status: 'delivered',
    action: 'clicked'
  },
  {
    id: 'notif-3',
    reminderId: 'service-due',
    title: 'Service Due Soon',
    message: 'Your car is due for its 6-month service. Book your appointment now.',
    sentDate: '2024-01-20T14:00:00',
    channel: 'push',
    status: 'delivered',
    action: 'dismissed'
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'overdue': return 'text-red-600 bg-red-50 border-red-200'
    case 'due-soon': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'completed': return 'text-green-600 bg-green-50 border-green-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50'
    case 'high': return 'text-orange-600 bg-orange-50'
    case 'medium': return 'text-yellow-600 bg-yellow-50'
    case 'low': return 'text-green-600 bg-green-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getTypeIcon = (type) => {
  switch (type) {
    case 'insurance': return Shield
    case 'puc': return CheckCircle
    case 'service': return Car
    case 'registration': return FileText
    default: return Bell
  }
}

export function RenewalReminders({ 
  reminders = REMINDERS,
  notificationHistory = NOTIFICATION_HISTORY,
  onUpdateReminder = () => {},
  onSnoozeReminder = () => {},
  onCompleteReminder = () => {},
  onBookService = () => {},
  onUpdateSettings = () => {}
}) {
  const [selectedReminder, setSelectedReminder] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [globalSettings, setGlobalSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    quietHours: { start: '22:00', end: '08:00' },
    frequency: 'smart' // smart, minimal, all
  })

  const overdueReminders = reminders.filter(r => r.status === 'overdue')
  const dueSoonReminders = reminders.filter(r => r.status === 'due-soon')
  const upcomingReminders = reminders.filter(r => r.status === 'upcoming')

  const formatDaysUntilDue = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`
    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    return `Due in ${days} days`
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                Renewal Reminders
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Stay on top of your vehicle renewals and never miss a deadline
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Settings</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Critical Alerts */}
      {overdueReminders.length > 0 && (
        <Card className="mb-4 sm:mb-6 border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-red-700 text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              Critical Alerts ({overdueReminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            {overdueReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type)
              return (
                <div key={reminder.id} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-red-900 text-sm sm:text-base truncate">{reminder.title}</p>
                      <p className="text-xs sm:text-sm text-red-700">{formatDaysUntilDue(reminder.daysUntilDue)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    {reminder.type === 'service' && (
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
                        onClick={() => onBookService(reminder)}
                      >
                        Book Service
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-300 text-red-700 hover:bg-red-100 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => onCompleteReminder(reminder.id)}
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Due Soon */}
      {dueSoonReminders.length > 0 && (
        <Card className="mb-4 sm:mb-6 border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-orange-700 text-base sm:text-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              Due Soon ({dueSoonReminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            {dueSoonReminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type)
              return (
                <div key={reminder.id} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-orange-900 text-sm sm:text-base truncate">{reminder.title}</p>
                      <p className="text-xs sm:text-sm text-orange-700">{formatDaysUntilDue(reminder.daysUntilDue)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    {reminder.type === 'service' && (
                      <Button 
                        size="sm" 
                        className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
                        onClick={() => onBookService(reminder)}
                      >
                        Book Service
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => onSnoozeReminder(reminder.id, 7)}
                    >
                      Snooze 7 days
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* All Reminders */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            All Reminders ({reminders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:gap-4 grid-cols-1 lg:grid-cols-2">
            {reminders.map((reminder) => {
              const IconComponent = getTypeIcon(reminder.type)
              return (
                <Card key={reminder.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm sm:text-base truncate">{reminder.title}</h3>
                            <Badge className={`${getPriorityColor(reminder.priority)} text-xs px-1.5 py-0.5 flex-shrink-0`}>
                              {reminder.priority}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{reminder.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: {reminder.dueDate}
                            </span>
                            <span className={`${getStatusColor(reminder.status)} px-2 py-1 rounded-full text-xs font-medium border w-fit`}>
                              {formatDaysUntilDue(reminder.daysUntilDue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Settings */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                          <Label className="flex items-center gap-1.5 cursor-pointer">
                            <Switch 
                              checked={reminder.notifications?.push} 
                              onCheckedChange={(checked) => onUpdateReminder(reminder.id, { 
                                notifications: { ...reminder.notifications, push: checked }
                              })}
                              className="scale-75 sm:scale-100"
                            />
                            <span className="text-xs sm:text-sm">Push</span>
                          </Label>
                          <Label className="flex items-center gap-1.5 cursor-pointer">
                            <Switch 
                              checked={reminder.notifications?.email} 
                              onCheckedChange={(checked) => onUpdateReminder(reminder.id, { 
                                notifications: { ...reminder.notifications, email: checked }
                              })}
                              className="scale-75 sm:scale-100"
                            />
                            <span className="text-xs sm:text-sm">Email</span>
                          </Label>
                          <Label className="flex items-center gap-1.5 cursor-pointer">
                            <Switch 
                              checked={reminder.notifications?.sms} 
                              onCheckedChange={(checked) => onUpdateReminder(reminder.id, { 
                                notifications: { ...reminder.notifications, sms: checked }
                              })}
                              className="scale-75 sm:scale-100"
                            />
                            <span className="text-xs sm:text-sm">SMS</span>
                          </Label>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setSelectedReminder(reminder)}
                          className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3 w-full sm:w-auto"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.status === 'delivered' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-600">{notification.message}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{new Date(notification.sentDate).toLocaleDateString()}</div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {notification.channel}
                    </Badge>
                    <span>•</span>
                    <span>{notification.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notification Settings</CardTitle>
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Global Settings */}
              <div>
                <h4 className="font-semibold mb-4">Global Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={globalSettings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setGlobalSettings({...globalSettings, pushNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={globalSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setGlobalSettings({...globalSettings, emailNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <Switch
                      id="sms-notifications"
                      checked={globalSettings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setGlobalSettings({...globalSettings, smsNotifications: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Quiet Hours */}
              <div>
                <h4 className="font-semibold mb-4">Quiet Hours</h4>
                <div className="text-sm text-gray-600 mb-3">
                  No notifications will be sent during these hours
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <input
                      type="time"
                      id="quiet-start"
                      value={globalSettings.quietHours.start}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        quietHours: {...globalSettings.quietHours, start: e.target.value}
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiet-end">End Time</Label>
                    <input
                      type="time"
                      id="quiet-end"
                      value={globalSettings.quietHours.end}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        quietHours: {...globalSettings.quietHours, end: e.target.value}
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  onUpdateSettings(globalSettings)
                  setShowSettings(false)
                }}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Individual Reminder Settings Modal */}
      {selectedReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reminder Settings</CardTitle>
                <Button variant="outline" onClick={() => setSelectedReminder(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedReminder.title}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Advance Notice (days before due date)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedReminder.reminderSettings.advanceNotice.map((days, index) => (
                    <Badge key={index} variant="outline">
                      {days} days
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Notification Channels</Label>
                <div className="space-y-2 mt-2">
                  {['push', 'email', 'sms'].map((channel) => (
                    <div key={channel} className="flex items-center justify-between">
                      <Label htmlFor={`${selectedReminder.id}-${channel}`}>
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </Label>
                      <Switch
                        id={`${selectedReminder.id}-${channel}`}
                        checked={selectedReminder.reminderSettings.channels.includes(channel)}
                        onCheckedChange={(checked) => {
                          // Handle channel toggle
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedReminder(null)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  onUpdateReminder(selectedReminder.id, selectedReminder.reminderSettings)
                  setSelectedReminder(null)
                }}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default RenewalReminders