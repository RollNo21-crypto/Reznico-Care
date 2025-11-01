import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Wrench, 
  Camera, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  Car,
  Package,
  ShoppingCart,
  Eye,
  Upload,
  Play,
  Pause,
  Square,
  Timer,
  DollarSign,
  Truck
} from 'lucide-react'

// Mock data for job cards
const JOB_CARDS = [
  {
    id: 'JOB-001',
    customerName: 'Rajesh Kumar',
    vehicleInfo: 'Honda City 2020 - MH12AB1234',
    serviceType: 'Regular Maintenance',
    assignedMechanic: 'Suresh Patel',
    estimatedTime: 120, // minutes
    actualTime: 0,
    status: 'in-progress',
    priority: 'medium',
    startTime: '2024-01-15T09:00:00',
    tasks: [
      {
        id: 'task-1',
        name: 'Oil Change',
        description: 'Replace engine oil and oil filter',
        status: 'completed',
        photoCheckpoints: [
          { id: 'cp-1', name: 'Old Oil Drain', required: true, completed: true, photoUrl: '/api/photos/old-oil.jpg' },
          { id: 'cp-2', name: 'New Oil Fill', required: true, completed: true, photoUrl: '/api/photos/new-oil.jpg' }
        ]
      },
      {
        id: 'task-2',
        name: 'Brake Inspection',
        description: 'Check brake pads and brake fluid',
        status: 'in-progress',
        photoCheckpoints: [
          { id: 'cp-3', name: 'Brake Pad Condition', required: true, completed: false, photoUrl: null },
          { id: 'cp-4', name: 'Brake Fluid Level', required: true, completed: false, photoUrl: null }
        ]
      },
      {
        id: 'task-3',
        name: 'Air Filter Replacement',
        description: 'Replace air filter if dirty',
        status: 'pending',
        photoCheckpoints: [
          { id: 'cp-5', name: 'Old Air Filter', required: true, completed: false, photoUrl: null },
          { id: 'cp-6', name: 'New Air Filter Installed', required: true, completed: false, photoUrl: null }
        ]
      }
    ]
  },
  {
    id: 'JOB-002',
    customerName: 'Priya Sharma',
    vehicleInfo: 'Maruti Swift 2019 - MH14CD5678',
    serviceType: 'Brake Service',
    assignedMechanic: 'Amit Singh',
    estimatedTime: 180,
    actualTime: 45,
    status: 'pending',
    priority: 'high',
    startTime: null,
    tasks: [
      {
        id: 'task-4',
        name: 'Brake Pad Replacement',
        description: 'Replace front brake pads',
        status: 'pending',
        photoCheckpoints: [
          { id: 'cp-7', name: 'Worn Brake Pads', required: true, completed: false, photoUrl: null },
          { id: 'cp-8', name: 'New Brake Pads Installed', required: true, completed: false, photoUrl: null }
        ]
      }
    ]
  }
]

// Mock parts inventory data
const PARTS_INVENTORY = [
  {
    id: 'part-1',
    name: 'Brake Pads - Front',
    partNumber: 'BP-HONDA-CITY-F',
    suppliers: [
      { name: 'NAPA Auto Parts', price: 2500, availability: 'In Stock', deliveryTime: 'Same Day' },
      { name: 'AutoZone', price: 2300, availability: 'In Stock', deliveryTime: '2 Hours' },
      { name: 'Local Supplier', price: 2200, availability: 'Limited Stock', deliveryTime: '4 Hours' }
    ]
  },
  {
    id: 'part-2',
    name: 'Engine Oil Filter',
    partNumber: 'OF-HONDA-CITY',
    suppliers: [
      { name: 'NAPA Auto Parts', price: 450, availability: 'In Stock', deliveryTime: 'Same Day' },
      { name: 'AutoZone', price: 420, availability: 'In Stock', deliveryTime: '2 Hours' }
    ]
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-50'
    case 'in-progress': return 'text-blue-600 bg-blue-50'
    case 'pending': return 'text-gray-600 bg-gray-50'
    case 'blocked': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50'
    case 'medium': return 'text-yellow-600 bg-yellow-50'
    case 'low': return 'text-green-600 bg-green-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export function InternalGaragePlatform({ 
  jobCards = JOB_CARDS,
  partsInventory = PARTS_INVENTORY,
  currentUser = { name: 'Suresh Patel', role: 'mechanic' },
  onStartJob = () => {},
  onCompleteTask = () => {},
  onUploadPhoto = () => {},
  onOrderPart = () => {}
}) {
  const [selectedJob, setSelectedJob] = useState(jobCards[0])
  const [activeTimer, setActiveTimer] = useState(null)
  const [photoUpload, setPhotoUpload] = useState({ taskId: null, checkpointId: null })
  const [showPartsModal, setShowPartsModal] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null)

  const handlePhotoUpload = (event, taskId, checkpointId) => {
    const file = event.target.files[0]
    if (file) {
      // Simulate photo upload
      onUploadPhoto(file, taskId, checkpointId)
      setPhotoUpload({ taskId: null, checkpointId: null })
    }
  }

  const startTimer = (jobId) => {
    setActiveTimer(jobId)
    onStartJob(jobId)
  }

  const stopTimer = () => {
    setActiveTimer(null)
  }

  const myJobs = jobCards.filter(job => job.assignedMechanic === currentUser.name)
  const completedTasks = selectedJob?.tasks.filter(task => task.status === 'completed').length || 0
  const totalTasks = selectedJob?.tasks.length || 0

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-6 w-6" />
                Garage Platform
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Welcome back, {currentUser.name}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Active Jobs</div>
                <div className="text-2xl font-bold">{myJobs.filter(job => job.status === 'in-progress').length}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Pending Jobs</div>
                <div className="text-2xl font-bold">{myJobs.filter(job => job.status === 'pending').length}</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job List Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>My Job Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedJob?.id === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm">{job.id}</div>
                        <div className="text-xs text-gray-600">{job.customerName}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={`text-xs ${getStatusColor(job.status)}`}>
                          {job.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{job.vehicleInfo}</div>
                    <div className="text-xs text-gray-600">{job.serviceType}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Est: {job.estimatedTime}min | Actual: {job.actualTime}min
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Job Details */}
        <div className="lg:col-span-2">
          {selectedJob && (
            <div className="space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {selectedJob.id} - {selectedJob.serviceType}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Customer: {selectedJob.customerName} • {selectedJob.vehicleInfo}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedJob.status === 'pending' && (
                        <Button onClick={() => startTimer(selectedJob.id)}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Job
                        </Button>
                      )}
                      {selectedJob.status === 'in-progress' && (
                        <Button variant="outline" onClick={stopTimer}>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => setShowPartsModal(true)}>
                        <Package className="h-4 w-4 mr-2" />
                        Parts
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {completedTasks}/{totalTasks}
                      </div>
                      <div className="text-sm text-gray-600">Tasks Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {selectedJob.estimatedTime}min
                      </div>
                      <div className="text-sm text-gray-600">Estimated Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {selectedJob.actualTime}min
                      </div>
                      <div className="text-sm text-gray-600">Actual Time</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        activeTimer === selectedJob.id ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {activeTimer === selectedJob.id ? 'ACTIVE' : 'STOPPED'}
                      </div>
                      <div className="text-sm text-gray-600">Timer Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tasks */}
              <div className="space-y-4">
                {selectedJob.tasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Photo Checkpoints
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {task.photoCheckpoints.map((checkpoint) => (
                            <div key={checkpoint.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium">{checkpoint.name}</h5>
                                {checkpoint.required && (
                                  <Badge variant="outline" className="text-xs">Required</Badge>
                                )}
                              </div>
                              
                              {checkpoint.completed ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="text-sm">Photo uploaded</span>
                                  </div>
                                  {checkpoint.photoUrl && (
                                    <img
                                      src={checkpoint.photoUrl}
                                      alt={checkpoint.name}
                                      className="w-full h-32 object-cover rounded border"
                                    />
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <input
                                    type="file"
                                    id={`photo-${checkpoint.id}`}
                                    className="hidden"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={(e) => handlePhotoUpload(e, task.id, checkpoint.id)}
                                  />
                                  <Label htmlFor={`photo-${checkpoint.id}`} className="cursor-pointer">
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Camera className="h-4 w-4 mr-2" />
                                      Take Photo
                                    </Button>
                                  </Label>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {task.photoCheckpoints.every(cp => cp.completed) && task.status !== 'completed' && (
                          <Button 
                            onClick={() => onCompleteTask(task.id)}
                            className="w-full"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Task Complete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parts Inventory Modal */}
      {showPartsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Parts Inventory
                </CardTitle>
                <Button variant="outline" onClick={() => setShowPartsModal(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsInventory.map((part) => (
                  <Card key={part.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{part.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">Part #: {part.partNumber}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {part.suppliers.map((supplier, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              <div className="text-sm text-gray-600">
                                {supplier.availability} • Delivery: {supplier.deliveryTime}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold">₹{supplier.price}</div>
                              <Button 
                                size="sm"
                                onClick={() => onOrderPart(part.id, supplier)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Order
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}