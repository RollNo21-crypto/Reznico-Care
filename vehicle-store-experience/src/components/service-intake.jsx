import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Wrench,
  Sparkles,
  ArrowUpCircle,
  MoreHorizontal,
  ChevronRight,
  User,
} from "lucide-react"

const SERVICE_TYPES = [
  {
    id: 1,
    title: "Vehicle Internal/Mechanical Services",
    description: "Engine repair, transmission, brakes, diagnostics, etc.",
    icon: Wrench,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Cleaning or External Services",
    description: "Car wash, detailing, paint correction, waxing, etc.",
    icon: Sparkles,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Upgrades",
    description: "Performance upgrades, accessories, technology installation",
    icon: ArrowUpCircle,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Miscellaneous",
    description: "Other services not listed above",
    icon: MoreHorizontal,
    color: "bg-orange-500",
  },
]

export function ServiceIntake() {
  const [step, setStep] = useState("greeting") // greeting, service-selection, details
  const [customerName, setCustomerName] = useState("")
  const [selectedService, setSelectedService] = useState(null)

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
    <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Hello {customerName}! How can we assist you today?
        </CardTitle>
        <CardDescription className="text-gray-400">
          Please select the type of service you need
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICE_TYPES.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service)
                  setStep("details")
                }}
                className="group relative overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800/50 p-6 text-left transition-all hover:border-[#D4FF00] hover:shadow-lg hover:shadow-[#D4FF00]/20"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg ${service.color} p-3 text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-[#D4FF00] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-[#D4FF00] transition-colors" />
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

  return (
    <div className="flex flex-1 flex-col p-6 bg-gray-950 min-h-screen">
      {step === "greeting" && <GreetingStep />}
      {step === "service-selection" && <ServiceSelectionStep />}
      {step === "details" && <ServiceDetailsStep />}
    </div>
  )
}
