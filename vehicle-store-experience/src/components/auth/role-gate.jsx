import { useUser } from "@clerk/clerk-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RoleGate({ children, allowedRoles = [] }) {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Get user role from Clerk metadata
  const userRole = user?.publicMetadata?.role || 'customer'

  // Check if user has required role
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole)

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription className="mt-2">
            You don't have permission to access this page.
            <div className="mt-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Go to Home
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <>{children}</>
}

// Hook to get current user role
export function useUserRole() {
  const { user } = useUser()
  return user?.publicMetadata?.role || 'customer'
}
