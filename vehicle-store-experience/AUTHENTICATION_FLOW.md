# Authentication Flow - Reznico Care

## Overview
The system implements a role-based authentication system with restricted admin access and employee self-registration.

## User Roles

### 1. Admin / Owner
- **Access Level**: Full system access
- **Capabilities**:
  - Dashboard with analytics
  - Business management
  - View all operations
  - Manage settings
- **Registration**: Pre-configured only (no new admin signups)
- **Demo Credentials**:
  - Email: `admin@reznicocare.com`
  - Password: `demo123`

### 2. Employee / Worker
- **Access Level**: Operational access
- **Capabilities**:
  - Service intake
  - Customer onboarding
  - Daily operations
- **Registration**: Self-registration via signup form
- **After Signup**: Redirects to service intake dashboard

### 3. Customers
- **Access Level**: None (managed by employees)
- **Registration**: Cannot self-register
- **Onboarding**: Created by employees through customer onboarding form

## Authentication Pages

### 1. Landing Page (`/`)
- Full-screen video background
- "Take a Demo" CTA → Choose Role page
- "Contact Us" popup form
- **Route**: `/`

### 2. Choose Role Page (`/choose-role`)
- **New Design**: Split-screen interactive layout
  - **Left Column** (Desktop only):
    - Animated background with brand colors
    - Welcome message
    - Feature highlights
    - Brand information
  - **Right Column**:
    - Role selection cards
    - Admin login button
    - Employee login button
    - Demo credentials notice
    - Quick links to signup
- **Route**: `/choose-role`

### 3. Admin Login (`/admin-login`)
- **Features**:
  - Demo credentials displayed prominently
  - Dark theme with lime green accents
  - No signup option (disabled)
  - Redirects to `/dashboard` after login
- **Demo Credentials Box**: Shows email and password for testing
- **Route**: `/admin-login`

### 4. Employee Login (`/employee-login`)
- **Features**:
  - Dark theme consistent with brand
  - Link to signup for new employees
  - Redirects to `/service-intake` after login
- **Route**: `/employee-login`

### 5. Signup - Employee Only (`/signup`)
- **Features**:
  - Blue notice explaining employee-only registration
  - No admin signup allowed
  - After signup → service intake page
- **Notice**: "This form is for new employees/workers joining the team"
- **Route**: `/signup`

## User Flow Diagrams

### New Employee Flow
```
Landing Page → Choose Role → Employee Login → Click "Sign up" → 
Complete Registration → Service Intake Dashboard
```

### Admin Flow (Demo)
```
Landing Page → Choose Role → Admin Login → 
Use Demo Credentials → Dashboard
```

### Employee Login Flow
```
Landing Page → Choose Role → Employee Login → 
Enter Credentials → Service Intake Dashboard
```

### Customer Onboarding Flow
```
Employee Logs In → Service Intake → 
Customer Onboarding Form → Customer Created
```

## Security & Access Control

### Restrictions
1. **No New Admin Accounts**: Signup disabled for admin role
2. **Demo Account**: Pre-configured for testing
3. **Employee Self-Service**: Employees can register themselves
4. **Customer Management**: Only employees can create customer accounts

### Clerk Configuration
- **Admin Signup URL**: Disabled (`signUpUrl="#"`)
- **Employee Signup URL**: Points to `/signup`
- **Role Assignment**: Set via Clerk publicMetadata
  - Admin: `{ role: "admin" }`
  - Employee: `{ role: "employee" }`

## Demo Credentials

### Admin Access
```
Email: admin@reznicocare.com
Password: demo123
```

**Note**: Replace with actual credentials when provided by user.

## Next Steps

1. **Configure Clerk**:
   - Create admin user with demo credentials
   - Set up role metadata in Clerk dashboard
   - Configure email verification

2. **Update Demo Credentials**:
   - Replace placeholder credentials when actual demo account is ready
   - Update both admin-login.jsx and choose role page

3. **Test Flows**:
   - Admin login with demo credentials
   - Employee registration
   - Employee login
   - Customer onboarding by employee

## File Locations

- Landing Page: `src/components/landing-page.jsx`
- Choose Role: `src/App.jsx` (home view)
- Admin Login: `src/components/auth/admin-login.jsx`
- Employee Login: `src/components/auth/employee-login.jsx`
- Signup: `src/components/auth/signup.jsx`

## Design Features

### Choose Role Page (New)
- **Split-screen layout** (desktop)
- **Animated background** with pulsing effects
- **Feature checklist** with icons
- **Large interactive buttons** with hover effects
- **Demo credentials notice** highlighted
- **Responsive**: Stacks on mobile

### Visual Elements
- Lime green (#D4FF00) accent color
- Dark background (gray-900 to black gradient)
- Rounded-full buttons
- Backdrop blur effects
- Smooth transitions (300ms)
- Scale hover effects (1.02-1.10)

---

**Last Updated**: 2025  
**Version**: 1.0.0  
**System**: Reznico Care Vehicle Store Management
