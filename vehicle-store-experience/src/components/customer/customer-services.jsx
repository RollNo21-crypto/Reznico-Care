import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CustomerLayout from '@/components/customer/customer-layout'
import { 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Search,
  Filter,
  Plus,
  Eye,
  Star,
  MapPin
} from 'lucide-react'

export function CustomerServices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample services data
  const services = [
    { 
      id: 1, 
      type: 'Oil Change', 
      date: '2024-01-15', 
      status: 'Completed', 
      cost: 45.99,
      technician: 'John Smith',
      duration: '30 min',
      rating: 5,
      description: 'Full synthetic oil change with filter replacement'
    },
    { 
      id: 2, 
      type: 'Brake Inspection', 
      date: '2024-01-20', 
      status: 'Completed', 
      cost: 89.99,
      technician: 'Sarah Johnson',
      duration: '45 min',
      rating: 4,
      description: 'Complete brake system inspection and pad replacement'
    },
    { 
      id: 3, 
      type: 'Tire Rotation', 
      date: '2024-02-01', 
      status: 'Pending', 
      cost: 35.00,
      technician: 'Mike Davis',
      duration: '20 min',
      rating: null,
      description: 'Four-wheel tire rotation and pressure check'
    },
    { 
      id: 4, 
      type: 'Engine Diagnostic', 
      date: '2024-02-10', 
      status: 'In Progress', 
      cost: 125.00,
      technician: 'Alex Wilson',
      duration: '60 min',
      rating: null,
      description: 'Comprehensive engine diagnostic scan'
    },
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.technician.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || service.status.toLowerCase().replace(' ', '-') === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case 'in progress':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Progress</Badge>
      case 'pending':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderStars = (rating) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
          />
        ))}
      </div>
    )
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="px-4 py-6 pb-20">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] rounded-2xl flex items-center justify-center">
                <Wrench className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Services</h1>
                <p className="text-gray-400">Track your service history</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services or technicians..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white rounded-2xl h-12"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { key: 'all', label: 'All Services' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'in-progress', label: 'In Progress' },
                  { key: 'pending', label: 'Pending' }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={filterStatus === filter.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(filter.key)}
                    className={filterStatus === filter.key 
                      ? 'bg-[#D4FF00] text-black hover:bg-[#C4EF00] rounded-2xl whitespace-nowrap'
                      : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-800 rounded-2xl whitespace-nowrap'
                    }
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <Button className="w-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-medium rounded-2xl py-4 flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Book New Service
            </Button>
          </div>

          {/* Services List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Card key={service.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <Wrench className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white truncate">{service.type}</h3>
                          <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">{service.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
                      <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-400">Date</span>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base text-white font-medium truncate">{service.date}</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-400">Duration</span>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base text-white font-medium truncate">{service.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-400">Technician</p>
                        <p className="text-sm sm:text-base text-white font-medium truncate">{service.technician}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs sm:text-sm text-gray-400">Cost</p>
                        <p className="text-lg sm:text-xl font-bold text-[#D4FF00]">${service.cost}</p>
                      </div>
                    </div>

                    {service.rating && (
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm text-gray-400">Rating:</span>
                        {renderStars(service.rating)}
                        <span className="text-xs sm:text-sm text-gray-400">({service.rating}/5)</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 rounded-xl sm:rounded-2xl text-xs sm:text-sm h-8 sm:h-9"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      {service.status === 'Completed' && !service.rating && (
                        <Button 
                          size="sm" 
                          className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black rounded-xl sm:rounded-2xl text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                        >
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Rate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8 text-center">
                  <Wrench className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">No Services Found</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'You haven\'t booked any services yet'
                    }
                  </p>
                  <Button className="bg-[#D4FF00] hover:bg-[#C4EF00] text-black rounded-xl sm:rounded-2xl text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}