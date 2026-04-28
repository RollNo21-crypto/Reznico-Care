import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Camera, 
  Scan, 
  Package, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react'
import partsService from '../services/parts-service'

export function BarcodeScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState('')
  const [partInfo, setPartInfo] = useState(null)
  const [scanHistory, setScanHistory] = useState([])
  const [manualCode, setManualCode] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [scanMode, setScanMode] = useState('lookup') // 'lookup', 'checkin', 'checkout'
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Mock barcode database
  const barcodeDatabase = {
    '123456789012': {
      id: 'part-001',
      name: 'Brake Pad Set - Front',
      partNumber: 'BP-F-001',
      category: 'Brakes',
      price: 89.99,
      stock: 25,
      location: 'A-1-3',
      supplier: 'NAPA Auto Parts'
    },
    '234567890123': {
      id: 'part-002', 
      name: 'Oil Filter',
      partNumber: 'OF-STD-002',
      category: 'Engine',
      price: 12.99,
      stock: 150,
      location: 'B-2-1',
      supplier: 'AutoZone'
    },
    '345678901234': {
      id: 'part-003',
      name: 'Air Filter',
      partNumber: 'AF-STD-003',
      category: 'Engine',
      price: 24.99,
      stock: 75,
      location: 'B-2-2',
      supplier: 'Local Supplier'
    }
  }

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Camera access denied or not available')
    }
  }

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
    }
    setIsScanning(false)
  }

  const simulateBarcodeScan = () => {
    // Simulate scanning a random barcode for demo
    const codes = Object.keys(barcodeDatabase)
    const randomCode = codes[Math.floor(Math.random() * codes.length)]
    handleBarcodeDetected(randomCode)
  }

  const handleBarcodeDetected = (code) => {
    setScannedCode(code)
    const part = barcodeDatabase[code]
    
    if (part) {
      setPartInfo(part)
      const scanEntry = {
        id: Date.now(),
        code,
        part,
        timestamp: new Date(),
        mode: scanMode,
        quantity
      }
      setScanHistory(prev => [scanEntry, ...prev.slice(0, 9)])
      
      // Process based on scan mode
      processScan(part, scanMode, quantity)
    } else {
      setPartInfo(null)
      alert('Part not found in database')
    }
    
    stopScanning()
  }

  const processScan = (part, mode, qty) => {
    switch (mode) {
      case 'checkin':
        // Add to inventory
        console.log(`Checking in ${qty} units of ${part.name}`)
        break
      case 'checkout':
        // Remove from inventory
        console.log(`Checking out ${qty} units of ${part.name}`)
        break
      case 'lookup':
      default:
        // Just display info
        console.log(`Looking up ${part.name}`)
        break
    }
  }

  const handleManualLookup = () => {
    if (manualCode) {
      handleBarcodeDetected(manualCode)
      setManualCode('')
    }
  }

  const adjustQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Scanner Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Scan className="h-6 w-6 text-[#D4FF00]" />
            Barcode Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scan Mode Selection */}
          <div className="flex gap-2">
            {[
              { mode: 'lookup', label: 'Lookup', icon: Search },
              { mode: 'checkin', label: 'Check In', icon: Plus },
              { mode: 'checkout', label: 'Check Out', icon: Minus }
            ].map(({ mode, label, icon: Icon }) => (
              <Button
                key={mode}
                variant={scanMode === mode ? "default" : "outline"}
                onClick={() => setScanMode(mode)}
                className={scanMode === mode ? "bg-[#D4FF00] text-black" : "text-white border-gray-600"}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>

          {/* Quantity Selector (for checkin/checkout) */}
          {(scanMode === 'checkin' || scanMode === 'checkout') && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Quantity:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustQuantity(-1)}
                className="text-white border-gray-600"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-white font-bold px-4">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustQuantity(1)}
                className="text-white border-gray-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Interface */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="h-5 w-5 text-[#D4FF00]" />
              Camera Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera View */}
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {isScanning ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4" />
                    <p>Camera not active</p>
                  </div>
                </div>
              )}
              
              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-[#D4FF00] w-64 h-32 rounded-lg animate-pulse" />
                </div>
              )}
            </div>

            {/* Scanner Controls */}
            <div className="flex gap-2">
              {!isScanning ? (
                <Button
                  onClick={startScanning}
                  className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <>
                  <Button
                    onClick={simulateBarcodeScan}
                    className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
                  >
                    <Scan className="h-4 w-4 mr-2" />
                    Simulate Scan
                  </Button>
                  <Button
                    onClick={stopScanning}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    Stop
                  </Button>
                </>
              )}
            </div>

            {/* Manual Entry */}
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-300 mb-2">Manual Entry:</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter barcode manually"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleManualLookup()}
                />
                <Button
                  onClick={handleManualLookup}
                  variant="outline"
                  className="text-white border-gray-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Results */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-[#D4FF00]" />
              Scan Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {partInfo ? (
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{partInfo.name}</h3>
                      <p className="text-gray-400">Part #: {partInfo.partNumber}</p>
                    </div>
                    <Badge className="bg-[#D4FF00] text-black">
                      {partInfo.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Price:</span>
                      <p className="text-white font-semibold">${partInfo.price}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Stock:</span>
                      <p className="text-white font-semibold">{partInfo.stock} units</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <p className="text-white font-semibold">{partInfo.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Supplier:</span>
                      <p className="text-white font-semibold">{partInfo.supplier}</p>
                    </div>
                  </div>

                  {scannedCode && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <span className="text-gray-400">Barcode:</span>
                      <p className="text-white font-mono">{scannedCode}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Order
                  </Button>
                  <Button variant="outline" className="text-white border-gray-600">
                    View Details
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Scan className="h-16 w-16 mx-auto mb-4" />
                <p>Scan a barcode to see part information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scanHistory.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      scan.mode === 'checkin' ? 'bg-green-500/20 text-green-400' :
                      scan.mode === 'checkout' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {scan.mode === 'checkin' ? <Plus className="h-4 w-4" /> :
                       scan.mode === 'checkout' ? <Minus className="h-4 w-4" /> :
                       <Search className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{scan.part.name}</p>
                      <p className="text-gray-400 text-sm">{scan.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{scan.mode === 'lookup' ? '' : `${scan.quantity}x`}</p>
                    <p className="text-gray-400 text-sm">
                      {scan.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}