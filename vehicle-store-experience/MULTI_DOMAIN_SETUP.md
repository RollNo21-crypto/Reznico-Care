# Multi-Domain Development Setup

This application now supports three separate domains for different user roles:
- **Admin Portal**: `admin.reznico.tech` (or `admin.localhost:5174` for local development)
- **Employee Portal**: `employee.reznico.tech` (or `employee.localhost:5174` for local development)  
- **Customer Portal**: `customer.reznico.tech` (or `customer.localhost:5174` for local development)
- **Main Site**: `reznico.tech` (or `localhost:5174` for local development)

## Local Development Setup

### Option 1: Using localhost subdomains (Recommended)

1. **Update your hosts file** (requires administrator privileges):
   
   **Windows**: Edit `C:\Windows\System32\drivers\etc\hosts`
   **Mac/Linux**: Edit `/etc/hosts`
   
   Add these lines:
   ```
   127.0.0.1 localhost
   127.0.0.1 admin.localhost
   127.0.0.1 employee.localhost
   127.0.0.1 customer.localhost
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the different portals**:
   - Main site: http://localhost:5174
   - Admin portal: http://admin.localhost:5174
   - Employee portal: http://employee.localhost:5174
   - Customer portal: http://customer.localhost:5174

### Option 2: Using production-like domains (Advanced)

1. **Update your hosts file**:
   ```
   127.0.0.1 reznico.tech
   127.0.0.1 admin.reznico.tech
   127.0.0.1 employee.reznico.tech
   127.0.0.1 customer.reznico.tech
   ```

2. **Access the different portals**:
   - Main site: http://reznico.tech:5174
   - Admin portal: http://admin.reznico.tech:5174
   - Employee portal: http://employee.reznico.tech:5174
   - Customer portal: http://customer.reznico.tech:5174

## How It Works

The application automatically detects which domain you're accessing and:

1. **Shows appropriate login pages**: Each domain shows only its relevant login form
2. **Enforces role-based access**: Users can only access features appropriate to their role
3. **Provides domain-specific layouts**: Each portal has its own layout and navigation
4. **Handles cross-domain navigation**: Links between portals work seamlessly

## Domain Detection Logic

- **Main domain** (`reznico.tech` or `localhost`): Shows the main landing page with role selection
- **Admin subdomain**: Shows admin login and admin-specific features
- **Employee subdomain**: Shows employee login and employee-specific features  
- **Customer subdomain**: Shows customer login and customer-specific features

## Authentication Flow

1. Users visit their specific domain (e.g., `admin.reznico.tech`)
2. They see the appropriate login form for their role
3. After authentication, they access role-specific features
4. Unauthorized access attempts are blocked with an "Access Denied" page

## Production Deployment

For production deployment, ensure:

1. **DNS Configuration**: Set up proper DNS records for all subdomains
2. **SSL Certificates**: Configure SSL for all domains and subdomains
3. **Environment Variables**: Update any environment-specific configurations
4. **CORS Settings**: Configure CORS policies for cross-domain requests if needed

## Troubleshooting

### Common Issues:

1. **Subdomain not working**: Ensure hosts file is properly configured and saved
2. **Access denied errors**: Check user roles in Clerk dashboard
3. **Navigation issues**: Verify domain detection utility is working correctly

### Testing:

1. Test each domain individually
2. Verify role-based access controls
3. Test cross-domain navigation
4. Ensure authentication works on all domains