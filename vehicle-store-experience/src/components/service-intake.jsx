import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wrench,
  Sparkles,
  ArrowUpCircle,
  MoreHorizontal,
  ChevronRight,
  User,
  Car,
  Package,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  Truck,
} from "lucide-react"
import partsService from "@/services/parts-service"

const SERVICE_TYPES = [
  {
    id: 1,
    title: "Oil Change",
    description: "Full synthetic oil change with filter replacement",
    icon: Wrench,
    color: "bg-blue-500",
    category: "maintenance",
    estimatedTime: "30-45 min",
    basePrice: 2500,
  },
  {
    id: 2,
    title: "Brake Service",
    description: "Brake inspection, pad replacement, and system check",
    icon: Wrench,
    color: "bg-red-500",
    category: "safety",
    estimatedTime: "1-2 hours",
    basePrice: 5000,
  },
  {
    id: 3,
    title: "Regular Maintenance",
    description: "Comprehensive vehicle inspection and maintenance",
    icon: Wrench,
    color: "bg-green-500",
    category: "maintenance",
    estimatedTime: "2-3 hours",
    basePrice: 8000,
  },
  {
    id: 4,
    title: "Engine Diagnostic",
    description: "Computer diagnostic and engine performance check",
    icon: Wrench,
    color: "bg-orange-500",
    category: "diagnostic",
    estimatedTime: "1 hour",
    basePrice: 3000,
  },
  {
    id: 5,
    title: "Car Wash & Detailing",
    description: "Exterior wash, interior cleaning, and detailing",
    icon: Sparkles,
    color: "bg-cyan-500",
    category: "cleaning",
    estimatedTime: "1-2 hours",
    basePrice: 1500,
  },
  {
    id: 6,
    title: "Performance Upgrades",
    description: "Performance parts installation and tuning",
    icon: ArrowUpCircle,
    color: "bg-purple-500",
    category: "upgrade",
    estimatedTime: "2-4 hours",
    basePrice: 15000,
  },
  {
    id: 7,
    title: "Full Service",
    description: "Complete vehicle service including all systems",
    icon: Wrench,
    color: "bg-indigo-500",
    category: "comprehensive",
    estimatedTime: "4-6 hours",
    basePrice: 12000,
  },
  {
    id: 8,
    title: "Other Services",
    description: "Custom service requirements",
    icon: MoreHorizontal,
    color: "bg-gray-500",
    category: "custom",
    estimatedTime: "Variable",
    basePrice: 0,
  },
]

export function ServiceIntake() {
  const [step, setStep] = useState("greeting") // greeting, service-selection, vehicle-info, parts-recommendation, details, confirmation
  const [customerName, setCustomerName] = useState("")
  const [selectedService, setSelectedService] = useState(null)
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    plateNumber: "",
    vin: "",
  })
  const [serviceDetails, setServiceDetails] = useState({
    description: "",
    urgency: "normal",
    preferredDate: "",
    preferredTime: "",
  })
  const [recommendedParts, setRecommendedParts] = useState([])
  const [selectedParts, setSelectedParts] = useState([])
  const [isLoadingParts, setIsLoadingParts] = useState(false)
  const [totalEstimate, setTotalEstimate] = useState(0)

  // Load parts recommendations when service and vehicle info are available
  useEffect(() => {
    if (selectedService && vehicleInfo.make && vehicleInfo.model) {
      loadPartsRecommendations()
    }
  }, [selectedService, vehicleInfo.make, vehicleInfo.model])

  // Calculate total estimate
  useEffect(() => {
    const servicePrice = selectedService?.basePrice || 0
    const partsPrice = selectedParts.reduce((sum, part) => {
      // Use realTimePrice if available, otherwise fall back to avgCost
      const partPrice = part.realTimePrice || part.avgCost || 0
      return sum + (partPrice * (part.quantity || 1))
    }, 0)
    setTotalEstimate(servicePrice + partsPrice)
  }, [selectedService, selectedParts])

  const loadPartsRecommendations = async () => {
    setIsLoadingParts(true)
    try {
      // Use enhanced service parts method with real-time pricing
      const serviceParts = await partsService.getServiceParts(selectedService.title, vehicleInfo)
      setRecommendedParts(serviceParts)
    } catch (error) {
      console.error('Error loading parts recommendations:', error)
      // Fallback to basic recommendations if enhanced service fails
      try {
        const vehicleString = `${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`
        const recommendations = partsService.getPartsRecommendations(selectedService.title, vehicleString)
        setRecommendedParts(recommendations)
      } catch (fallbackError) {
        console.error('Fallback parts loading also failed:', fallbackError)
        setRecommendedParts([])
      }
    } finally {
      setIsLoadingParts(false)
    }
  }

  const handlePartSelection = (part, selected) => {
    if (selected) {
      setSelectedParts(prev => [...prev, { ...part, quantity: 1 }])
    } else {
      setSelectedParts(prev => prev.filter(p => p.id !== part.id))
    }
  }

  const updatePartQuantity = (partId, quantity) => {
    setSelectedParts(prev => 
      prev.map(part => 
        part.id === partId ? { ...part, quantity: Math.max(1, quantity) } : part
      )
    );
  };

  // Step 5: Confirmation
  const ConfirmationStep = () => (
    <Card className="max-w-3xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-[#D4FF00]" />
          Booking Confirmation
        </CardTitle>
        <CardDescription className="text-gray-400">
          Please review your service booking details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Information */}
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <h3 className="font-semibold text-white mb-3">Customer Information</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white">{customerName}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <h3 className="font-semibold text-white mb-3">Vehicle Information</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Vehicle:</span>
              <span className="text-white">{vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}</span>
            </div>
            {vehicleInfo.mileage && (
              <div className="flex justify-between">
                <span className="text-gray-400">Mileage:</span>
                <span className="text-white">{vehicleInfo.mileage} km</span>
              </div>
            )}
            {vehicleInfo.plateNumber && (
              <div className="flex justify-between">
                <span className="text-gray-400">License Plate:</span>
                <span className="text-white">{vehicleInfo.plateNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Service Information */}
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <h3 className="font-semibold text-white mb-3">Service Details</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className={`rounded-lg ${selectedService.color} p-2 text-white`}>
              <selectedService.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{selectedService.title}</h4>
              <p className="text-sm text-gray-400">{selectedService.description}</p>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Service Cost:</span>
              <span className="text-white">₹{selectedService.basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Time:</span>
              <span className="text-white">{selectedService.estimatedTime}</span>
            </div>
          </div>
          {serviceDetails && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Additional Details:</p>
              <p className="text-sm text-white">{serviceDetails}</p>
            </div>
          )}
        </div>

        {/* Selected Parts */}
        {selectedParts.length > 0 && (
          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
            <h3 className="font-semibold text-white mb-3">Selected Parts</h3>
            <div className="space-y-3">
              {recommendedParts
                .filter(part => selectedParts.includes(part.id))
                .map(part => (
                  <div key={part.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{part.name}</p>
                      <p className="text-sm text-gray-400">Qty: {part.quantity} × ₹{part.price.toLocaleString()}</p>
                    </div>
                    <p className="text-white font-semibold">
                      ₹{(part.price * part.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Total Cost */}
        <div className="rounded-lg border border-[#D4FF00] bg-[#D4FF00]/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Total Cost</h3>
              <p className="text-sm text-gray-400">Including all services and parts</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#D4FF00]">
                ₹{totalEstimate.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">+ applicable taxes</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStep("parts-recommendation")}
            className="flex-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
          >
            Back
          </Button>
          <Button 
            onClick={() => {
              // Here you would typically submit the booking
              alert('Service booking confirmed! You will receive a confirmation email shortly.')
              // Reset form or redirect
            }}
            className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
          >
            Confirm Booking
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Step 4: Parts Recommendation
  const PartsRecommendationStep = () => (
    <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Package className="h-6 w-6 text-[#D4FF00]" />
          Recommended Parts & Services
        </CardTitle>
        <CardDescription className="text-gray-400">
          Based on your vehicle and selected service, here are our recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Summary */}
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg ${selectedService.color} p-2 text-white`}>
                <selectedService.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{selectedService.title}</h4>
                <p className="text-sm text-gray-400">
                  {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Estimated Time</p>
              <p className="font-semibold text-white">{selectedService.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingParts && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4FF00]"></div>
            <span className="ml-3 text-gray-400">Loading recommended parts...</span>
          </div>
        )}

        {/* Recommended Parts */}
        {!isLoadingParts && recommendedParts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recommended Parts</h3>
            <div className="grid gap-4">
              {recommendedParts.map((part) => (
                <div key={part.id} className="rounded-lg border border-gray-800 bg-gray-800/30 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{part.name}</h4>
                        <Badge 
                          variant={part.availability === 'in-stock' ? 'default' : 'destructive'}
                          className={part.availability === 'in-stock' ? 'bg-green-600' : 'bg-red-600'}
                        >
                          {part.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        {part.isRecommended && (
                          <Badge className="bg-[#D4FF00] text-black">Recommended</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{part.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">Part #: {part.partNumber}</span>
                        <span className="text-gray-400">Brand: {part.brand}</span>
                        <span className="text-gray-400">Warranty: {part.warranty}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-white">₹{part.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">per unit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                      <Label className="text-gray-300">Quantity:</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePartQuantity(part.id, part.quantity - 1)}
                          disabled={part.quantity <= 1}
                          className="h-8 w-8 p-0 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-white">{part.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePartQuantity(part.id, part.quantity + 1)}
                          className="h-8 w-8 p-0 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">
                        Total: ₹{(part.price * part.quantity).toLocaleString()}
                      </span>
                      <Button
                        variant={selectedParts.includes(part.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePartSelection(part.id)}
                        disabled={part.availability !== 'in-stock'}
                        className={selectedParts.includes(part.id) 
                          ? "bg-[#D4FF00] hover:bg-[#C4EF00] text-black" 
                          : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }
                      >
                        {selectedParts.includes(part.id) ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Additional Service Details</h3>
          <Textarea
            placeholder="Please describe any specific issues, symptoms, or additional requests..."
            value={serviceDetails}
            onChange={(e) => setServiceDetails(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
          />
        </div>

        {/* Total Estimate */}
        <div className="rounded-lg border border-[#D4FF00] bg-[#D4FF00]/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Total Estimate</h3>
              <p className="text-sm text-gray-400">
                Service + {selectedParts.length} selected parts
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#D4FF00]">
                ₹{totalEstimate.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">+ taxes</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStep("vehicle-info")}
            className="flex-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
          >
            Back
          </Button>
          <Button 
            onClick={() => setStep("confirmation")}
            className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
          >
            Continue to Booking
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Step 3: Vehicle Information
  const VehicleInfoStep = () => (
    <Card className="max-w-3xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Car className="h-6 w-6 text-[#D4FF00]" />
          Vehicle Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Please provide your vehicle details to get accurate service recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`rounded-lg ${selectedService.color} p-2 text-white`}>
              <selectedService.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Selected Service</h4>
              <p className="text-sm text-gray-400">{selectedService.title}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="make" className="text-gray-300">Vehicle Make *</Label>
            <Select value={vehicleInfo.make} onValueChange={(value) => setVehicleInfo(prev => ({...prev, make: value}))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Toyota" className="text-white hover:bg-gray-700">Toyota</SelectItem>
                <SelectItem value="Honda" className="text-white hover:bg-gray-700">Honda</SelectItem>
                <SelectItem value="Maruti" className="text-white hover:bg-gray-700">Maruti Suzuki</SelectItem>
                <SelectItem value="Hyundai" className="text-white hover:bg-gray-700">Hyundai</SelectItem>
                <SelectItem value="Tata" className="text-white hover:bg-gray-700">Tata</SelectItem>
                <SelectItem value="Mahindra" className="text-white hover:bg-gray-700">Mahindra</SelectItem>
                <SelectItem value="Ford" className="text-white hover:bg-gray-700">Ford</SelectItem>
                <SelectItem value="Volkswagen" className="text-white hover:bg-gray-700">Volkswagen</SelectItem>
                <SelectItem value="BMW" className="text-white hover:bg-gray-700">BMW</SelectItem>
                <SelectItem value="Mercedes" className="text-white hover:bg-gray-700">Mercedes-Benz</SelectItem>
                <SelectItem value="Audi" className="text-white hover:bg-gray-700">Audi</SelectItem>
                <SelectItem value="Other" className="text-white hover:bg-gray-700">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model" className="text-gray-300">Vehicle Model *</Label>
            <Input
              id="model"
              placeholder="e.g., Camry, Civic, Swift"
              value={vehicleInfo.model}
              onChange={(e) => setVehicleInfo(prev => ({...prev, model: e.target.value}))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-gray-300">Year *</Label>
            <Select value={vehicleInfo.year} onValueChange={(value) => setVehicleInfo(prev => ({...prev, year: value}))}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                  <SelectItem key={year} value={year.toString()} className="text-white hover:bg-gray-700">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage" className="text-gray-300">Current Mileage (km)</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="e.g., 45000"
              value={vehicleInfo.mileage}
              onChange={(e) => setVehicleInfo(prev => ({...prev, mileage: e.target.value}))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plateNumber" className="text-gray-300">License Plate Number</Label>
            <Input
              id="plateNumber"
              placeholder="e.g., MH01AB1234"
              value={vehicleInfo.plateNumber}
              onChange={(e) => setVehicleInfo(prev => ({...prev, plateNumber: e.target.value.toUpperCase()}))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vin" className="text-gray-300">VIN (Optional)</Label>
            <Input
              id="vin"
              placeholder="Vehicle Identification Number"
              value={vehicleInfo.vin}
              onChange={(e) => setVehicleInfo(prev => ({...prev, vin: e.target.value.toUpperCase()}))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStep("service-selection")}
            className="flex-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
          >
            Back
          </Button>
          <Button 
            onClick={() => setStep("parts-recommendation")}
            disabled={!vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year}
            className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 1: Greeting
  const GreetingStep = () => (
    <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4FF00]/20">
          <User className="h-10 w-10 text-[#D4FF00]" />
        </div>
        <CardTitle className="text-3xl text-white">Welcome to Reznico Care!</CardTitle>
        <CardDescription className="text-lg text-gray-400">
          We're here to help you with all your vehicle service needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-gray-300">May I have your name, please?</Label>
          <Input
            id="customerName"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <Button
          className="w-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold"
          size="lg"
          onClick={() => setStep("service-selection")}
          disabled={!customerName.trim()}
        >
          Continue
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )

  // Step 2: Service Selection
  const ServiceSelectionStep = () => (
    <Card className="max-w-6xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Hello {customerName}! How can we assist you today?
        </CardTitle>
        <CardDescription className="text-gray-400">
          Please select the type of service you need
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_TYPES.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service)
                  setStep("vehicle-info")
                }}
                className="group relative overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800/50 p-4 text-left transition-all hover:border-[#D4FF00] hover:shadow-lg hover:shadow-[#D4FF00]/20"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-lg ${service.color} p-2 text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.estimatedTime}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-base mb-1 text-white group-hover:text-[#D4FF00] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D4FF00]">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">
                        {service.basePrice > 0 ? `₹${service.basePrice}+` : 'Quote'}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-[#D4FF00] transition-colors" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <Separator className="my-6 bg-gray-800" />
        <Button
          variant="outline"
          onClick={() => setStep("greeting")}
          className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
        >
          Back
        </Button>
      </CardContent>
    </Card>
  )

  // Step 3: Service Details (placeholder for now)
  const ServiceDetailsStep = () => (
    <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          {selectedService?.title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Great choice, {customerName}! Let's get more details about your service request.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
          <div className="flex items-center gap-3 mb-2">
            {selectedService && (
              <div className={`rounded-lg ${selectedService.color} p-2 text-white`}>
                <selectedService.icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <h4 className="font-semibold text-white">Service Selected</h4>
              <p className="text-sm text-gray-400">{selectedService?.description}</p>
            </div>
          </div>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Next steps will be added here...</p>
          <p className="text-sm mt-2">Vehicle details, specific service options, scheduling, etc.</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStep("service-selection")}
            className="flex-1 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-[#D4FF00]"
          >
            Back
          </Button>
          <Button className="flex-1 bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold">
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  function getStepIndex(currentStep) {
    const steps = ["greeting", "service-selection", "vehicle-info", "parts-recommendation", "confirmation"]
    return steps.indexOf(currentStep)
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { key: "greeting", label: "Welcome", icon: User },
              { key: "service-selection", label: "Service", icon: Wrench },
              { key: "vehicle-info", label: "Vehicle", icon: Car },
              { key: "parts-recommendation", label: "Parts", icon: Package },
              { key: "confirmation", label: "Confirm", icon: CheckCircle }
            ].map((stepItem, index) => {
              const isActive = step === stepItem.key
              const isCompleted = getStepIndex(step) > index
              const StepIcon = stepItem.icon
              
              return (
                <div key={stepItem.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-[#D4FF00] border-[#D4FF00] text-black' 
                      : isActive 
                        ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10' 
                        : 'border-gray-600 text-gray-600'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm ${
                    isActive ? 'text-[#D4FF00]' : isCompleted ? 'text-white' : 'text-gray-600'
                  }`}>
                    {stepItem.label}
                  </span>
                  {index < 4 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-[#D4FF00]' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        {step === "greeting" && <GreetingStep />}
        {step === "service-selection" && <ServiceSelectionStep />}
        {step === "vehicle-info" && <VehicleInfoStep />}
        {step === "parts-recommendation" && <PartsRecommendationStep />}
        {step === "confirmation" && <ConfirmationStep />}
      </div>
    </div>
  )
}
