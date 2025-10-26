import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, CheckCircle, Phone, Mail, Car } from "lucide-react"

export function CustomerOnboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehiclePlate: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSuccess(true)
    
    setTimeout(() => {
      if (onComplete) {
        onComplete(customerData)
      }
    }, 2000)
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Customer Onboarded Successfully!</h3>
              <p className="text-gray-400 mt-2">
                {customerData.name} has been added to the system
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4FF00]/20">
            <UserPlus className="h-5 w-5 text-[#D4FF00]" />
          </div>
          <div>
            <CardTitle className="text-white">Customer Onboarding</CardTitle>
            <CardDescription className="text-gray-400">
              Step {step} of 2 - {step === 1 ? "Personal Information" : "Vehicle Information"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Customer Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={customerData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={customerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>
            <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
              <AlertDescription>
                This information will be used to create a customer account and send service updates.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
              onClick={() => setStep(2)}
              disabled={!customerData.name || !customerData.email || !customerData.phone}
            >
              Continue to Vehicle Information
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make" className="text-gray-300">Vehicle Make *</Label>
                <Input
                  id="make"
                  placeholder="e.g., Toyota"
                  value={customerData.vehicleMake}
                  onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-gray-300">Vehicle Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., Camry"
                  value={customerData.vehicleModel}
                  onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-gray-300">Year *</Label>
                <Input
                  id="year"
                  placeholder="e.g., 2024"
                  value={customerData.vehicleYear}
                  onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate" className="text-gray-300">License Plate</Label>
                <Input
                  id="plate"
                  placeholder="e.g., ABC-1234"
                  value={customerData.vehiclePlate}
                  onChange={(e) => handleInputChange("vehiclePlate", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
              <Car className="h-4 w-4" />
              <AlertDescription>
                Vehicle information helps us provide better service and maintain accurate records.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                onClick={handleSubmit}
                disabled={isSubmitting || !customerData.vehicleMake || !customerData.vehicleModel || !customerData.vehicleYear}
              >
                {isSubmitting ? "Creating Account..." : "Complete Onboarding"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
