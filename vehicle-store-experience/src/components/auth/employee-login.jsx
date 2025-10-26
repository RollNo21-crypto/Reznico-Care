import { SignIn, SignUp } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowLeft, ClipboardList, UserPlus, Package, Headphones } from "lucide-react"
import logo from '@/assets/logo-white.png'
import { useState } from 'react'

export function EmployeeLogin({ onNavigate }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [copiedField, setCopiedField] = useState(null)

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Full-Width Header with Logo */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Reznico Care" className="h-8 md:h-10 w-auto" />
          
        </div>
        <a href="/" className="text-gray-400 hover:text-[#D4FF00] transition-colors inline-flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </a>
      </header>

      {/* Split Screen Content */}
      <div className="flex-1 flex">
      {/* Left Column - Features & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#D4FF00] rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C4EF00] rounded-full blur-3xl animate-pulse"></div>
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
                  <h2 className="text-3xl font-bold">Employee Portal</h2>
                  <p className="text-sm text-gray-400">Service & Operations</p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-300">
                Streamline Customer Service & Daily Operations
              </h3>
            </div>

            {/* Demo Credentials - Highlighted */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D4FF00]/20 to-[#C4EF00]/10 border-2 border-[#D4FF00]/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#D4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <h4 className="text-lg font-semibold text-[#D4FF00]">Demo Credentials</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Email Address</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-2 bg-gray-900/50 rounded-lg text-sm font-mono text-white border border-gray-700">
                      employee@reznicocare.com
                    </code>
                    <button 
                      onClick={() => copyToClipboard('employee@reznicocare.com', 'email')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs text-white"
                    >
                      {copiedField === 'email' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Password</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-2 bg-gray-900/50 rounded-lg text-sm font-mono text-white border border-gray-700">
                      demo123
                    </code>
                    <button 
                      onClick={() => copyToClipboard('demo123', 'password')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs text-white"
                    >
                      {copiedField === 'password' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Use these credentials to explore employee features
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-300">Employee Features</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-5 h-5 text-[#D4FF00]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Service Intake</p>
                    <p className="text-xs text-gray-400">Process requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-[#D4FF00]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Customer Onboarding</p>
                    <p className="text-xs text-gray-400">Add new customers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-[#D4FF00]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Inventory Tracking</p>
                    <p className="text-xs text-gray-400">Monitor stock</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-5 h-5 text-[#D4FF00]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Customer Support</p>
                    <p className="text-xs text-gray-400">Service excellence</p>
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

            <CardContent className="pt-6">
              {!isSignUp ? (
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 bg-transparent",
                      formButtonPrimary: "bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105",
                      formFieldInput: "bg-gray-800/50 border-gray-700 text-white rounded-lg",
                      footerActionLink: "text-[#D4FF00] hover:text-[#C4EF00]",
                      footer: "hidden"
                    }
                  }}
                />
              ) : (
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 bg-transparent",
                      formButtonPrimary: "bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105",
                      formFieldInput: "bg-gray-800/50 border-gray-700 text-white rounded-lg",
                      footerActionLink: "text-[#D4FF00] hover:text-[#C4EF00]",
                      footer: "hidden"
                    }
                  }}
                />
              )}
            </CardContent>
          </Card>

          {/* Mobile Demo Credentials */}
          <div className="lg:hidden p-4 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30">
            <h4 className="text-sm font-semibold text-[#D4FF00] mb-2">Demo Credentials</h4>
            <div className="space-y-2 text-xs">
              <p className="text-gray-300">
                <span className="text-gray-500">Email:</span>{" "}
                <code className="bg-gray-800/50 px-2 py-1 rounded">employee@reznicocare.com</code>
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Password:</span>{" "}
                <code className="bg-gray-800/50 px-2 py-1 rounded">demo123</code>
              </p>
            </div>
          </div>

          {/* Switch Login Link */}
          <div className="text-center">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate && onNavigate('admin-login');
              }}
              className="text-sm text-[#D4FF00] hover:text-[#C4EF00] font-medium transition-colors"
            >
              Admin Login →
            </button>
          </div>
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
