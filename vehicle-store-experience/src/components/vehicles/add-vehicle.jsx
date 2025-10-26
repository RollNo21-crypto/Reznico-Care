import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, CheckCircle, ArrowLeft } from "lucide-react"

export function AddVehicle({ onNavigate }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    stockNumber: "",
    color: "",
    mileage: "",
    price: "",
    condition: "",
    transmission: "",
    fuelType: "",
    description: "",
  })

  const handleInputChange = (field, value) => {
    setVehicleData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSuccess(true)
    
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('all-vehicles')
      }
    }, 2000)
  }

  if (success) {
    return (
      <div className="flex-1 p-6 bg-gray-950 min-h-screen">
        <Card className="max-w-md mx-auto bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Vehicle Added Successfully!</h3>
                <p className="text-gray-400 mt-2">
                  {vehicleData.year} {vehicleData.make} {vehicleData.model} has been added to inventory
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => onNavigate && onNavigate('all-vehicles')}
            className="mb-2 text-gray-400 hover:text-[#D4FF00] hover:bg-gray-800 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Button>
          <h1 className="text-3xl font-bold text-white">Add New Vehicle</h1>
          <p className="text-gray-400 mt-1">Add a vehicle to your inventory</p>
        </div>
      </div>

      <Card className="max-w-4xl bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4FF00]/20">
              <Car className="h-5 w-5 text-[#D4FF00]" />
            </div>
            <div>
              <CardTitle className="text-white">Vehicle Information</CardTitle>
              <CardDescription className="text-gray-400">
                Step {step} of 2 - {step === 1 ? "Basic Information" : "Additional Details"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make" className="text-gray-300">Make *</Label>
                  <Input
                    id="make"
                    placeholder="e.g., Toyota"
                    value={vehicleData.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-gray-300">Model *</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Camry"
                    value={vehicleData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
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
                    value={vehicleData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-gray-300">Color *</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Black"
                    value={vehicleData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vin" className="text-gray-300">VIN *</Label>
                  <Input
                    id="vin"
                    placeholder="17-character VIN"
                    value={vehicleData.vin}
                    onChange={(e) => handleInputChange("vin", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockNumber" className="text-gray-300">Stock Number *</Label>
                  <Input
                    id="stockNumber"
                    placeholder="e.g., SD-2024-001"
                    value={vehicleData.stockNumber}
                    onChange={(e) => handleInputChange("stockNumber", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileage" className="text-gray-300">Mileage *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="e.g., 15000"
                    value={vehicleData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-300">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 28500"
                    value={vehicleData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                <AlertDescription>
                  Please enter accurate vehicle information for inventory management.
                </AlertDescription>
              </Alert>

              <Button
                className="w-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
                onClick={() => setStep(2)}
                disabled={!vehicleData.make || !vehicleData.model || !vehicleData.year || !vehicleData.vin}
              >
                Continue to Additional Details
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition" className="text-gray-300">Condition *</Label>
                  <Select value={vehicleData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="new" className="text-white hover:bg-gray-700">New</SelectItem>
                      <SelectItem value="used" className="text-white hover:bg-gray-700">Used</SelectItem>
                      <SelectItem value="certified" className="text-white hover:bg-gray-700">Certified Pre-Owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission" className="text-gray-300">Transmission *</Label>
                  <Select value={vehicleData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="automatic" className="text-white hover:bg-gray-700">Automatic</SelectItem>
                      <SelectItem value="manual" className="text-white hover:bg-gray-700">Manual</SelectItem>
                      <SelectItem value="cvt" className="text-white hover:bg-gray-700">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType" className="text-gray-300">Fuel Type *</Label>
                <Select value={vehicleData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="gasoline" className="text-white hover:bg-gray-700">Gasoline</SelectItem>
                    <SelectItem value="diesel" className="text-white hover:bg-gray-700">Diesel</SelectItem>
                    <SelectItem value="electric" className="text-white hover:bg-gray-700">Electric</SelectItem>
                    <SelectItem value="hybrid" className="text-white hover:bg-gray-700">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter vehicle description, features, etc."
                  value={vehicleData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                />
              </div>

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
                  disabled={isSubmitting || !vehicleData.condition || !vehicleData.transmission || !vehicleData.fuelType}
                >
                  {isSubmitting ? "Adding Vehicle..." : "Add Vehicle"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
