import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Camera, 
  Eye, 
  DollarSign,
  Clock,
  Info
} from 'lucide-react'

const INSPECTION_ITEMS = [
  {
    id: 'brake-pads',
    category: 'Brakes',
    item: 'Brake Pads',
    condition: 'needs-attention',
    severity: 'medium',
    description: 'Front brake pads are worn and need replacement',
    recommendation: 'Replace front brake pads',
    estimatedCost: 4500,
    photos: [
      {
        id: 'brake-1',
        url: '/api/placeholder/400/300',
        caption: 'Worn brake pad - only 2mm remaining',
        annotation: { type: 'circle', x: 150, y: 100 }
      }
    ]
  },
  {
    id: 'air-filter',
    category: 'Engine',
    item: 'Air Filter',
    condition: 'needs-replacement',
    severity: 'high',
    description: 'Air filter is heavily contaminated and restricting airflow',
    recommendation: 'Replace air filter immediately',
    estimatedCost: 800,
    photos: [
      {
        id: 'filter-1',
        url: '/api/placeholder/400/300',
        caption: 'Dirty air filter - severely clogged',
        annotation: { type: 'arrow', x: 200, y: 150 }
      }
    ]
  },
  {
    id: 'oil-level',
    category: 'Engine',
    item: 'Engine Oil',
    condition: 'good',
    severity: 'low',
    description: 'Engine oil level and condition are satisfactory',
    recommendation: 'No action needed at this time',
    estimatedCost: 0,
    photos: [
      {
        id: 'oil-1',
        url: '/api/placeholder/400/300',
        caption: 'Clean engine oil - good condition'
      }
    ]
  },
  {
    id: 'tire-tread',
    category: 'Tires',
    item: 'Tire Tread Depth',
    condition: 'needs-attention',
    severity: 'medium',
    description: 'Front tires showing uneven wear pattern',
    recommendation: 'Rotate tires and check alignment',
    estimatedCost: 1200,
    photos: [
      {
        id: 'tire-1',
        url: '/api/placeholder/400/300',
        caption: 'Uneven tire wear on front left tire'
      }
    ]
  }
]

const getConditionColor = (condition) => {
  switch (condition) {
    case 'good': return 'text-green-600 bg-green-50 border-green-200'
    case 'needs-attention': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'needs-replacement': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

const getConditionIcon = (condition) => {
  switch (condition) {
    case 'good': return CheckCircle
    case 'needs-attention': return AlertTriangle
    case 'needs-replacement': return XCircle
    default: return Info
  }
}

const getSeverityBadge = (severity) => {
  switch (severity) {
    case 'high': return { variant: 'destructive', text: 'High Priority' }
    case 'medium': return { variant: 'secondary', text: 'Medium Priority' }
    case 'low': return { variant: 'outline', text: 'Low Priority' }
    default: return { variant: 'outline', text: 'Info' }
  }
}

export function DigitalVehicleInspection({ 
  inspectionData = INSPECTION_ITEMS,
  onApprove = () => {},
  onReject = () => {},
  onViewPhoto = () => {},
  vehicleInfo = {}
}) {
  const [approvedItems, setApprovedItems] = useState(new Set())
  const [rejectedItems, setRejectedItems] = useState(new Set())

  const handleApprove = (itemId) => {
    const newApproved = new Set(approvedItems)
    const newRejected = new Set(rejectedItems)
    
    newApproved.add(itemId)
    newRejected.delete(itemId)
    
    setApprovedItems(newApproved)
    setRejectedItems(newRejected)
    onApprove(itemId)
  }

  const handleReject = (itemId) => {
    const newApproved = new Set(approvedItems)
    const newRejected = new Set(rejectedItems)
    
    newRejected.add(itemId)
    newApproved.delete(itemId)
    
    setApprovedItems(newApproved)
    setRejectedItems(newRejected)
    onReject(itemId)
  }

  const getItemStatus = (itemId) => {
    if (approvedItems.has(itemId)) return 'approved'
    if (rejectedItems.has(itemId)) return 'rejected'
    return 'pending'
  }

  const totalEstimatedCost = inspectionData
    .filter(item => approvedItems.has(item.id))
    .reduce((sum, item) => sum + item.estimatedCost, 0)

  const needsAttentionCount = inspectionData.filter(item => 
    item.condition === 'needs-attention' || item.condition === 'needs-replacement'
  ).length

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Digital Vehicle Inspection Report
          </CardTitle>
          {vehicleInfo && (
            <div className="text-sm text-muted-foreground">
              {vehicleInfo.make} {vehicleInfo.model} {vehicleInfo.year} - {vehicleInfo.licensePlate}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inspectionData.length}</div>
              <div className="text-sm text-gray-600">Items Inspected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{needsAttentionCount}</div>
              <div className="text-sm text-gray-600">Need Attention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedItems.size}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">₹{totalEstimatedCost.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Estimated Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Items */}
      <div className="space-y-4">
        {inspectionData.map((item) => {
          const ConditionIcon = getConditionIcon(item.condition)
          const severityBadge = getSeverityBadge(item.severity)
          const itemStatus = getItemStatus(item.id)
          
          return (
            <Card key={item.id} className={`${getConditionColor(item.condition)} border-2`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ConditionIcon className="h-6 w-6" />
                    <div>
                      <CardTitle className="text-lg">{item.item}</CardTitle>
                      <div className="text-sm opacity-75">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={severityBadge.variant}>
                      {severityBadge.text}
                    </Badge>
                    {itemStatus === 'approved' && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {itemStatus === 'rejected' && (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Photos */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Inspection Photos
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {item.photos.map((photo) => (
                        <div key={photo.id} className="relative">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-48 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => onViewPhoto(photo)}
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => onViewPhoto(photo)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <div className="mt-2 text-sm text-gray-600">
                            {photo.caption}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details and Actions */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Condition Assessment</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommendation</h4>
                        <p className="text-sm">{item.recommendation}</p>
                      </div>

                      {item.estimatedCost > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Estimated Cost
                          </h4>
                          <div className="text-lg font-bold">₹{item.estimatedCost.toLocaleString()}</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {(item.condition === 'needs-attention' || item.condition === 'needs-replacement') && (
                        <div className="pt-4">
                          <Separator className="mb-4" />
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleApprove(item.id)}
                              disabled={itemStatus === 'approved'}
                              className="flex-1"
                              variant={itemStatus === 'approved' ? 'default' : 'outline'}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {itemStatus === 'approved' ? 'Approved' : 'Approve Work'}
                            </Button>
                            <Button
                              onClick={() => handleReject(item.id)}
                              disabled={itemStatus === 'rejected'}
                              variant={itemStatus === 'rejected' ? 'destructive' : 'outline'}
                              className="flex-1"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              {itemStatus === 'rejected' ? 'Rejected' : 'Reject'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary and Submit */}
      {(approvedItems.size > 0 || rejectedItems.size > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Approval Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Approved Services</h4>
                  <ul className="space-y-1 text-sm">
                    {inspectionData
                      .filter(item => approvedItems.has(item.id))
                      .map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.item}</span>
                          <span>₹{item.estimatedCost.toLocaleString()}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Rejected Services</h4>
                  <ul className="space-y-1 text-sm">
                    {inspectionData
                      .filter(item => rejectedItems.has(item.id))
                      .map(item => (
                        <li key={item.id}>{item.item}</li>
                      ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">
                    Total Approved Amount: ₹{totalEstimatedCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated completion time: 2-3 hours
                  </div>
                </div>
                <Button size="lg" className="px-8">
                  <Clock className="h-4 w-4 mr-2" />
                  Proceed with Approved Services
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DigitalVehicleInspection