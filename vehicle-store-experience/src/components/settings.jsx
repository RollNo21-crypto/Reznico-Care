import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings as SettingsIcon, Bell, Shield, Palette, Save } from "lucide-react"

export function Settings() {
  const [settings, setSettings] = useState({
    businessName: "Reznico Care",
    email: "admin@reznicocare.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    darkMode: true,
    language: "en",
  })

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }))
  }

  const handleSave = () => {
    // Simulate save
    console.log("Settings saved:", settings)
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your application settings</p>
      </div>

      {/* Business Information */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-[#D4FF00]" />
            Business Information
          </CardTitle>
          <CardDescription className="text-gray-400">
            Update your business details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-gray-300">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#D4FF00]" />
            Notifications
          </CardTitle>
          <CardDescription className="text-gray-400">
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={() => handleToggle('notifications', 'email')}
              className="data-[state=checked]:bg-[#D4FF00]"
            />
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications via SMS</p>
            </div>
            <Switch
              checked={settings.notifications.sms}
              onCheckedChange={() => handleToggle('notifications', 'sms')}
              className="data-[state=checked]:bg-[#D4FF00]"
            />
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in browser</p>
            </div>
            <Switch
              checked={settings.notifications.push}
              onCheckedChange={() => handleToggle('notifications', 'push')}
              className="data-[state=checked]:bg-[#D4FF00]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-[#D4FF00]" />
            Appearance
          </CardTitle>
          <CardDescription className="text-gray-400">
            Customize the look and feel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-sm text-gray-400">Use dark theme across the app</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => setSettings({...settings, darkMode: !settings.darkMode})}
              className="data-[state=checked]:bg-[#D4FF00]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#D4FF00]" />
            Security
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-white font-medium mb-2">Password</p>
            <p className="text-sm text-gray-400 mb-4">Change your password through Clerk account settings</p>
            <Button 
              variant="outline"
              className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
            >
              Manage via Clerk
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
