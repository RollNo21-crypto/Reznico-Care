import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone,
  Wrench,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Camera,
  Navigation,
  Battery,
  Wifi,
  Signal,
  User,
  Car,
  ClipboardList,
  ShoppingCart,
  Truck
} from 'lucide-react'

export function MobileTechnicianApp() {
  const [currentJob, setCurrentJob] = useState(null)
  const [partsNeeded, setPartsNeeded] = useState([])
  const [nearbyParts, setNearbyParts] = useState([])
  const [technicianStatus, setTechnicianStatus] = useState('available')
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 })
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [connectionStatus, setConnectionStatus] = useState('online')

  // Mock job data
  const mockJob = {
    id: 'JOB-2024-001',
    customer: 'John Smith',
    vehicle: '2020 Honda Civic',
    location: '123 Main St, New York, NY',
    issue: 'Brake pad replacement',
    priority: 'high',
    estimatedTime: '2 hours',
    partsRequired: [
      { id: 'part-001', name: 'Brake Pad Set - Front', quantity: 1, available: true },
      { id: 'part-002', name: 'Brake Fluid', quantity: 1, available: true },
      { id: 'part-003', name: 'Brake Cleaner', quantity: 1, available: false }
    ]
  }

  const mockNearbyParts = [
    { id: 'loc-1', name: 'Main Warehouse', distance: '0.5 miles', parts: 150, eta: '10 min' },
    { id: 'loc-2', name: 'AutoZone Store', distance: '1.2 miles', parts: 45, eta: '15 min' },
    { id: 'loc-3', name: 'Mobile Unit #3', distance: '2.1 miles', parts: 25, eta: '20 min' }
  ]

  useEffect(() => {
    // Simulate receiving a job assignment
    setTimeout(() => {
      setCurrentJob(mockJob)
      setPartsNeeded(mockJob.partsRequired)
    }, 1000)

    setNearbyParts(mockNearbyParts)
  }, [])

  const handleJobAccept = () => {
    setTechnicianStatus('en-route')
  }

  const handleJobStart = () => {
    setTechnicianStatus('working')
  }

  const handleJobComplete = () => {
    setTechnicianStatus('available')
    setCurrentJob(null)
    setPartsNeeded([])
  }

  const requestPart = (partId) => {
    console.log(`Requesting part: ${partId}`)
    // In real app, this would send a request to dispatch
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen">
      {/* Mobile Header */}
      <div className="bg-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-[#D4FF00]" />
          <span className="text-white font-semibold">TechApp</span>
        </div>
        <div className="flex items-center gap-2 text-white text-sm">
          <Signal className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
          <span>{batteryLevel}%</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              technicianStatus === 'available' ? 'bg-green-500' :
              technicianStatus === 'en-route' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <span className="text-white capitalize">{technicianStatus}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin className="h-4 w-4" />
            <span>NYC</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Job */}
        {currentJob && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-[#D4FF00]" />
                Current Job
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Job ID:</span>
                  <span className="text-white font-mono">{currentJob.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="text-white">{currentJob.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white">{currentJob.vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Issue:</span>
                  <span className="text-white">{currentJob.issue}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                <MapPin className="h-4 w-4 text-[#D4FF00]" />
                <span className="text-white text-sm">{currentJob.location}</span>
              </div>

              <div className="flex gap-2">
                {technicianStatus === 'available' && (
                  <>
                    <Button 
                      onClick={handleJobAccept}
                      className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                    >
                      Accept Job
                    </Button>
                    <Button variant="outline" className="text-white border-gray-600">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {technicianStatus === 'en-route' && (
                  <Button 
                    onClick={handleJobStart}
                    className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  >
                    Start Job
                  </Button>
                )}
                {technicianStatus === 'working' && (
                  <Button 
                    onClick={handleJobComplete}
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Complete Job
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Parts Required */}
        {partsNeeded.length > 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-[#D4FF00]" />
                Parts Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {partsNeeded.map((part) => (
                <div key={part.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <div className="flex-1">
                    <p className="text-white font-medium">{part.name}</p>
                    <p className="text-gray-400 text-sm">Qty: {part.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {part.available ? (
                      <Badge className="bg-green-600 text-white">Available</Badge>
                    ) : (
                      <>
                        <Badge className="bg-red-600 text-white">Need</Badge>
                        <Button 
                          size="sm"
                          onClick={() => requestPart(part.id)}
                          className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                        >
                          Request
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="text-white border-gray-600 h-16 flex-col">
                <Camera className="h-6 w-6 mb-1" />
                <span className="text-sm">Scan Part</span>
              </Button>
              <Button variant="outline" className="text-white border-gray-600 h-16 flex-col">
                <Search className="h-6 w-6 mb-1" />
                <span className="text-sm">Find Part</span>
              </Button>
              <Button variant="outline" className="text-white border-gray-600 h-16 flex-col">
                <ClipboardList className="h-6 w-6 mb-1" />
                <span className="text-sm">Job Notes</span>
              </Button>
              <Button variant="outline" className="text-white border-gray-600 h-16 flex-col">
                <Truck className="h-6 w-6 mb-1" />
                <span className="text-sm">Request Delivery</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Parts Locations */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-[#D4FF00]" />
              Nearby Parts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nearbyParts.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <p className="text-white font-medium">{location.name}</p>
                  <p className="text-gray-400 text-sm">{location.parts} parts • {location.distance}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4FF00] font-medium">{location.eta}</p>
                  <Button size="sm" variant="outline" className="text-white border-gray-600 mt-1">
                    Navigate
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connection Status */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm py-2">
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{connectionStatus === 'online' ? 'Connected' : 'Offline Mode'}</span>
        </div>
      </div>
    </div>
  )
}