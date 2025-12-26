export type Employee = {
  id: string
  lastName: string
  firstName: string
  phone: string
  email: string
  dob: string
  hireDate: string
  jobTitle: string
  licenseNumber: string
  licenseState: string
  licenseClass: string
  documents: Array<{ name: string; type: string; uploaded: string }>
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }
}

export const employeeRows: Employee[] = [
  {
    id: 'emp-001',
    lastName: 'Driver',
    firstName: 'New',
    phone: '(480) 555-0112',
    email: 'newdriver@prodemo.com',
    dob: '1/1/1990',
    hireDate: '7/31/2025',
    jobTitle: 'Commercial Driver',
    licenseNumber: '008012',
    licenseState: 'AZ',
    licenseClass: 'A',
    documents: [
      { name: 'CDL License', type: 'PDF', uploaded: '7/20/2025' },
      { name: 'Medical Card', type: 'PDF', uploaded: '7/21/2025' },
    ],
    emergencyContact: {
      name: 'Jamie Driver',
      relationship: 'Spouse',
      phone: '(480) 555-0144',
      email: 'jamie.driver@prodemo.com',
    },
  },
  {
    id: 'emp-002',
    lastName: 'Ortiz',
    firstName: 'Carla',
    phone: '(602) 555-0199',
    email: 'cortiz@prodemo.com',
    dob: '4/18/1987',
    hireDate: '3/14/2023',
    jobTitle: 'Dispatcher',
    licenseNumber: 'AZ-11042',
    licenseState: 'AZ',
    licenseClass: 'D',
    documents: [
      { name: 'Signed Handbook', type: 'PDF', uploaded: '3/16/2023' },
      { name: 'W-4', type: 'PDF', uploaded: '3/15/2023' },
    ],
    emergencyContact: {
      name: 'Luis Ortiz',
      relationship: 'Brother',
      phone: '(602) 555-0188',
      email: 'lortiz@prodemo.com',
    },
  },
  {
    id: 'emp-003',
    lastName: 'Patel',
    firstName: 'Meera',
    phone: '(623) 555-0123',
    email: 'mpatel@prodemo.com',
    dob: '9/12/1992',
    hireDate: '11/2/2022',
    jobTitle: 'Safety Coordinator',
    licenseNumber: 'CA-55201',
    licenseState: 'CA',
    licenseClass: 'C',
    documents: [
      { name: 'Certification', type: 'PDF', uploaded: '11/1/2022' },
      { name: 'Training Log', type: 'PDF', uploaded: '11/5/2022' },
    ],
    emergencyContact: {
      name: 'Ravi Patel',
      relationship: 'Father',
      phone: '(623) 555-0145',
      email: 'rpatel@prodemo.com',
    },
  },
]
