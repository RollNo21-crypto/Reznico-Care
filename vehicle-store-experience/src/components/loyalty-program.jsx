import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Star, 
  Gift, 
  Crown,
  Medal,
  Award,
  Calendar,
  Users,
  MessageSquare,
  Camera,
  FileText,
  Car,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

// Loyalty tiers configuration
const LOYALTY_TIERS = {
  bronze: {
    name: 'Bronze',
    icon: Medal,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    minServices: 0,
    maxServices: 2,
    pointsPerRupee: 5,
    benefits: ['5 points per ₹100 spent', 'Basic service reminders']
  },
  silver: {
    name: 'Silver',
    icon: Award,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    minServices: 3,
    maxServices: 4,
    pointsPerRupee: 10,
    benefits: ['10 points per ₹100 spent', '1 free car wash per month', 'Priority booking']
  },
  gold: {
    name: 'Gold',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    minServices: 5,
    maxServices: Infinity,
    pointsPerRupee: 15,
    benefits: ['15 points per ₹100 spent', '1 free pickup/drop per month', 'VIP customer support', 'Exclusive offers']
  }
}

// Achievement badges configuration
const ACHIEVEMENT_BADGES = [
  {
    id: 'planner',
    name: 'The Planner',
    description: 'Book your service more than 1 week in advance',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    points: 100,
    unlocked: true,
    unlockedDate: '2024-01-10'
  },
  {
    id: 'maintenance-master',
    name: 'Maintenance Master',
    description: 'Complete 3 on-time scheduled services in a row',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    points: 250,
    unlocked: true,
    unlockedDate: '2024-01-05'
  },
  {
    id: 'referral-king',
    name: 'Referral King',
    description: 'Refer a new customer who completes a service',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    points: 500,
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'review-pro',
    name: 'Review Pro',
    description: 'Leave a photo review after a service',
    icon: Camera,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    points: 150,
    unlocked: true,
    unlockedDate: '2023-12-20'
  },
  {
    id: 'glovebox-guru',
    name: 'Glovebox Guru',
    description: 'Upload all 3 documents (RC, Insurance, PUC) to your glovebox',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    points: 200,
    unlocked: false,
    progress: 2,
    target: 3
  }
]

// Mock customer data
const CUSTOMER_DATA = {
  name: 'Rajesh Kumar',
  totalServices: 4,
  totalSpent: 45000,
  currentPoints: 4750,
  tier: 'silver',
  joinDate: '2023-06-15',
  nextTierProgress: 80, // percentage to next tier
  recentTransactions: [
    { date: '2024-01-15', service: 'Regular Maintenance', amount: 8500, pointsEarned: 850 },
    { date: '2023-12-10', service: 'Brake Service', amount: 12000, pointsEarned: 1200 },
    { date: '2023-09-20', service: 'Oil Change', amount: 3500, pointsEarned: 350 },
    { date: '2023-07-05', service: 'AC Service', amount: 6500, pointsEarned: 650 }
  ]
}

// Rewards catalog
const REWARDS_CATALOG = [
  {
    id: 'discount-10',
    name: '10% Service Discount',
    description: 'Get 10% off on your next service',
    pointsCost: 1000,
    category: 'discount',
    available: true
  },
  {
    id: 'free-wash',
    name: 'Free Car Wash',
    description: 'Complimentary exterior car wash',
    pointsCost: 500,
    category: 'service',
    available: true
  },
  {
    id: 'pickup-drop',
    name: 'Free Pickup & Drop',
    description: 'Free vehicle pickup and drop service',
    pointsCost: 800,
    category: 'service',
    available: true
  },
  {
    id: 'discount-20',
    name: '20% Service Discount',
    description: 'Get 20% off on your next service',
    pointsCost: 2000,
    category: 'discount',
    available: true
  },
  {
    id: 'premium-service',
    name: 'Premium Service Package',
    description: 'Complete premium service with detailing',
    pointsCost: 3000,
    category: 'service',
    available: false
  }
]

export function LoyaltyProgram({ 
  customerData = CUSTOMER_DATA,
  achievements = ACHIEVEMENT_BADGES,
  rewards = REWARDS_CATALOG,
  onRedeemReward = () => {},
  onReferFriend = () => {}
}) {
  const [selectedReward, setSelectedReward] = useState(null)
  
  const currentTier = LOYALTY_TIERS[customerData.tier]
  const nextTierKey = customerData.tier === 'bronze' ? 'silver' : customerData.tier === 'silver' ? 'gold' : null
  const nextTier = nextTierKey ? LOYALTY_TIERS[nextTierKey] : null
  
  const unlockedAchievements = achievements.filter(badge => badge.unlocked)
  const lockedAchievements = achievements.filter(badge => !badge.unlocked)
  
  const availableRewards = rewards.filter(reward => reward.available && reward.pointsCost <= customerData.currentPoints)
  const unavailableRewards = rewards.filter(reward => !reward.available || reward.pointsCost > customerData.currentPoints)

  const TierIcon = currentTier.icon

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header - Current Status */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Loyalty Program
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Welcome back, {customerData.name}!
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{customerData.currentPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Available Points</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Tier Status */}
      <Card className={`mb-6 ${currentTier.borderColor} border-2`}>
        <CardHeader className={currentTier.bgColor}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TierIcon className={`h-8 w-8 ${currentTier.color}`} />
              <div>
                <CardTitle className={`text-xl ${currentTier.color}`}>
                  {currentTier.name} Member
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Member since {new Date(customerData.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{customerData.totalServices} Services</div>
              <div className="text-sm text-muted-foreground">₹{customerData.totalSpent.toLocaleString()} Spent</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Benefits */}
            <div>
              <h4 className="font-semibold mb-3">Your Benefits</h4>
              <div className="space-y-2">
                {currentTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress to Next Tier */}
            {nextTier && (
              <div>
                <h4 className="font-semibold mb-3">Progress to {nextTier.name}</h4>
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(customerData.nextTierProgress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {nextTier.minServices - customerData.totalServices} more service{nextTier.minServices - customerData.totalServices !== 1 ? 's' : ''} to reach {nextTier.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next tier benefits: {nextTier.benefits.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <Button 
            variant={selectedReward === 'rewards' ? 'default' : 'ghost'}
            onClick={() => setSelectedReward('rewards')}
            className="flex-1 flex items-center gap-2"
          >
            <Gift className="h-4 w-4" />
            Rewards
          </Button>
          <Button 
            variant={selectedReward === 'achievements' ? 'default' : 'ghost'}
            onClick={() => setSelectedReward('achievements')}
            className="flex-1 flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Achievements
          </Button>
          <Button 
            variant={selectedReward === 'history' ? 'default' : 'ghost'}
            onClick={() => setSelectedReward('history')}
            className="flex-1 flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            History
          </Button>
        </div>

        {/* Rewards Tab */}
        {(!selectedReward || selectedReward === 'rewards') && (
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <div className="text-sm text-muted-foreground">
                Redeem your points for exclusive rewards and discounts
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableRewards.map((reward) => (
                  <Card key={reward.id} className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{reward.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Available
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-blue-600">
                          {reward.pointsCost.toLocaleString()} pts
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => onRedeemReward(reward)}
                        >
                          Redeem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {unavailableRewards.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Coming Soon</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unavailableRewards.map((reward) => (
                      <Card key={reward.id} className="border-gray-200 bg-gray-50 opacity-75">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-600">{reward.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                            </div>
                            <Badge variant="outline" className="text-gray-500">
                              {reward.pointsCost > customerData.currentPoints ? 'Need More Points' : 'Unavailable'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-500">
                              {reward.pointsCost.toLocaleString()} pts
                            </div>
                            <Button size="sm" disabled>
                              {reward.pointsCost > customerData.currentPoints ? 
                                `Need ${(reward.pointsCost - customerData.currentPoints).toLocaleString()} more` : 
                                'Coming Soon'
                              }
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {selectedReward === 'achievements' && (
          <div className="space-y-6">
          {/* Unlocked Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Unlocked Achievements ({unlockedAchievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unlockedAchievements.map((badge) => {
                  const BadgeIcon = badge.icon
                  return (
                    <Card key={badge.id} className={`${badge.bgColor} border-2 border-current ${badge.color}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <BadgeIcon className={`h-8 w-8 ${badge.color}`} />
                          <div className="flex-1">
                            <h4 className="font-semibold">{badge.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge className={badge.color}>
                                +{badge.points} points
                              </Badge>
                              <div className="text-xs text-gray-500">
                                Unlocked {new Date(badge.unlockedDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Locked Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Available Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lockedAchievements.map((badge) => {
                  const BadgeIcon = badge.icon
                  const progress = badge.progress || 0
                  const target = badge.target || 1
                  const progressPercentage = (progress / target) * 100
                  
                  return (
                    <Card key={badge.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <BadgeIcon className="h-8 w-8 text-gray-400" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-700">{badge.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                            
                            {badge.progress !== undefined && (
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {progress}/{target} completed
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-3">
                              <Badge variant="outline" className="text-gray-600">
                                +{badge.points} points
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Referral Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Refer Friends & Earn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">500 Points</div>
                <div className="text-lg mb-4">For each successful referral</div>
                <div className="text-sm text-gray-600 mb-6">
                  When your friend completes their first service, you both earn points!
                </div>
                <Button onClick={onReferFriend} size="lg">
                  <Users className="h-4 w-4 mr-2" />
                  Refer a Friend
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        )}

        {/* History Tab */}
        {selectedReward === 'history' && (
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">{transaction.service}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        +{transaction.pointsEarned} points
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoyaltyProgram