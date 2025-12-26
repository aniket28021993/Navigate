export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard', description: 'Overview' },
  { key: 'employee', label: 'Employee', description: 'People records' },
  { key: 'contact', label: 'Contact', description: 'Client directory' },
  { key: 'equipment', label: 'Equipment', description: 'Fleet assets' },
  { key: 'payment', label: 'Payment Method', description: 'Billing setup' },
  { key: 'company-settings', label: 'Company Settings', description: 'Profiles & branding' },
  { key: 'user-settings', label: 'User Settings', description: 'Roles & password' },
] as const

export type NavigationKey = (typeof navigationItems)[number]['key']

export const getNavigationPath = (key: NavigationKey) => (key === 'dashboard' ? '/dashboard' : `/${key}`)
