export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard', description: 'Overview' },
  { key: 'employee', label: 'Employee', description: 'People records' },
  { key: 'contact', label: 'Contact', description: 'Client directory' },
  { key: 'equipment', label: 'Equipment', description: 'Fleet assets' },
  { key: 'payment', label: 'Payment Method', description: 'Billing setup' },
] as const

export type NavigationKey = (typeof navigationItems)[number]['key']

export const getNavigationPath = (key: NavigationKey) => (key === 'dashboard' ? '/dashboard' : `/${key}`)
