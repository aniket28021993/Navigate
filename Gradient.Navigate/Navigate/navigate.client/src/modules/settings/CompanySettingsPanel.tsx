import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

const companies = [
  {
    id: 'pro-demo',
    name: 'Pro-Demo Hauling',
    location: 'Phoenix, AZ',
    employees: 128,
    equipment: 86,
    contacts: 24,
    paymentMethods: 6,
  },
  {
    id: 'skyline',
    name: 'Skyline Transport Co.',
    location: 'Dallas, TX',
    employees: 94,
    equipment: 62,
    contacts: 19,
    paymentMethods: 4,
  },
  {
    id: 'ridgeway',
    name: 'Ridgeway Logistics',
    location: 'Boise, ID',
    employees: 57,
    equipment: 41,
    contacts: 12,
    paymentMethods: 3,
  },
]

const logoConstraints = {
  maxSizeMb: 2,
  minWidth: 120,
  minHeight: 120,
  maxWidth: 600,
  maxHeight: 600,
  types: ['image/png', 'image/jpeg'],
}

export function CompanySettingsPanel() {
  const [activeCompanyId, setActiveCompanyId] = useState(companies[0]?.id ?? '')
  const [logoError, setLogoError] = useState('')
  const [logoStatus, setLogoStatus] = useState('')
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoFileName, setLogoFileName] = useState('')

  const activeCompany = useMemo(
    () => companies.find((company) => company.id === activeCompanyId) ?? companies[0],
    [activeCompanyId],
  )

  const logoInitials = useMemo(() => {
    const parts = activeCompany?.name.split(' ') ?? []
    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }, [activeCompany?.name])

  const validateLogo = async (file: File) => {
    if (!logoConstraints.types.includes(file.type)) {
      return 'Upload a PNG or JPG logo file.'
    }
    if (file.size > logoConstraints.maxSizeMb * 1024 * 1024) {
      return `Logo must be under ${logoConstraints.maxSizeMb} MB.`
    }
    const imageUrl = URL.createObjectURL(file)
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve({ width: image.width, height: image.height })
      image.onerror = () => reject(new Error('Invalid image file.'))
      image.src = imageUrl
    }).finally(() => URL.revokeObjectURL(imageUrl))

    if (
      dimensions.width < logoConstraints.minWidth ||
      dimensions.height < logoConstraints.minHeight ||
      dimensions.width > logoConstraints.maxWidth ||
      dimensions.height > logoConstraints.maxHeight
    ) {
      return `Logo must be between ${logoConstraints.minWidth}×${logoConstraints.minHeight} and ${logoConstraints.maxWidth}×${logoConstraints.maxHeight}px.`
    }
    return ''
  }

  useEffect(() => {
    if (!logoPreview) {
      return
    }
    return () => URL.revokeObjectURL(logoPreview)
  }, [logoPreview])

  const handleLogoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setLogoStatus('')
    const errorMessage = await validateLogo(file)
    if (errorMessage) {
      setLogoError(errorMessage)
      setLogoPreview(null)
      setLogoFileName('')
      return
    }
    setLogoError('')
    setLogoPreview(URL.createObjectURL(file))
    setLogoFileName(file.name)
  }

  const handleSaveLogo = () => {
    if (!logoPreview) {
      setLogoError('Please upload a valid logo before saving.')
      return
    }
    setLogoError('')
    setLogoStatus(`Logo saved for ${activeCompany?.name ?? 'selected company'}.`)
  }

  return (
    <div className="management-view">
      <div className="management-view__header">
        <div>
          <h2>Company Settings</h2>
          <p>Manage company profiles, data visibility, and branding assets.</p>
        </div>
        <div className="management-view__logo">
          <strong>{activeCompany?.name}</strong>
          <span>{activeCompany?.location}</span>
        </div>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <header className="settings-card__header">
            <div>
              <h3>Company selection</h3>
              <p>Switch company profiles to update related service data.</p>
            </div>
          </header>
          <label className="settings-field">
            <span>Company profile</span>
            <select
              className="settings-select"
              value={activeCompanyId}
              onChange={(event) => {
                setActiveCompanyId(event.target.value)
                setLogoStatus('')
                setLogoError('')
              }}
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <div className="settings-metrics">
            <div>
              <span>Employees</span>
              <strong>{activeCompany?.employees}</strong>
            </div>
            <div>
              <span>Equipment</span>
              <strong>{activeCompany?.equipment}</strong>
            </div>
            <div>
              <span>Contacts</span>
              <strong>{activeCompany?.contacts}</strong>
            </div>
            <div>
              <span>Payment methods</span>
              <strong>{activeCompany?.paymentMethods}</strong>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <header className="settings-card__header">
            <div>
              <h3>Assign company logo</h3>
              <p>Upload a PNG or JPG logo that meets the size and dimension requirements.</p>
            </div>
          </header>
          <div className="settings-logo">
            <div className="settings-logo__preview">
              {logoPreview ? <img src={logoPreview} alt="Company logo preview" /> : <span>{logoInitials}</span>}
            </div>
            <div className="settings-logo__details">
              <p className="settings-logo__name">{logoFileName || 'No logo uploaded yet.'}</p>
              <p className="settings-logo__rules">
                PNG or JPG · Max {logoConstraints.maxSizeMb} MB · {logoConstraints.minWidth}-{logoConstraints.maxWidth}
                px wide
              </p>
              <label className="settings-upload">
                <input type="file" accept="image/png,image/jpeg" onChange={handleLogoChange} />
                Upload logo
              </label>
            </div>
          </div>
          {logoError ? <p className="settings-error">{logoError}</p> : null}
          {logoStatus ? <p className="settings-success">{logoStatus}</p> : null}
          <div className="settings-card__footer">
            <button type="button" className="settings-primary" onClick={handleSaveLogo}>
              Save company logo
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
