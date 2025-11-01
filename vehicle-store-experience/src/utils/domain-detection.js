/**
 * Domain Detection Utility for Multi-Domain Setup
 * Handles routing for admin.reznico.tech, employee.reznico.tech, customer.reznico.tech
 */

export const DOMAIN_TYPES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee', 
  CUSTOMER: 'customer',
  MAIN: 'main' // For localhost or main domain
}

export const PRODUCTION_DOMAINS = {
  [DOMAIN_TYPES.ADMIN]: 'admin.reznico.tech',
  [DOMAIN_TYPES.EMPLOYEE]: 'employee.reznico.tech',
  [DOMAIN_TYPES.CUSTOMER]: 'customer.reznico.tech'
}

export const LOCAL_DOMAINS = {
  [DOMAIN_TYPES.ADMIN]: 'admin.localhost:5174',
  [DOMAIN_TYPES.EMPLOYEE]: 'employee.localhost:5174', 
  [DOMAIN_TYPES.CUSTOMER]: 'customer.localhost:5174',
  [DOMAIN_TYPES.MAIN]: 'localhost:5174'
}

/**
 * Detects the current domain type based on hostname
 * @returns {string} Domain type (admin, employee, customer, main)
 */
export function detectDomainType() {
  const hostname = window.location.hostname
  const port = window.location.port
  const fullHost = port ? `${hostname}:${port}` : hostname
  
  // Check production domains
  if (hostname === PRODUCTION_DOMAINS[DOMAIN_TYPES.ADMIN]) {
    return DOMAIN_TYPES.ADMIN
  }
  if (hostname === PRODUCTION_DOMAINS[DOMAIN_TYPES.EMPLOYEE]) {
    return DOMAIN_TYPES.EMPLOYEE
  }
  if (hostname === PRODUCTION_DOMAINS[DOMAIN_TYPES.CUSTOMER]) {
    return DOMAIN_TYPES.CUSTOMER
  }
  
  // Check local development domains
  if (fullHost === LOCAL_DOMAINS[DOMAIN_TYPES.ADMIN]) {
    return DOMAIN_TYPES.ADMIN
  }
  if (fullHost === LOCAL_DOMAINS[DOMAIN_TYPES.EMPLOYEE]) {
    return DOMAIN_TYPES.EMPLOYEE
  }
  if (fullHost === LOCAL_DOMAINS[DOMAIN_TYPES.CUSTOMER]) {
    return DOMAIN_TYPES.CUSTOMER
  }
  
  // Check for subdomain pattern (e.g., admin.localhost, employee.localhost)
  if (hostname.includes('admin')) {
    return DOMAIN_TYPES.ADMIN
  }
  if (hostname.includes('employee')) {
    return DOMAIN_TYPES.EMPLOYEE
  }
  if (hostname.includes('customer')) {
    return DOMAIN_TYPES.CUSTOMER
  }
  
  // Default to main domain
  return DOMAIN_TYPES.MAIN
}

/**
 * Gets the appropriate role based on domain type
 * @param {string} domainType - The detected domain type
 * @returns {string} User role (admin, employee, customer)
 */
export function getDomainRole(domainType) {
  switch (domainType) {
    case DOMAIN_TYPES.ADMIN:
      return 'admin'
    case DOMAIN_TYPES.EMPLOYEE:
      return 'employee'
    case DOMAIN_TYPES.CUSTOMER:
      return 'customer'
    default:
      return 'customer' // Default role
  }
}

/**
 * Gets the default view/route for a domain type
 * @param {string} domainType - The detected domain type
 * @param {boolean} isSignedIn - Whether user is authenticated
 * @returns {string} Default view name
 */
export function getDefaultView(domainType, isSignedIn = false) {
  if (!isSignedIn) {
    switch (domainType) {
      case DOMAIN_TYPES.ADMIN:
        return 'admin-login'
      case DOMAIN_TYPES.EMPLOYEE:
        return 'employee-login'
      case DOMAIN_TYPES.CUSTOMER:
        return 'customer-login'
      default:
        return 'landing'
    }
  }
  
  // Signed in users
  switch (domainType) {
    case DOMAIN_TYPES.ADMIN:
      return 'dashboard'
    case DOMAIN_TYPES.EMPLOYEE:
      return 'dashboard'
    case DOMAIN_TYPES.CUSTOMER:
      return 'customer-dashboard'
    default:
      return 'landing'
  }
}

/**
 * Gets allowed views for a specific domain type
 * @param {string} domainType - The detected domain type
 * @returns {string[]} Array of allowed view names
 */
export function getAllowedViews(domainType) {
  switch (domainType) {
    case DOMAIN_TYPES.ADMIN:
      return [
        'admin-login',
        'dashboard',
        'all-vehicles',
        'add-vehicle',
        'all-customers',
        'customer-onboarding',
        'settings',
        'schedule',
        'reports',
        'inventory',
        'invoices'
      ]
    case DOMAIN_TYPES.EMPLOYEE:
      return [
        'employee-login',
        'signup',
        'service-intake',
        'employee-dashboard',
        'customer-onboarding',
        'all-vehicles',
        'add-vehicle',
        'all-customers',
        'inventory'
      ]
    case DOMAIN_TYPES.CUSTOMER:
      return [
        'customer-login',
        'customer-dashboard',
        'customer-services',
        'customer-invoices',
        'customer-profile'
      ]
    default:
      return [
        'landing',
        'home',
        'admin-login',
        'employee-login',
        'customer-login'
      ]
  }
}

/**
 * Checks if a view is allowed for the current domain
 * @param {string} view - The view to check
 * @param {string} domainType - The current domain type
 * @returns {boolean} Whether the view is allowed
 */
export function isViewAllowed(view, domainType) {
  const allowedViews = getAllowedViews(domainType)
  return allowedViews.includes(view)
}

/**
 * Redirects to appropriate domain based on role
 * @param {string} role - User role (admin, employee, customer)
 * @param {string} path - Optional path to append
 */
export function redirectToDomain(role, path = '') {
  const isProduction = window.location.hostname.includes('reznico.tech')
  
  let targetDomain
  if (isProduction) {
    targetDomain = PRODUCTION_DOMAINS[role]
  } else {
    targetDomain = LOCAL_DOMAINS[role] || LOCAL_DOMAINS[DOMAIN_TYPES.MAIN]
  }
  
  if (targetDomain) {
    const protocol = window.location.protocol
    const newUrl = `${protocol}//${targetDomain}${path}`
    window.location.href = newUrl
  }
}

/**
 * Gets the cross-domain navigation URLs for the current environment
 * @returns {object} Object with URLs for each domain type
 */
export function getCrossDomainUrls() {
  const isProduction = window.location.hostname.includes('reznico.tech')
  const protocol = window.location.protocol
  
  if (isProduction) {
    return {
      admin: `${protocol}//${PRODUCTION_DOMAINS[DOMAIN_TYPES.ADMIN]}`,
      employee: `${protocol}//${PRODUCTION_DOMAINS[DOMAIN_TYPES.EMPLOYEE]}`,
      customer: `${protocol}//${PRODUCTION_DOMAINS[DOMAIN_TYPES.CUSTOMER]}`
    }
  } else {
    return {
      admin: `${protocol}//${LOCAL_DOMAINS[DOMAIN_TYPES.ADMIN]}`,
      employee: `${protocol}//${LOCAL_DOMAINS[DOMAIN_TYPES.EMPLOYEE]}`,
      customer: `${protocol}//${LOCAL_DOMAINS[DOMAIN_TYPES.CUSTOMER]}`
    }
  }
}