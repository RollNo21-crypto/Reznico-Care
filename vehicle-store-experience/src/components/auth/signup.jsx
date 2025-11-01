import { SignUp } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, ArrowLeft, AlertCircle } from "lucide-react"
import { getCrossDomainUrls } from '@/utils/domain-detection'

export function Signup() {
  const domainUrls = getCrossDomainUrls()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#D4FF00] to-[#C4EF00] bg-clip-text text-transparent">
            Reznico Care
          </h1>
          <p className="text-sm text-gray-400">Vehicle Store Management</p>
        </div>

        {/* Employee Only Notice */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-1">Employee Registration Only</h4>
              <p className="text-xs text-gray-400">
                This form is for new employees/workers joining the team. Admin accounts are pre-configured.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00] shadow-lg transition-all duration-300 hover:scale-110">
              <UserPlus className="h-10 w-10 text-black" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-white tracking-tight">Join Our Team</CardTitle>
              <CardDescription className="text-base mt-2 text-gray-400">
                Create your employee account to get started
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <SignUp 
              routing="hash"
              signInUrl="/"
              afterSignUpUrl="/service-intake"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  formButtonPrimary: "bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105",
                  formFieldInput: "bg-gray-800/50 border-gray-700 text-white rounded-lg",
                  footerActionLink: "text-[#D4FF00] hover:text-[#C4EF00]",
                }
              }}
            />
          </CardContent>
        </Card>
        <div className="flex items-center justify-between text-sm">
          <a href="/" className="text-gray-400 hover:text-[#D4FF00] transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
          <a href={domainUrls.employee} className="text-[#D4FF00] hover:text-[#C4EF00] font-medium transition-colors">
            Already have an account?
          </a>
        </div>
        <div className="text-center text-xs text-gray-500">
          © 2025 Reznico Care • v1.0.0
        </div>
      </div>
    </div>
  )
}
