import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Car,
  Receipt,
  Camera,
  Share2,
  Clock
} from 'lucide-react'

// Mock data for service history
const SERVICE_HISTORY = [
  {
    id: 'service-001',
    date: '2024-01-15',
    serviceType: 'Regular Maintenance',
    mileage: 45000,
    cost: 8500,
    serviceAdvisor: 'Rajesh Kumar',
    invoice: {
      id: 'INV-2024-001',
      url: '/api/invoices/INV-2024-001.pdf'
    },
    photos: [
      { id: 'photo-1', url: '/api/photos/oil-change-before.jpg', caption: 'Old oil filter' },
      { id: 'photo-2', url: '/api/photos/oil-change-after.jpg', caption: 'New oil filter installed' }
    ],
    services: ['Oil Change', 'Filter Replacement', 'General Inspection']
  },
  {
    id: 'service-002',
    date: '2023-08-20',
    serviceType: 'Brake Service',
    mileage: 42000,
    cost: 12000,
    serviceAdvisor: 'Priya Sharma',
    invoice: {
      id: 'INV-2023-089',
      url: '/api/invoices/INV-2023-089.pdf'
    },
    photos: [
      { id: 'photo-3', url: '/api/photos/brake-pads-worn.jpg', caption: 'Worn brake pads' },
      { id: 'photo-4', url: '/api/photos/brake-pads-new.jpg', caption: 'New brake pads installed' }
    ],
    services: ['Brake Pad Replacement', 'Brake Fluid Change', 'Brake System Inspection']
  }
]

// Mock data for customer documents
const CUSTOMER_DOCUMENTS = [
  {
    id: 'rc-cert',
    type: 'registration',
    name: 'Registration Certificate',
    uploadDate: '2024-01-10',
    expiryDate: null,
    status: 'valid',
    fileUrl: '/api/documents/rc-certificate.pdf'
  },
  {
    id: 'insurance-policy',
    type: 'insurance',
    name: 'Insurance Policy',
    uploadDate: '2024-01-10',
    expiryDate: '2024-12-15',
    status: 'expiring-soon',
    fileUrl: '/api/documents/insurance-policy.pdf'
  },
  {
    id: 'puc-cert',
    type: 'puc',
    name: 'PUC Certificate',
    uploadDate: '2023-11-20',
    expiryDate: '2024-05-20',
    status: 'expired',
    fileUrl: '/api/documents/puc-certificate.pdf'
  }
]

const getDocumentStatusColor = (status) => {
  switch (status) {
    case 'valid': return 'text-green-600 bg-green-50'
    case 'expiring-soon': return 'text-yellow-600 bg-yellow-50'
    case 'expired': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getDocumentStatusIcon = (status) => {
  switch (status) {
    case 'valid': return CheckCircle
    case 'expiring-soon': return AlertTriangle
    case 'expired': return AlertTriangle
    default: return FileText
  }
}

export function DigitalGlovebox({ 
  vehicleInfo = {},
  serviceHistory = SERVICE_HISTORY,
  customerDocuments = CUSTOMER_DOCUMENTS,
  onUploadDocument = () => {},
  onViewDocument = () => {},
  onDownloadDocument = () => {},
  onShareHistory = () => {}
}) {
  const [activeTab, setActiveTab] = useState('service-history')
  const [uploadingDocument, setUploadingDocument] = useState(null)
  const [newDocumentData, setNewDocumentData] = useState({
    type: '',
    expiryDate: ''
  })

  const handleFileUpload = (event, documentType) => {
    const file = event.target.files[0]
    if (file) {
      setUploadingDocument(documentType)
      // Simulate upload process
      setTimeout(() => {
        onUploadDocument(file, documentType, newDocumentData)
        setUploadingDocument(null)
        setNewDocumentData({ type: '', expiryDate: '' })
      }, 2000)
    }
  }

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return 'valid'
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) return 'expired'
    if (daysUntilExpiry <= 30) return 'expiring-soon'
    return 'valid'
  }

  const totalServiceValue = serviceHistory.reduce((sum, service) => sum + service.cost, 0)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Digital Glovebox
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Secure storage for all your vehicle documents and service history
          </div>
          {vehicleInfo && (
            <div className="text-sm font-medium">
              {vehicleInfo.make} {vehicleInfo.model} {vehicleInfo.year} - {vehicleInfo.licensePlate}
            </div>
          )}
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <Button
            variant={activeTab === 'service-history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('service-history')}
            className="flex-1 flex items-center gap-2"
          >
            <Receipt className="h-4 w-4" />
            Service History
          </Button>
          <Button
            variant={activeTab === 'documents' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('documents')}
            className="flex-1 flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            My Documents
          </Button>
        </div>

        {/* Service History Tab */}
        {activeTab === 'service-history' && (
        <div className="space-y-6">
          {/* Service History Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Service History Overview</span>
                <Button variant="outline" onClick={onShareHistory}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share History
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{serviceHistory.length}</div>
                  <div className="text-sm text-gray-600">Total Services</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{totalServiceValue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {serviceHistory[0]?.mileage.toLocaleString() || 0} km
                  </div>
                  <div className="text-sm text-gray-600">Current Mileage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {serviceHistory.length > 0 ? 
                      Math.ceil((Date.now() - new Date(serviceHistory[0].date)) / (1000 * 60 * 60 * 24)) 
                      : 0} days
                  </div>
                  <div className="text-sm text-gray-600">Since Last Service</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Records */}
          <div className="space-y-4">
            {serviceHistory.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {service.serviceType}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        {new Date(service.date).toLocaleDateString()} • {service.mileage.toLocaleString()} km
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{service.cost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Service Advisor: {service.serviceAdvisor}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Services Performed */}
                    <div>
                      <h4 className="font-semibold mb-3">Services Performed</h4>
                      <div className="space-y-2">
                        {service.services.map((serviceItem, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{serviceItem}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Invoice */}
                      <div className="mt-4 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewDocument(service.invoice)}
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          View Invoice ({service.invoice.id})
                        </Button>
                      </div>
                    </div>

                    {/* Service Photos */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Service Photos
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.photos.map((photo) => (
                          <div key={photo.id} className="relative">
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => onViewDocument(photo)}
                            />
                            <div className="mt-1 text-xs text-gray-600 truncate">
                              {photo.caption}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Document Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Vehicle Documents</CardTitle>
              <div className="text-sm text-muted-foreground">
                Keep your important vehicle documents safe and accessible
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Registration Certificate */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <h4 className="font-medium mb-2">Registration Certificate</h4>
                  <input
                    type="file"
                    id="rc-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'registration')}
                  />
                  <Label htmlFor="rc-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" disabled={uploadingDocument === 'registration'}>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingDocument === 'registration' ? 'Uploading...' : 'Upload RC'}
                    </Button>
                  </Label>
                </div>

                {/* Insurance Policy */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <h4 className="font-medium mb-2">Insurance Policy</h4>
                  <div className="space-y-2 mb-3">
                    <Input
                      type="date"
                      placeholder="Expiry Date"
                      value={newDocumentData.expiryDate}
                      onChange={(e) => setNewDocumentData({...newDocumentData, expiryDate: e.target.value})}
                      className="text-xs"
                    />
                  </div>
                  <input
                    type="file"
                    id="insurance-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'insurance')}
                  />
                  <Label htmlFor="insurance-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" disabled={uploadingDocument === 'insurance'}>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingDocument === 'insurance' ? 'Uploading...' : 'Upload Policy'}
                    </Button>
                  </Label>
                </div>

                {/* PUC Certificate */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <h4 className="font-medium mb-2">PUC Certificate</h4>
                  <div className="space-y-2 mb-3">
                    <Input
                      type="date"
                      placeholder="Expiry Date"
                      value={newDocumentData.expiryDate}
                      onChange={(e) => setNewDocumentData({...newDocumentData, expiryDate: e.target.value})}
                      className="text-xs"
                    />
                  </div>
                  <input
                    type="file"
                    id="puc-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'puc')}
                  />
                  <Label htmlFor="puc-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" disabled={uploadingDocument === 'puc'}>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingDocument === 'puc' ? 'Uploading...' : 'Upload PUC'}
                    </Button>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Documents */}
          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerDocuments.map((document) => {
                  const StatusIcon = getDocumentStatusIcon(document.status)
                  const expiryStatus = document.expiryDate ? getExpiryStatus(document.expiryDate) : 'valid'
                  
                  return (
                    <div key={document.id} className={`p-4 rounded-lg border-2 ${getDocumentStatusColor(expiryStatus)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <StatusIcon className="h-6 w-6" />
                          <div>
                            <h4 className="font-semibold">{document.name}</h4>
                            <div className="text-sm opacity-75">
                              Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                            </div>
                            {document.expiryDate && (
                              <div className="text-sm opacity-75">
                                Expires: {new Date(document.expiryDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={expiryStatus === 'valid' ? 'default' : 
                                        expiryStatus === 'expiring-soon' ? 'secondary' : 'destructive'}>
                            {expiryStatus === 'valid' ? 'Valid' :
                             expiryStatus === 'expiring-soon' ? 'Expiring Soon' : 'Expired'}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => onViewDocument(document)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => onDownloadDocument(document)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </div>
  )
}

export default DigitalGlovebox