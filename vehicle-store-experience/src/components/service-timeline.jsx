import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle, Wrench, Car, Calendar } from 'lucide-react'

const SERVICE_STEPS = [
  {
    id: 'appointment',
    title: 'Appointment Confirmed',
    icon: Calendar,
    description: 'Your service appointment has been scheduled'
  },
  {
    id: 'checkin',
    title: 'Vehicle Checked-In',
    icon: Car,
    description: 'Your vehicle has been received at our facility'
  },
  {
    id: 'inspection',
    title: 'Inspection in Progress',
    icon: Clock,
    description: 'Our technicians are conducting a thorough inspection'
  },
  {
    id: 'approval',
    title: 'Approval Needed',
    icon: AlertCircle,
    description: 'Please review and approve additional work recommendations'
  },
  {
    id: 'service',
    title: 'Service in Progress',
    icon: Wrench,
    description: 'Your vehicle is being serviced by our expert technicians'
  },
  {
    id: 'ready',
    title: 'Ready for Pickup',
    icon: CheckCircle,
    description: 'Your vehicle is ready! Please schedule pickup'
  }
]

const getStepStatus = (stepId, currentStep, completedSteps = []) => {
  if (completedSteps.includes(stepId)) return 'completed'
  if (stepId === currentStep) return 'current'
  return 'pending'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'current': return 'bg-blue-500'
    default: return 'bg-gray-300'
  }
}

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'completed': return 'default'
    case 'current': return 'secondary'
    default: return 'outline'
  }
}

export function ServiceTimeline({ 
  currentStep = 'appointment', 
  completedSteps = [],
  serviceDetails = {},
  onStepClick = () => {}
}) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          Service Timeline
        </CardTitle>
        {serviceDetails.vehicleInfo && (
          <div className="text-sm text-muted-foreground">
            {serviceDetails.vehicleInfo.make} {serviceDetails.vehicleInfo.model} - {serviceDetails.vehicleInfo.licensePlate}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Timeline Steps */}
          <div className="space-y-8">
            {SERVICE_STEPS.map((step, index) => {
              const status = getStepStatus(step.id, currentStep, completedSteps)
              const Icon = step.icon
              
              return (
                <div 
                  key={step.id}
                  className={`relative flex items-start gap-4 cursor-pointer transition-all hover:bg-gray-50 p-3 rounded-lg ${
                    status === 'current' ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => onStepClick(step.id)}
                >
                  {/* Step Icon */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white ${getStatusColor(status)}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <Badge variant={getStatusBadgeVariant(status)}>
                        {status === 'completed' ? 'Completed' : 
                         status === 'current' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                    
                    {/* Step-specific content */}
                    {status === 'current' && step.id === 'approval' && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">Action Required</span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Please review the Digital Vehicle Inspection report and approve recommended services.
                        </p>
                      </div>
                    )}
                    
                    {status === 'completed' && serviceDetails.timestamps?.[step.id] && (
                      <div className="text-xs text-gray-500">
                        Completed: {new Date(serviceDetails.timestamps[step.id]).toLocaleString()}
                      </div>
                    )}
                    
                    {status === 'current' && serviceDetails.estimatedCompletion?.[step.id] && (
                      <div className="text-xs text-blue-600">
                        Estimated completion: {serviceDetails.estimatedCompletion[step.id]}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Service Summary */}
        {serviceDetails.summary && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Service Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Service Type:</span>
                <div className="font-medium">{serviceDetails.summary.serviceType}</div>
              </div>
              <div>
                <span className="text-gray-600">Estimated Duration:</span>
                <div className="font-medium">{serviceDetails.summary.estimatedDuration}</div>
              </div>
              <div>
                <span className="text-gray-600">Service Advisor:</span>
                <div className="font-medium">{serviceDetails.summary.serviceAdvisor}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ServiceTimeline