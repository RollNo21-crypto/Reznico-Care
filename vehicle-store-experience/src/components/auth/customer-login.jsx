import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Car, Shield, Clock } from 'lucide-react'
import { getCrossDomainUrls } from '@/utils/domain-detection'
import logo from '@/assets/logo-white.png'
import bannerVideo from '@/assets/banner-video.mp4'

export function CustomerLogin({ onNavigate }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [copiedField, setCopiedField] = useState(null)
  const domainUrls = getCrossDomainUrls()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Full-Width Header with Logo */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Reznico Care" className="h-8 md:h-10 w-auto" />
        </div>
        <a
          href={domainUrls.main}
          className="text-gray-400 hover:text-[#D4FF00] transition-colors inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </a>
      </header>

      {/* Split Screen Content */}
      <div className="flex-1 flex">
        {/* Left Column - Features & Video */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-[#D4FF00] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C4EF00] rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] flex items-center justify-center">
                    <Users className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Customer Portal</h2>
                    <p className="text-sm text-gray-400">Your Vehicle Care Hub</p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-300">
                  Track Services, View History & Book Appointments
                </h3>
              </div>

              {/* Video Card */}
               <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D4FF00]/20 to-[#C4EF00]/10 border-2 border-[#D4FF00]/30 backdrop-blur-sm">
                 <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                   <video
                     src={bannerVideo}
                     autoPlay
                     loop
                     muted
                     playsInline
                     className="w-full h-full object-cover rounded-xl"
                   />
                 </div>
               </div>

              {/* Features List */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-300">Customer Features</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-[#D4FF00]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Service History</p>
                      <p className="text-xs text-gray-400">Track all services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#D4FF00]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Appointments</p>
                      <p className="text-xs text-gray-400">Book & manage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-[#D4FF00]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Secure Portal</p>
                      <p className="text-xs text-gray-400">Protected access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[#D4FF00]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Profile</p>
                      <p className="text-xs text-gray-400">Manage account</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-6">
            {/* Mobile Video Card */}
             <div className="lg:hidden mb-8">
               <Card className="overflow-hidden shadow-lg border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                 <CardContent className="p-0">
                   <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                     <video
                       src={bannerVideo}
                       autoPlay
                       loop
                       muted
                       playsInline
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </CardContent>
               </Card>
             </div>

            {/* Login Card */}
            <Card className="border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
              {/* Toggle Buttons */}
              <div className="flex gap-2 p-4 border-b border-gray-800">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${
                    !isSignUp
                      ? 'bg-[#D4FF00] text-black'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${
                    isSignUp
                      ? 'bg-[#D4FF00] text-black'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <CardContent className="pt-3 -ml-6">
                {!isSignUp ? (
                  <SignIn 
                    afterSignInUrl="/customer-dashboard"
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent p-0",
                        formButtonPrimary: "bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold rounded-full text-xs",
                        formFieldInput: "bg-gray-800/50 border-gray-700 text-white rounded-md text-xs",
                        formFieldLabel: "text-gray-300 text-xs",
                        socialButtonsBlockButton: "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 rounded-md text-xs",
                        socialButtonsBlockButtonText: "text-xs",
                        dividerLine: "bg-gray-700",
                        dividerText: "text-gray-400 text-xs",
                        footerActionLink: "text-[#D4FF00] hover:text-[#C4EF00] text-xs",
                        footer: "hidden"
                      }
                    }}
                  />
                ) : (
                  <SignUp
                    afterSignUpUrl="/customer-dashboard"
                    unsafeMetadata={{ role: "customer" }}
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent p-0",
                        formButtonPrimary: "bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold rounded-full text-xs",
                        formFieldInput: "bg-gray-800/50 border-gray-700 text-white rounded-md text-xs",
                        formFieldLabel: "text-gray-300 text-xs",
                        socialButtonsBlockButton: "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 rounded-md text-xs",
                        socialButtonsBlockButtonText: "text-xs",
                        dividerLine: "bg-gray-700",
                        dividerText: "text-gray-400 text-xs",
                        footerActionLink: "text-[#D4FF00] hover:text-[#C4EF00] text-xs",
                        footer: "hidden"
                      }
                    }}
                  />
                )}
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>

      {/* Full-Width Footer */}
      <footer className="border-t border-gray-800 px-6 py-4 md:px-12">
        <p className="text-center text-xs text-gray-500">
          © 2025 Reznico Care • v1.0.0
        </p>
      </footer>
    </div>
  )
}
