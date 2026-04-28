import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Calendar,
  Wrench,
  Car,
  BarChart3,
  Activity,
  Bell,
  Settings,
  Database
} from 'lucide-react'

export function PredictiveMaintenance() {
  const [predictions, setPredictions] = useState([])
  const [vehicleHealth, setVehicleHealth] = useState({})
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([])
  const [aiInsights, setAiInsights] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Mock AI predictions
  const mockPredictions = [
    {
      id: 'pred-1',
      vehicle: '2019 Toyota Camry - ABC123',
      component: 'Brake Pads',
      currentCondition: 65,
      predictedFailure: '2024-02-15',
      confidence: 92,
      severity: 'medium',
      recommendedAction: 'Schedule replacement within 2 weeks',
      costImpact: 150,
      mileageAtFailure: 85000
    },
    {
      id: 'pred-2',
      vehicle: '2020 Honda Civic - XYZ789',
      component: 'Transmission Fluid',
      currentCondition: 40,
      predictedFailure: '2024-01-28',
      confidence: 87,
      severity: 'high',
      recommendedAction: 'Immediate service required',
      costImpact: 300,
      mileageAtFailure: 62000
    },
    {
      id: 'pred-3',
      vehicle: '2018 Ford F-150 - DEF456',
      component: 'Air Filter',
      currentCondition: 75,
      predictedFailure: '2024-03-10',
      confidence: 95,
      severity: 'low',
      recommendedAction: 'Plan replacement next month',
      costImpact: 45,
      mileageAtFailure: 78000
    }
  ]

  const mockVehicleHealth = {
    totalVehicles: 156,
    healthyVehicles: 98,
    warningVehicles: 42,
    criticalVehicles: 16,
    averageHealth: 78,
    predictiveAccuracy: 94.2
  }

  const mockAiInsights = [
    {
      id: 'insight-1',
      type: 'pattern',
      title: 'Seasonal Brake Wear Pattern Detected',
      description: 'Brake pad wear increases 23% during winter months due to road conditions',
      impact: 'Adjust inventory levels for Q1 brake components',
      confidence: 89
    },
    {
      id: 'insight-2',
      type: 'optimization',
      title: 'Oil Change Interval Optimization',
      description: 'Vehicles with synthetic oil can safely extend intervals by 15%',
      impact: 'Reduce oil change frequency, save $2,400/month',
      confidence: 96
    },
    {
      id: 'insight-3',
      type: 'prediction',
      title: 'Battery Failure Surge Predicted',
      description: 'Cold weather will cause 40% increase in battery failures next week',
      impact: 'Stock additional batteries, prepare for 12 replacements',
      confidence: 91
    }
  ]

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true)
    setTimeout(() => {
      setPredictions(mockPredictions)
      setVehicleHealth(mockVehicleHealth)
      setAiInsights(mockAiInsights)
      setIsAnalyzing(false)
    }, 2000)
  }, [])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getHealthColor = (condition) => {
    if (condition >= 80) return 'text-green-400'
    if (condition >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const runAiAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      // Simulate new analysis results
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-[#D4FF00]" />
            AI Predictive Maintenance
          </CardTitle>
          <p className="text-gray-400">
            Proactive maintenance recommendations powered by machine learning
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Run AI Analysis
                </>
              )}
            </Button>
            <div className="flex items-center gap-2 text-gray-400">
              <Database className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="predictions" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Predictions
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            Fleet Health
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-[#D4FF00] data-[state=active]:text-black">
            AI Insights
          </TabsTrigger>
        </TabsList>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {prediction.component}
                      </h3>
                      <p className="text-gray-400">{prediction.vehicle}</p>
                    </div>
                    <Badge className={`${getSeverityColor(prediction.severity)} text-white`}>
                      {prediction.severity.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Current Condition</p>
                      <p className={`text-xl font-bold ${getHealthColor(prediction.currentCondition)}`}>
                        {prediction.currentCondition}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Predicted Failure</p>
                      <p className="text-white font-semibold">
                        {new Date(prediction.predictedFailure).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Confidence</p>
                      <p className="text-[#D4FF00] font-semibold">{prediction.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cost Impact</p>
                      <p className="text-white font-semibold">${prediction.costImpact}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-white font-medium mb-2">Recommended Action:</p>
                    <p className="text-gray-300">{prediction.recommendedAction}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Service
                    </Button>
                    <Button variant="outline" className="text-white border-gray-600">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                    <Button variant="outline" className="text-white border-gray-600">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Fleet Health Tab */}
        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Car className="h-8 w-8 text-[#D4FF00]" />
                  <div>
                    <p className="text-2xl font-bold text-white">{vehicleHealth.totalVehicles}</p>
                    <p className="text-gray-400">Total Vehicles</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-green-400">{vehicleHealth.healthyVehicles}</p>
                    <p className="text-gray-400">Healthy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{vehicleHealth.warningVehicles}</p>
                    <p className="text-gray-400">Warning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-8 w-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-red-400">{vehicleHealth.criticalVehicles}</p>
                    <p className="text-gray-400">Critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-8 w-8 text-[#D4FF00]" />
                  <div>
                    <p className="text-2xl font-bold text-[#D4FF00]">{vehicleHealth.averageHealth}%</p>
                    <p className="text-gray-400">Avg Health</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{vehicleHealth.predictiveAccuracy}%</p>
                    <p className="text-gray-400">AI Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Trend Chart Placeholder */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Fleet Health Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <p>Health trend visualization would appear here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    insight.type === 'pattern' ? 'bg-blue-500/20 text-blue-400' :
                    insight.type === 'optimization' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {insight.type === 'pattern' ? <TrendingUp className="h-6 w-6" /> :
                     insight.type === 'optimization' ? <Settings className="h-6 w-6" /> :
                     <Brain className="h-6 w-6" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                      <Badge className="bg-[#D4FF00] text-black">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{insight.description}</p>
                    
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-[#D4FF00] font-medium">Impact:</p>
                      <p className="text-white">{insight.impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}